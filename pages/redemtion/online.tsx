import styles from '../home.module.css'
import {GetServerSideProps} from "next";
import React, {useEffect} from "react";
import {Campaign} from "@interfaces/campaign";
import {cssVariables, mainStyles, setupInitialEffect} from "../../helpers/util";
import {getPageProps} from "@interfaces/util";
import Custom404 from "../404";

export default function OnlinePage(props: { campaign: Campaign }) {
  const {campaign} = props
  const variables = cssVariables(campaign);
  useEffect(() => {
    campaign && setupInitialEffect(variables)
  }, [variables]);

  if (!campaign) return <Custom404/>
  return (
    <div className={styles.container} style={mainStyles(campaign)}>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return getPageProps(context)
}
