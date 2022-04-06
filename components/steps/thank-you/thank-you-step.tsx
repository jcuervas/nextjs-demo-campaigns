import React from 'react';
import {useTranslation} from 'next-i18next';
import {StyledCard} from '@components/shared';
import {CardContent} from '@mui/material';

export function ThankYouStep() {
  const {t} = useTranslation('common');
  return (
    <StyledCard>
      <CardContent>
        <h2>{t('thanks_for_register')}</h2>
      </CardContent>
    </StyledCard>
  );
}
