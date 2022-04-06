import {PinCode} from '@interfaces/pinCode';
import {GetServerSideProps} from 'next';
import {getPageProps} from '@interfaces/util';
import adminService from '@services/admin-service';
import {cssVariables, mainStyles, setupInitialEffect} from '../../helpers/util';
import {Campaign} from '@interfaces/campaign';
import React, {CSSProperties, useEffect} from 'react';
import Custom404 from '../404';
import {useTranslation} from 'next-i18next';
import {CardContent} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from '../../styles/theme/theme';
import {MetasSeo} from '@components/metas/metasSeo';
import {StyledCard} from '@components/shared';

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

  if (!campaign || !pinCode) return <Custom404/>

  return (
    <ThemeProvider theme={theme(campaign)}>
      <MetasSeo metas={campaign.form.metas}/>
      <main style={mainStyles(campaign)}>
        <div className="template">
          <div className={campaign.template.align + ' ' + campaign.template.type}>
            <StyledCard sx={{display: 'flex', alignItems: 'center'}}>
              <CardContent>
                {
                  success
                  && <h1>{t('thanksForParticipating')}</h1>
                  || <h1>{t('codeAlreadyRedeemed')}</h1>
                }
              </CardContent>
            </StyledCard>
          </div>
        </div>
      </main>
    </ThemeProvider>
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
