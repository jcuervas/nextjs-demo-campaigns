import React from "react";

import styles from './thanks.module.scss';
import {useTranslation} from "next-i18next";

export function ThankYouStep() {
  const {t} = useTranslation('common');
  return (
    <div className={styles.thank_you}>
      <h2>{t('thanks_for_register')}</h2>
    </div>
  );
}
