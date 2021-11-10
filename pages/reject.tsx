import {GetServerSideProps} from "next";
import {Campaign} from "@interfaces/campaign";
import React, {useEffect} from "react";
import {cssVariables, mainStyles, setupInitialEffect} from "../helpers/util";
import styles from "./home.module.css";
import {RejectStep} from "@components/steps/reject/reject-step";
import {getPageProps} from "@interfaces/util";
import Custom404 from "./404";

export default function Reject(props: { campaign: Campaign }) {

  const {campaign} = props
  const variables = cssVariables(campaign);
  useEffect(() => {
    campaign && setupInitialEffect(variables)
  }, [variables]);

  if (!campaign) return <Custom404/>
  return (
    <div className={styles.container} style={mainStyles(campaign)}>
      <div className={styles.main + " template " + campaign.template.align + " " + campaign.template.type}>
        <RejectStep campaign={props.campaign}/>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return getPageProps(context)
}
