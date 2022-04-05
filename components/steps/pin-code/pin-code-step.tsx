import React, {CSSProperties} from "react";
import {CampaignTicket} from "@interfaces/campaign-ticket";
import {useTranslation} from "next-i18next";
import Button from '@mui/material/Button';

interface Props {
  ticket: CampaignTicket,
  onNext: (accept: boolean) => void
}

export default function PinCodeStep(props: Props) {
  const {ticket} = props
  const name = ticket.name + " " + (ticket.surname ? ticket.surname : '')
  const {t} = useTranslation('common')
  const wrapperStyle: CSSProperties = {
    backgroundColor: "white",
    borderRadius: "6px",
    padding: "20px"
  }
  return (
    <div style={wrapperStyle}>
      <h1 className="text-center">{t('congratulations')}</h1>
      <h3>{name}, {t('priceWon')}</h3>
      <p>{t('confirmRedeem')}</p>
      <Button className="button ok w-100-x" onClick={() => props.onNext(true)}>{t('yes')}</Button>
    </div>
  )

}
