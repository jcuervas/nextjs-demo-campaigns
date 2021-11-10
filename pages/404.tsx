import {useTranslation} from "next-i18next";

export default function Custom404() {
  const {t} = useTranslation('common')

  return (
    <div className="display-flex column justify-center items-center w-100-vw h-100-vh">
      <img src="/img/404.png"/>
      <h2>{t('pageNotFound')}</h2>
    </div>
  )
}
