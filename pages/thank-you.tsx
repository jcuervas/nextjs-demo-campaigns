import {GetServerSideProps} from "next";
import {Campaign} from "@interfaces/campaign";
import React, {useEffect} from "react";
import {cssVariables, mainStyles, setupInitialEffect} from "../helpers/util";
import styles from "./home.module.css";
import {ThankYouStep} from "@components/steps/thank-you/thank-you-step";
import {getPageProps} from "@interfaces/util";
import Custom404 from "./404";

export default function ThankYou(props: { campaign: Campaign }) {

  const {campaign} = props
  const variables = cssVariables(campaign);
  useEffect(() => {
    campaign && setupInitialEffect(variables)
  }, [variables]);

  if (!campaign) return <Custom404/>
  return (
    <div className={styles.container} style={mainStyles(campaign)}>
      <ThankYouStep/>
      <footer className={styles.footer}/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return getPageProps(context)
}
