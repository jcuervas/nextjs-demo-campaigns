import React, {CSSProperties} from "react";
import {useTranslation} from "next-i18next";
import styles from "@components/steps/is-older/isOlder.module.scss";
import {YesNoSelector} from "@components/steps/is-older/yesNoSelector/yesNoSelector";
import {YearSelector} from "@components/steps/is-older/yearSelector/yearSelector";
import {StepProps} from "@components/steps/interface";
import {Card, CardActions, CardHeader} from "@react-md/card";
import {useRouter} from "next/router";
import {useToggle} from "@react-md/utils";
import {LinearProgress} from "react-md";

export default function IsOlderStep(props: StepProps) {

  const {t} = useTranslation('common')
  let {isOlder, configuration, template} = props.campaign;
  const next = props.campaign.cover.show ? 'cover' : 'form'
  const router = useRouter()
  const [loading, startLoading] = useToggle(false);

  function goNext(accept: boolean) {
    startLoading()
    const url = accept ? next : 'reject'
    return router.push(url, url, {locale: configuration.lang.locale})
  }
  const sectionStyles: CSSProperties = {
    backgroundColor: template.backgroundColor,
    padding: template.type === 'fullHeight' ? '4rem' : '1em'
  }
  const cardStyles : CSSProperties = {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  }
  return (
    <section style={sectionStyles} className={styles.content_age_selector}>
      {loading &&
      <LinearProgress
          id="loader"
          style={{
            position: 'absolute',
            top: 0,
            right: 0
          }}/>}
      <Card style={cardStyles}>
        <CardHeader>
          <img src={template.logo} alt={configuration.campaignName} />
          <h1 className="text-center">{t('is_older')}</h1>
        </CardHeader>
        <CardActions style={{padding: '1rem'}}>
          {isOlder.selectorType === 'year' && <YearSelector onNext={goNext}/>}
          {isOlder.selectorType === 'yes_no' && <YesNoSelector onNext={goNext}/>}
        </CardActions>
      </Card>
    </section>
  );
}

