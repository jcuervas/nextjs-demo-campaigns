import {GetServerSideProps} from "next";
import {Campaign} from "@interfaces/campaign";
import React, {useEffect} from "react";
import {cssVariables, mainStyles, setupInitialEffect} from "../helpers/util";
import {RejectStep} from "@components/steps/reject/reject-step";
import {getPageProps} from "@interfaces/util";
import Custom404 from "./404";
import {StyledBackground} from '@components/shared';
import {theme} from '../styles/theme/theme';
import {MetasSeo} from '@components/metas/metasSeo';
import {ThankYouStep} from '@components/steps/thank-you/thank-you-step';
import {ThemeProvider} from '@mui/material/styles';

export default function Reject(props: { campaign: Campaign }) {

  const {campaign} = props
  const variables = cssVariables(campaign);
  useEffect(() => {
    campaign && setupInitialEffect(variables)
  }, [variables]);

  if (!campaign) return <Custom404/>
  return (
    <ThemeProvider theme={theme(campaign)}>
      <MetasSeo metas={campaign.cover.metas}/>
      <main style={mainStyles}>
        <StyledBackground/>
        <div className="template">
          <div className={campaign.template.align + ' ' + campaign.template.type}>
            <RejectStep campaign={props.campaign}/>
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return getPageProps(context)
}
