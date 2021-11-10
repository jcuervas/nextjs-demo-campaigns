import React, {CSSProperties} from "react";

import styles from './reject.module.scss';
import {useTranslation} from "next-i18next";
import {Card, CardHeader} from "@react-md/card";
import {StepProps} from "@components/steps/interface";

export function RejectStep(props: StepProps) {
  const {t} = useTranslation('common');
  let {template} = props.campaign;
  const cardStyles: CSSProperties = {
    backgroundColor: template.backgroundColor,
    color: template.textColor,
    padding: '1rem',
  }
  return (
      <section className={styles.content_form}>
        <Card style={cardStyles}>
          <CardHeader >
            <h2>{t('need_to_be_older')}</h2>
          </CardHeader>
        </Card>
      </section>
  );
}
