import React, {CSSProperties, useState} from "react";

import styles from './form.module.scss';
import {StepProps} from "@components/steps/interface";
import {Card, CardContent, CardHeader} from "@react-md/card";
import RegisterForm from "@components/form/register-form";
import {useRouter} from "next/router";
import {Popup} from "@components/popupbox/popup";
import firebaseService from "@services/firebase-service";
import {useToggle} from "@react-md/utils";
import {LinearProgress} from "react-md";

export default function FormStep(props: StepProps) {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [loading, startLoading, stopLoading] = useToggle(false);

  const handleSubmit = async (dataForm) => {
    startLoading()
    try {
      Object.keys(dataForm).forEach(key => {
        if (key[0] === '_') delete dataForm[key]
      })
      for (const key of Object.keys(dataForm)) {
        if (key.includes('Upload')) {
          const file: File = dataForm[key]
          dataForm.url = await firebaseService.uploadFileToStorage(`campaigns/${props.campaign.id}/tickets/${file.name}`, file)
        }
      }
      await fetch('/api/handle-register', {
        method: 'POST',
        body: JSON.stringify(dataForm),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return router.push('thank-you')
    } catch (e) {
      setError(e.message)
      console.log({err: e.message})
    }
    stopLoading()
  }
  const {form, configuration, template} = props.campaign;

  const sectionStyles: CSSProperties = {
    backgroundColor: template.backgroundColor,
    padding: template.type === 'fullHeight' ? '4rem' : '1em'
  }
  const cardStyles: CSSProperties = {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  }
  return (
    <section style={sectionStyles} className={styles.form}>
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
          <p>{form.description}</p>
        </CardHeader>
        <CardContent style={{padding: '1rem'}}>
          <RegisterForm
            campaign={props.campaign}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
      {error && <Popup text={error} key="error"/>}
    </section>
  );
}
