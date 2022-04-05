import React from 'react';
import {useTranslation} from 'next-i18next';
import {YesNoSelector} from '@components/steps/is-older/yesNoSelector/yesNoSelector';
import {YearSelector} from '@components/steps/is-older/yearSelector/yearSelector';
import {StepProps} from '@components/steps/interface';
import {Box, Typography} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import {StyledCard, StyledLogo} from '@components/shared';

export default function IsOlderStep(props: StepProps) {

  const {t} = useTranslation('common');
  let {isOlder, configuration, template} = props.campaign;

  return (
    <StyledCard>
      <CardContent>
        <Box sx={{textAlign: 'left', width: '100%'}}>
          <StyledLogo src={template.logo} alt={configuration.campaignName}/>
        </Box>
        <h1>{t('is_older')}</h1>
        <div className="actions">
          {isOlder.selectorType === 'year' && <YearSelector onNext={props.onNext}/>}
          {isOlder.selectorType === 'yes_no' && <YesNoSelector onNext={props.onNext}/>}
        </div>
      </CardContent>
    </StyledCard>
  );
}

