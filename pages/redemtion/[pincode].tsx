import styles from '../home.module.css'
import {GetServerSideProps} from "next";
import React, {useEffect} from "react";
import {Campaign} from "@interfaces/campaign";
import {cssVariables, mainStyles, setupInitialEffect} from "../../helpers/util";
import {getPageProps} from "@interfaces/util";
import Custom404 from "../404";
import adminService from "@services/admin-service";
import {PinCode} from "@interfaces/pinCode";
import PinCodeStep from '@components/steps/pin-code/pin-code-step';
import {CampaignTicket} from "@interfaces/campaign-ticket";
import {useRouter} from "next/router";
import {ThemeProvider} from '@mui/material/styles';
import {theme} from '../../styles/theme/theme';
import {MetasSeo} from '@components/metas/metasSeo';
import {StyledLinearProgress} from '@components/shared';
import IsOlderStep from '@components/steps/is-older/is-older-step';

interface Props {
  campaign: Campaign
  pinCode: PinCode
  ticket: CampaignTicket
}

export default function PincodePage(props: Props) {
  const {campaign, pinCode, ticket} = props
  const variables = cssVariables(campaign);
  const router = useRouter()
  function onConfirmRedeem(accept: boolean) {
    if (accept) {
      return router.push(`redeem?pinCode=${pinCode.id}`)
    }
  }

  useEffect(() => {
    campaign && setupInitialEffect(variables)
  }, [variables]);



  if (!campaign || !pinCode || !ticket) return <Custom404/>
  return (
    <ThemeProvider theme={theme(campaign)}>
      <MetasSeo metas={campaign.cover.metas}/>
      <main style={mainStyles}>
        <div className="template">
          <div className={campaign.template.align + ' ' + campaign.template.type}>
            <PinCodeStep ticket={ticket} onNext={onConfirmRedeem}/>
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await getPageProps(context)
  const pinCode = await adminService.getPincode(context.params.pincode as string)
  const ticket = pinCode && await adminService.getTicketFromPinCode(pinCode)
  console.log({ticket})

  return {
    props: {
      ...props.props,
      pinCode,
      ticket
    }
  }
}
