import {GetServerSideProps} from 'next';
import {Campaign} from '@interfaces/campaign';
import React, {useEffect} from 'react';
import {cssVariables, mainStyles, setupInitialEffect} from '../helpers/util';
import {ThankYouStep} from '@components/steps/thank-you/thank-you-step';
import {getPageProps} from '@interfaces/util';
import Custom404 from './404';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from '../styles/theme/theme';
import {MetasSeo} from '@components/metas/metasSeo';

export default function ThankYou(props: { campaign: Campaign }) {

  const {campaign} = props
  const variables = cssVariables(campaign);
  useEffect(() => {
    campaign && setupInitialEffect(variables)
  }, [variables]);

  if (!campaign) return <Custom404/>
  return (
  <ThemeProvider theme={theme(campaign)}>
    <MetasSeo metas={campaign.cover.metas}/>
    <main style={mainStyles(campaign)}>
      <div className="template">
        <div className={campaign.template.align + ' ' + campaign.template.type}>
          <ThankYouStep/>
        </div>
      </div>
    </main>
  </ThemeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return getPageProps(context)
}
