import {GetServerSideProps} from 'next';
import React, {useEffect, useState} from 'react';
import {Campaign} from '@interfaces/campaign';
import {cssVariables, mainStyles, setupInitialEffect} from '../helpers/util';
import CoverStep from '@components/steps/cover/cover-step';
import {MetasSeo} from '@components/metas/metasSeo';
import {getPageProps} from '@interfaces/util';
import Custom404 from './404';
import {useRouter} from 'next/router';
import {StyledBackground, StyledLinearProgress} from '@components/shared';
import {theme} from '../styles/theme/theme';
import {ThemeProvider} from '@mui/material/styles';
import {Box} from '@mui/material';


export default function Cover(props: { campaign: Campaign }) {
  const {campaign} = props;
  const variables = cssVariables(campaign);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function onNext(success: boolean) {
    setLoading(true);
    const next = success ? '/form' : '/reject';
    router.push(next).then(() => setLoading(false));
  }


  useEffect(() => {
    campaign && setupInitialEffect(variables);
  }, [variables]);

  if (!campaign) return <Custom404/>;
  return (
    <ThemeProvider theme={theme(campaign)}>
      <MetasSeo metas={campaign.cover.metas}/>
      <main style={mainStyles}>
        {loading && <StyledLinearProgress/>}
        <StyledBackground/>
        <div className="template">
          <div className={campaign.template.align + ' ' + campaign.template.type}>
            <CoverStep campaign={campaign} onNext={onNext}/>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return getPageProps(context);
};
