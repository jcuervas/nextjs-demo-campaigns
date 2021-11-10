import React, {CSSProperties, useState} from "react";
import styles from './form.module.scss';
import {FormElement} from './formElement';
import {Popup} from '../popupbox/popup';

import {FormThemeProvider} from "@react-md/form";
import {useForm} from "react-hook-form";
import {useTranslation} from "next-i18next";
import {Campaign, FormField} from "@interfaces/campaign";
import {Button} from "@react-md/button";

interface FormProps {
  campaign: Campaign;
  onSubmit: (data: any) => void;
}

const allowedFieldTypes = ['text','email','checkbox','file','textarea']

export default function RegisterForm(props: FormProps) {
  let {form, configuration} = props.campaign;
  const {t} = useTranslation('common');
  const formBody = form.fields.filter(field => field.enabled && field.position === 'body' && allowedFieldTypes.includes(field.type));
  const formActions = form.fields.filter(field => field.enabled && field.position === 'actions' && allowedFieldTypes.includes(field.type));
  const {handleSubmit, register, errors, formState} = useForm<FormData>({
    mode: 'onChange', reValidateMode: 'onChange',
  });
  const {isDirty, isValid} = formState;
  const [files, setFiles] = useState<{[x: string]: File}>({});

  const onSubmit = data => {
    props.onSubmit({
      ...data,
      ...files,
      campaignId: props.campaign.id
    })
  }

  function getElementSpan(element: FormField) {
    return `grid-column-span-${element.spanColumns} grid-row-span-${element.spanRows}`;
  }

  function getLegalButton() {
    return (
      <div className="display-flex justify-flex-start white-space-normal">
        <span>{t('accept_privacy_policy')}&nbsp;</span>
        {configuration.legalInfo.html
          ? <Popup
            key="show_privacy_policy" text={configuration.legalInfo.html}
            label={t('privacy_policy')}/>
          : <a href={configuration.legalInfo.fileUrl} className="link"
               target="_blank">{t('privacy_policy')}</a>
        }
      </div>
    )
  }

  function onFile(file: File, element: FormField) {
    setFiles({...files, [element.key]: file});
  }

  const formDisabled = () => {
    return !isDirty || !isValid
  }

  const formFieldsStyles: CSSProperties = {
    gridTemplateColumns: `repeat(${form.gridColNumber}, 1fr)`,
  }

  return (
    <form autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
    >
      <FormThemeProvider theme="underline" underlineDirection="left">
        <div className={styles['form-fields']} style={formFieldsStyles}>
          {formBody.map((element: FormField) => {
            return (
              <FormElement
                register={register}
                errors={errors}
                className={getElementSpan(element)}
                element={element}
                key={element.key}
                onFile={onFile}
              />)
          })}
        </div>
      </FormThemeProvider>

      <div className={styles.buttons}>
        <div className={styles.legal}>
          {formActions.map((element: FormField) => {
            return (
              <FormElement
                register={register}
                errors={errors}
                className={getElementSpan(element)}
                element={element}
                key={element.key}
              />)
          })}
        </div>
        <Button type="submit" className="button ok" disabled={formDisabled()}>{t('send')}</Button>
      </div>
    </form>
  );
}
