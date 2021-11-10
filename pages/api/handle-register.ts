import adminService from "@services/admin-service";
import {Customer} from "@interfaces/customer";
import {CampaignTicket} from "@interfaces/campaign-ticket";

export default async function handler(req, res) {
  try {
    const body = req.body;
    const customer = new Customer(body)
    const ticket = new CampaignTicket(body)
    await adminService.uploadTicket(JSON.parse(JSON.stringify(ticket)), req.body.campaignTicket)
    await adminService.registerCustomer(JSON.parse(JSON.stringify(customer)))
    res.status(200).send()
  } catch (e) {
    res.status(500).send(e.message)
  }
}
