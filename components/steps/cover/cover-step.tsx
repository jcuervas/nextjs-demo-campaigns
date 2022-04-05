import React from 'react';

import {Popup} from '@components/popupbox/popup';
import {useTranslation} from 'next-i18next';
import {StepProps} from '@components/steps/interface';
import CardContent from '@mui/material/CardContent';
import {Box} from '@mui/material';
import {StyledButton, StyledCard, StyledLogo} from '@components/shared';
import VideoPlayer from '@components/steps/cover/VideoPlayer';
import 'node_modules/video-react/dist/video-react.css';


export default function CoverStep(props: StepProps) {

  let {cover, configuration, template} = props.campaign;
  const {t} = useTranslation('common');

  return (
    <StyledCard>
      <CardContent>
        <Box sx={{width: '100%', textAlign: 'left'}}>
          <StyledLogo src={template.logo} alt={configuration.campaignName}/>
        </Box>
        <h1>{configuration.campaignName}</h1>
        <p>{cover.description}</p>
        {cover.type === 'image' && cover.media.image && <img src={cover.media.image} alt=""/>}
        {cover.type === 'video' && cover.media.video.source && <VideoPlayer src={cover.media.video.source} poster={cover.media.video.poster}/>}
        <div className="actions">
          {configuration.legalInfo.html
            ? <Popup text={configuration.legalInfo.html} label={t('see_legal_bases')}/>
            : <a href={configuration.legalInfo.fileUrl} className="link" target="_blank">{t('see_legal_bases')}</a>
          }
          <StyledButton onClick={() => props.onNext(true)} className="button ok">{t('next')}</StyledButton>
        </div>
      </CardContent>
    </StyledCard>
  );
}
