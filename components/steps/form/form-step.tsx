import React, {useState} from 'react';
import {StepProps} from '@components/steps/interface';
import RegisterForm from '@components/form/register-form';
import {useRouter} from 'next/router';
import {Popup} from '@components/popupbox/popup';
import {Box} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import {StyledCard, StyledLogo} from '@components/shared';
import apiService from '@services/apiService';
import {t} from 'i18next';

export default function FormStep(props: StepProps) {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (dataForm) => {
    try {
      Object.keys(dataForm).forEach(key => {
        if (key[0] === '_') delete dataForm[key];
      });
      for (const key of Object.keys(dataForm)) {
        if (key.includes('Upload') && dataForm[key]) {
          const file: File = dataForm[key];
          dataForm.url = await apiService.uploadFile(`campaigns/${props.campaign.id}/tickets/${file.name}`, file);
          console.log({url: dataForm.url})
          if (!dataForm.url) {
            setError(t('fileCouldNotBeUploaded'));
            return
          }
        }
      }
      await apiService.handleRegister(dataForm);
      return router.push('thank-you');
    } catch (e) {
      setError(e.message);
    }
  };
  const {form, configuration, template} = props.campaign;

  return (
    <StyledCard>
      <CardContent>
        <Box sx={{textAlign: 'left', width: '100%'}}>
          <StyledLogo src={template.logo} alt={configuration.campaignName}/>
        </Box>
        <h1>{configuration.campaignName}</h1>
        <p>{form.description}</p>
        <RegisterForm
          campaign={props.campaign}
          onSubmit={handleSubmit}
        />
      </CardContent>
      {error && <Popup text={error} key="error"/>}
    </StyledCard>
  );
}
