import {Customer} from "@interfaces/customer";
import {CampaignTicket} from "@interfaces/campaign-ticket";
import {Campaign} from "@interfaces/campaign";
import * as admin from "firebase-admin";
import {PinCode} from "@interfaces/pinCode";

class AdminService {
  constructor() {
    if (process.env.LOCAL !== '1') {
      if (!admin.apps.find(a => a.name === "[DEFAULT]")) {
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
        })
      }
    }
  }

  async registerCustomer(customer: Customer) {
    await admin.firestore().collection('customers').doc(customer.email).set(customer)
  }

  async uploadTicket(ticket: CampaignTicket, file: File) {
    Object.keys(ticket).forEach(key => {
      if (!ticket[key]) delete ticket[key]
    })
    await admin.firestore().collection('campaignTickets').add(ticket)
  }

  async getCampaign(site: string): Promise<Campaign> {
    const snapshot = await admin.firestore().collection('campaigns')
      .doc(site).get()
    const data = snapshot.data()
    return data && new Campaign(data) || null
  }

  async getCampaignFromDomain(site: string, isPreview: boolean): Promise<Campaign> {
    let domainAliasSnapshot = await admin.firestore().collection('domainAlias').doc(site).get()
    if (!domainAliasSnapshot.exists) {
      domainAliasSnapshot = await admin.firestore().collection('domainAlias').doc(site + '.web.app').get()
    }
    const domainAlias = domainAliasSnapshot.data()
    if (!domainAlias) return null
    const campaignId = domainAlias.campaignId + (isPreview ? '-preview' : '')
    const campaignSnapshot = await admin.firestore().collection('campaigns')
      .doc(campaignId).get()
    const data = campaignSnapshot.data()
    return data && new Campaign(data) || null
  }

  async getPincode(pincode: string) {
    const snapshot = await admin.firestore().collection('pinCodes')
      .where('code','==', pincode).limit(1).get()
    if (snapshot.empty) {
      return null
    }
    return {...(new PinCode(snapshot.docs[0].data())), id: snapshot.docs[0].id}
  }

  async getPincodeById(id: string) {
    const snapshot = await admin.firestore().collection('pinCodes')
      .doc(id).get()
    return {...(JSON.parse(JSON.stringify(new PinCode(snapshot.data())))), id: snapshot.id}
  }

  async getTicketFromPinCode(pinCode: PinCode) {
    const snapshot = await admin.firestore().collection('campaignTickets')
      .where('pinCode','==', pinCode.id).limit(1).get()
    if (snapshot.empty) {
      return null
    }
    return JSON.parse(JSON.stringify(new CampaignTicket(snapshot.docs[0].data())))
  }

  async redeemPinCode(pinCode: PinCode) {
    return admin.firestore().collection('pinCodes').doc(pinCode.id)
      .update("redeemedDate", new Date())
  }
}

export default new AdminService()
