import {parseDate} from "@interfaces/util";

export class CampaignTicket {
  id: string
  campaignId: string
  url: string
  name: string
  surname: string
  email: string
  phone: string
  birth: string
  postalCode: string
  ticketNumber: string
  status: 'pending'|'accepted'|'rejected'|'emailSent'
  validationDate: Date
  emailDate: Date
  uploadDate: Date
  pinCode: string

  constructor(props: any = {}) {
    this.id = props.id
    this.campaignId = props.campaignId
    this.url = props.url
    this.name = props.name
    this.surname = props.surname
    this.email = props.email
    this.phone = props.phone
    this.birth = props.birth
    this.postalCode = props.postalCode
    this.ticketNumber = props.ticketNumber
    this.status = props.status || 'pending'
    this.validationDate = parseDate(props.validationDate)
    this.emailDate = parseDate(props.emailDate)
    this.uploadDate = props.uploadDate && parseDate(props.uploadDate) || new Date()
    this.pinCode = props.pinCode
  }
}
