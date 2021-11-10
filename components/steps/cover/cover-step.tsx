import React, {CSSProperties} from "react";
import {ControlBar, Player, PlayToggle} from 'video-react';
import {Card, CardActions, CardContent, CardHeader,} from "@react-md/card";
import {Popup} from '@components/popupbox/popup';

import styles from "./cover.module.scss";
import {useTranslation} from "next-i18next";
import {StepProps} from "@components/steps/interface";
import {Button} from "@react-md/button";
import {useRouter} from "next/router";
import {useToggle} from "@react-md/utils";
import {LinearProgress} from "react-md";

export default function CoverStep(props: StepProps) {

  let {cover, configuration, template} = props.campaign;
  const {t} = useTranslation('common')
  const router = useRouter()
  const [loading, startLoading] = useToggle(false);

  function goNext() {
    startLoading()
    return router.push('form', 'form', {locale: configuration.lang.locale})
  }
  const sectionStyles: CSSProperties = {
    backgroundColor: template.backgroundColor,
    padding: template.type === 'fullHeight' ? '4rem' : '1em'
  }
  const cardStyles : CSSProperties = {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  }

  return (
    <section style={sectionStyles} className={styles.content_cover}>
      {loading &&
      <LinearProgress
          id="loader"
          style={{
            position: 'absolute',
            top: 0,
            right: 0
          }}/>}
      <Card style={cardStyles}>
        <CardHeader>
          <img src={template.logo} alt={configuration.campaignName}/>
          <h1>{configuration.campaignName}</h1>
        </CardHeader>
        <CardContent>
          <p>{cover.description}</p>
          {cover.media.image && <img src={cover.media.image} alt=""/>}
          {cover.media.video.source &&
          <Player
              playsInline
              poster={cover.media.video.poster}
              src={cover.media.video.source}>
            <ControlBar autoHide={true} disableDefaultControls={false}>
              <PlayToggle/>
            </ControlBar>
          </Player>
          }
        </CardContent>
        <CardActions>
          <div className={styles.buttons}>
            {configuration.legalInfo.html
              ? <Popup text={configuration.legalInfo.html} label={t('see_legal_bases')}/>
              : <a href={configuration.legalInfo.fileUrl} className="link" target="_blank">{t('see_legal_bases')}</a>
            }
            <Button onClick={goNext} className="button ok">{t('enter')}</Button>
          </div>
        </CardActions>
      </Card>
    </section>
  );
}
