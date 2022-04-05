import React from "react";
import {useTranslation} from "next-i18next";
import {StyledButton} from "@components/shared";


export function YesNoSelector(props: { onNext: (accept: boolean) => void }) {

  const {t} = useTranslation('common')

  return (
    <>
      <StyledButton className="button ko" onClick={() => props.onNext(false)}>{t('no')}</StyledButton>
      <StyledButton className="button ok" onClick={() => props.onNext(true)}>{t('yes')}</StyledButton>
    </>
  );
}
