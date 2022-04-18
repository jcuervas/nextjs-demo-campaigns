import {GetServerSideProps} from 'next';
import React, {useEffect, useState} from 'react';
import {Campaign} from '@interfaces/campaign';
import {cssVariables, mainStyles, setupInitialEffect} from '../helpers/util';
import {MetasSeo} from '@components/metas/metasSeo';
import IsOlderStep from '@components/steps/is-older/is-older-step';
import {getPageProps} from '@interfaces/util';
import Custom404 from './404';
import {StyledBackground, StyledLinearProgress} from '@components/shared';
import {useRouter} from 'next/router';
import {theme} from '../styles/theme/theme';
import {ThemeProvider} from '@mui/material/styles';
import {Box} from '@mui/material';


export default function IsOlder(props: { campaign: Campaign }) {
  const {campaign} = props;
  const variables = cssVariables(campaign);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    campaign && setupInitialEffect(variables);
  }, [variables]);

  function onNext(success: boolean) {
    setLoading(true);
    const next = success ? (campaign.cover.show ? 'cover' : 'form') : '/reject';
    router.push(next).then(() => setLoading(false));
  }

  if (!campaign) return <Custom404/>;
  return (
    <ThemeProvider theme={theme(campaign)}>
      <MetasSeo metas={campaign.cover.metas}/>
      <main style={mainStyles(campaign)}>
        {loading && <StyledLinearProgress/>}
        <StyledBackground/>
        <div className="template">
          <div className={campaign.template.align + ' ' + campaign.template.type}>
            <IsOlderStep campaign={campaign} onNext={onNext}/>
          </div>
        </div>
      </main>
    </ThemeProvider>


  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return getPageProps(context);
};
