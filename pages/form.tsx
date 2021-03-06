import {GetServerSideProps} from 'next';
import React, {useEffect, useState} from 'react';
import {Campaign} from '@interfaces/campaign';
import {cssVariables, mainStyles, setupInitialEffect} from '../helpers/util';
import {MetasSeo} from '@components/metas/metasSeo';
import FormStep from '@components/steps/form/form-step';
import {getPageProps} from '@interfaces/util';
import Custom404 from './404';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from '../styles/theme/theme';
import {StyledBackground, StyledLinearProgress} from '@components/shared';
import {useRouter} from 'next/router';

export default function Form(props: { campaign: Campaign }) {
  const {campaign} = props
  const variables = cssVariables(campaign);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    campaign && setupInitialEffect(variables)
  }, [variables]);

  function onNext(success: boolean) {
    setLoading(true);
    const next = success ? '/thank-you' : '/reject';
    router.push(next).then(() => setLoading(false));
  }


  if (!campaign) return <Custom404/>
  return (
    <ThemeProvider theme={theme(campaign)}>
      <MetasSeo metas={campaign.cover.metas}/>
      <main style={mainStyles}>
        {loading && <StyledLinearProgress/>}
        <StyledBackground/>

        <div className="template">
          <div className={campaign.template.align + ' ' + campaign.template.type}>
            <FormStep campaign={campaign} onNext={onNext}/>
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return getPageProps(context)
}
