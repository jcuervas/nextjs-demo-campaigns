import {parseDate} from "@interfaces/util";

export class PinCode {
  id: string;
  campaignId: string;
  code: string;
  campaignTicket: string|null;
  redeemedDate: Date|null

  constructor(props: any = {}) {
    this.id = props.id
    this.campaignId = props.campaignId
    this.code = props.code
    this.campaignTicket = props.campaignTicket
    this.redeemedDate = parseDate(props.redeemedDate)
  }
}
