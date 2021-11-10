import { Language } from './language'
import {LegalInfo} from "@interfaces/legalInfo";
import {MetasSeoProps} from "@interfaces/metasSeoProps";
import {Media} from "@interfaces/media";
import { SupportedInputTypes } from 'react-md';
import {firestore} from "firebase-admin/lib/firestore";
import {parseDate} from "@interfaces/util";

export type AllowedFormType = 'text'|'email'|'checkbox'|'file'|'textarea'|'button'
export type ValidationType = 'required'|'email'
export type FormPosition = 'body'|'actions'
export type FormKey = 'name'|'surname'|'email'|'phone'|'birth'|'postalCode'|'pin'|'ticketNumber'|'ticketUpload'|'dniUpload'|'submit'
export type IsOlderType = 'year'|'yes_no'
export type TemplateType = 'boxed'|'fullHeight'
export type PinCodeTypology = 'alphabetic'|'numeric'|'alphanumeric'
export type AvailableStatus = 'pending'|'accepted'|'rejected'|'emailSent'

export class CampaignConfiguration {
  active: boolean
  lang: Language
  url: string
  campaignName: string
  creationDate: Date
  startDate: Date
  endDate: Date
  legalInfo: LegalInfo
  analyticsCode: string
  tagManagerCode: string

  constructor (props: any = {}) {
    this.active = props.active
    this.lang = props.lang || { locale: 'es-ES', label: 'spanish' }
    this.url = props.url
    this.campaignName = props.campaignName
    this.creationDate = parseDate(props.creationDate)
    this.startDate = parseDate(props.startDate)
    this.endDate = parseDate(props.endDate)
    this.legalInfo = props.legalInfo || new LegalInfo()
    this.analyticsCode = props.analyticsCode
    this.tagManagerCode = props.tagManagerCode
  }
}

export class Template {
  align: 'right' | 'left' | 'center'
  backgroundImg: string
  backgroundColor: string
  textColor: string
  logo: string
  type: TemplateType

  constructor (props: any = {}) {
    this.align = props.align || 'right'
    this.backgroundImg = props.backgroundImg
    this.backgroundColor = props.backgroundColor || 'rgba(240, 10, 10, 0.8)'
    this.textColor = props.textColor || '#fff'
    this.logo = props.logo
    this.type = props.type || 'boxed'
  }
}

export class Cover {
  description: string
  media: Media
  type: 'image'|'video'
  metas: MetasSeoProps
  show: boolean

  constructor (props: any = {}) {
    this.description = props.description
    this.media = props.media || new Media()
    this.type = props.type
    this.metas = props.metas || new MetasSeoProps()
    this.show = props.show ?? true
  }
}

export class IsOlder {
  metas: MetasSeoProps
  show: boolean
  selectorType: IsOlderType

  constructor (props: any = {}) {
    this.metas = props.metas || new MetasSeoProps()
    this.show = props.show ?? true
    this.selectorType = props.selectorType || 'yes_no'
  }
}

export class FormField {
  id: string
  editLabel: string
  enabled: boolean
  icon: string
  key: FormKey
  multiline: number
  order: number
  position: FormPosition
  publicLabel: string
  type: SupportedInputTypes
  validation: ValidationType[]
  spanColumns: number
  spanRows: number

  constructor (props: any = {}) {
    this.id = props.id
    this.editLabel = props.editLabel
    this.enabled = props.enabled ?? true
    this.icon = props.icon
    this.key = props.key
    this.multiline = props.multiline
    this.order = props.order
    this.position = props.position || 'body'
    this.publicLabel = props.publicLabel
    this.type = props.type || 'text'
    this.validation = props.validation || []
    this.spanColumns = props.spanColumns
    this.spanRows = props.spanRows

  }
}

export class FormObject {
  description: string
  fields: FormField[]
  gridColNumber: number
  metas: MetasSeoProps

  constructor (props: any = {}) {
    this.description = props.description
    this.fields = props.fields || []
    this.gridColNumber = props.gridColNumber
    this.metas = props.metas || new MetasSeoProps()
  }
}

export class PricingEmail {
  holder: string
  title: string
  body: string
  featuredImageFilename: string
  featuredImageUrl: string
  footer: string

  constructor (props: any = {}) {
    this.holder = props.holder
    this.title = props.title
    this.body = props.body
    this.featuredImageFilename = props.featuredImageFilename
    this.featuredImageUrl = props.featuredImageUrl
    this.footer = props.footer
  }
}

export class PinCodeList {
  typology: PinCodeTypology
  qty: number
  length: number
  url: number
  fileName: string

  constructor (props: any = {}) {
    this.typology = props.typology || 'alphanumeric'
    this.qty = props.qty
    this.length = props.length
    this.url = props.url
    this.fileName = props.fileName
  }

}

export interface EmailNotification {
  qrCode: string
  destination: string
}

export class Campaign {
  id: string
  clientId: string
  agencyId: string
  clientName: string
  configuration: CampaignConfiguration
  template: Template
  cover: Cover
  form: FormObject
  isOlder: IsOlder
  pricingEmail: PricingEmail
  thankYouPage: string
  closedCampaignPage: string
  redeemPage: string
  pinCodes: PinCodeList
  numTickets: number
  numProcessed: number
  previewUrl: string

  constructor (props: any = {}) {
    this.id = props.id || 0
    this.agencyId = props.agencyId
    this.clientId = props.clientId
    this.clientName = props.clientName
    this.configuration = new CampaignConfiguration(props.configuration)
    this.template = new Template(props.template)
    this.cover = new Cover(props.cover)
    this.form = new FormObject(props.form)
    this.isOlder = new IsOlder(props.isOlder)
    this.pricingEmail = new PricingEmail(props.email)
    this.thankYouPage = props.thankYouPage
    this.closedCampaignPage = props.closedCampaignPage
    this.redeemPage = props.redeemPage
    this.pinCodes = new PinCodeList(props.pinCodes)
    this.numTickets = props.numTickets
    this.previewUrl = props.previewUrl
    this.numProcessed = props.numProcessed
  }
}
