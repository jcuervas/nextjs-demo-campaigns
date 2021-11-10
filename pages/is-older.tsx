import styles from './home.module.css'
import {GetServerSideProps} from "next";
import React, {useEffect} from "react";
import {Campaign} from "@interfaces/campaign";
import {cssVariables, mainStyles, setupInitialEffect} from "../helpers/util";
import {MetasSeo} from "@components/metas/metasSeo";
import IsOlderStep from "@components/steps/is-older/is-older-step";
import {getPageProps} from "@interfaces/util";
import Custom404 from "./404";

export default function IsOlder(props: { campaign: Campaign }) {
  const {campaign} = props
  const variables = cssVariables(campaign);
  useEffect(() => {
    campaign && setupInitialEffect(variables)
  }, [variables]);

  if (!campaign) return <Custom404/>
  return (
    <div className={styles.container} style={mainStyles(campaign)}>
      <MetasSeo metas={campaign.cover.metas}/>
      <div className={styles.main + " template"}>
        <div className={campaign.template.align + " " + campaign.template.type}>
          <IsOlderStep campaign={campaign} nextPath="/form"/>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return getPageProps(context)
}
