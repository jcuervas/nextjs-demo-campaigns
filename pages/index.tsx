import {GetServerSideProps} from "next";
import {Campaign} from "@interfaces/campaign";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {getPageProps} from "@interfaces/util";
import Custom404 from "./404";

export default function HomePage(props: { campaign: Campaign }) {
  const router = useRouter()
  const {campaign} = props
  useEffect(() => {
    if (campaign) {
      const next = campaign.isOlder.show
        ? 'is-older'
        : campaign.cover.show
          ? 'cover'
          : 'form'
          || ''
      router.push(next)
    }

  })
  if (!campaign) return <Custom404/>
  return (<></>)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return getPageProps(context)
}
