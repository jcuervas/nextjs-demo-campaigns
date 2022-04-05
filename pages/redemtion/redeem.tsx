import {PinCode} from "@interfaces/pinCode";
import {GetServerSideProps} from "next";
import {getPageProps} from "@interfaces/util";
import adminService from "@services/admin-service";
import {cssVariables, mainStyles, setupInitialEffect} from "../../helpers/util";
import {Campaign} from "@interfaces/campaign";
import React, {CSSProperties, useEffect} from "react";
import Custom404 from "../404";
import styles from '../home.module.css'
import {useTranslation} from "next-i18next";
import {Typography} from '@mui/material';

interface Props {
  campaign: Campaign
  pinCode: PinCode
  success: boolean
}

export default function RedeemPage(props: Props) {
  const {campaign, pinCode, success} = props
  const variables = cssVariables(campaign);
  const {t} = useTranslation('common')

  useEffect(() => {
    campaign && setupInitialEffect(variables)
  }, [variables]);

  const wrapperStyle: CSSProperties = {
    backgroundColor: "white",
    borderRadius: "6px",
    padding: "20px"
  }

  if (!campaign || !pinCode) return <Custom404/>
  return (
    <div className={styles.container} style={mainStyles(campaign)}>
      <div className="display-flex column items-center justify-center w-100-vw h-100-vh">
        <div style={wrapperStyle}>
          {
            success
            && <Typography variant="h1">{t('thanksForParticipating')}</Typography>
            || <Typography variant="h1">{t('codeAlreadyRedeemed')}</Typography>
          }
        </div>
      </div>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await getPageProps(context)
  const pinCode = await adminService.getPincodeById(context.query.pinCode as string)
  const success = !pinCode.redeemedDate
  if (success) {
    await adminService.redeemPinCode(pinCode)
  }
  return {
    props: {
      ...props.props,
      pinCode,
      success
    }
  }
}
