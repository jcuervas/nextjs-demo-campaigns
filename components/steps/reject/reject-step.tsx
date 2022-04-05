import React, {CSSProperties} from 'react';
import {useTranslation} from 'next-i18next';
import {StepProps} from '@components/steps/interface';
import {StyledCard} from '@components/shared';
import CardHeader from '@mui/material/CardHeader';

export function RejectStep(props: StepProps) {
  const {t} = useTranslation('common');
  let {template} = props.campaign;
  const cardStyles: CSSProperties = {
    backgroundColor: template.backgroundColor,
    color: template.textColor,
    padding: '1rem',
  };
  return (
    <StyledCard style={cardStyles}>
      <CardHeader>
        <h2>{t('need_to_be_older')}</h2>
      </CardHeader>
    </StyledCard>
  );
}
