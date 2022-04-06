import {Campaign} from "@interfaces/campaign";
import adminService from "@services/admin-service";
import {IncomingMessage} from "http";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {NextApiRequestCookies} from 'next/dist/server/api-utils';
import {Timestamp} from '@firebase/firestore'

export interface ObjectLiteral<T> {
  [x: string]: T
}

const siteRegEx = /(?:www\.)?(.+)\.(.*)?(\.(.*))/g

export function getCampaign(req: IncomingMessage & { cookies: NextApiRequestCookies }): Promise<Campaign | null> {
  let site = ''
  if (req.headers.host === 'localhost:3000') {
    // return require('../mock/campaign.json')
    site = 'zqedwapzkjl2jcbpb8pi'
  } else {
    const siteMatch = (req.headers['x-forwarded-host'] as string).match(siteRegEx)
    // site = siteMatch[1] === 'www' ? siteMatch[2] : siteMatch[1]
    site = siteMatch[0].split('.')[0]
    console.log({site, siteMatch})
  }
  return adminService.getCampaign(site);
}

export async function getPageProps(context) {
  const campaign = await getCampaign(context.req)
  const locale = campaign && campaign.configuration.lang.locale || 'es-ES'
  return {
    props: {
      campaign: JSON.parse(JSON.stringify(campaign)),
      ...(await serverSideTranslations(locale, ['common'])),
    }
  }
}

export const parseDate = (date: any) => {
  if (!date) return null
  if (date instanceof Timestamp) {
    return date.toDate()
  }
  if (date.seconds) {
    return (new Timestamp(date.seconds, date.nanoseconds)).toDate()
  }
  if (date instanceof Date) {
    return date
  }
  if (typeof date === 'string') {
    return new Date(date)
  }
}

