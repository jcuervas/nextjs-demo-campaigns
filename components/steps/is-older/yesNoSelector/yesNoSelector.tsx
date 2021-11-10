import React from "react";
import Link from "next/link";

import styles from "./yes-no-selector.module.scss";
import {useTranslation} from "next-i18next";
import {Button} from "@react-md/button";


export function YesNoSelector(props: { onNext: (accept: boolean) => Promise<boolean> }) {

  const {t} = useTranslation('common')

  return (
    <div className={styles['yes-no-selector']}>
      <Button className="button ko" onClick={() => props.onNext(false)}>{t('no')}</Button>
      <Button className="button ok" onClick={() => props.onNext(true)}>{t('yes')}</Button>
    </div>
  );
}
