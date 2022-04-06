import React, {CSSProperties} from "react";
import {CampaignTicket} from "@interfaces/campaign-ticket";
import {useTranslation} from "next-i18next";
import { StyledCard, StyledButton } from "@components/shared";
import {CardContent} from '@mui/material';

interface Props {
  ticket: CampaignTicket,
  onNext: (accept: boolean) => void
}

export default function PinCodeStep(props: Props) {
  const {ticket} = props
  const name = ticket.name + " " + (ticket.surname ? ticket.surname : '')
  const {t} = useTranslation('common')

  return (
    <StyledCard>
      <CardContent>
      <h1 className="text-center">{t('congratulations')}</h1>
      <h2>{name}, {t('priceWon')}</h2>
      <p>{t('confirmRedeem')}</p>
      <StyledButton className="ok" onClick={() => props.onNext(true)}>{t('yes')}</StyledButton>
      </CardContent>
    </StyledCard>
  )

}
