import React from 'react';

import {TextElement} from './elements/textElement';
import {CheckElement} from './elements/checkElement';
import {FileElement} from './elements/fileElement';

import {TextAreaElement} from '@components/form/elements/textAreaElement';
import {ObjectLiteral} from '@interfaces/util';
import {useTranslation} from 'next-i18next';
import {FormField} from '@interfaces/campaign';
import {UseFormRegisterReturn} from 'react-hook-form/dist/types/form';

const ElementDictionary = {
  text: TextElement,
  email: TextElement,
  checkbox: CheckElement,
  file: FileElement,
  textarea: TextAreaElement,
};

export interface FormElementProps {
  element: FormField & { image?: string; valid_types?: any };
  onFile?: (file: File, element: FormField) => void
  register: UseFormRegisterReturn;
  error: boolean
  className: string
}

export const FormElement = (props: FormElementProps) => {

  const {element} = props;
  const required = element.validation.some(key => key === 'required')
  const pattern = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  )
  const {t} = useTranslation('common');

  const rules: ObjectLiteral<any> = {}
  required && (rules.required = true)

  if (element.type === 'email') {
    rules.pattern = pattern;
  }
  let Element = ElementDictionary[element.type];

  const getErrors = (errorObject: { type: string; message: string; }) => {
    if (!errorObject) return [];
    const errors = [];
    if (errorObject.type === 'required') {
      errors.push(t("error_required"))
    }
    return errors;
  }
  return (
    <div className={props.className}>
      <Element
        {...props}
        />
      <i className="bar"/>
      {/*{getErrors(errors[element.key]).map(error => {
        return (
          <div className="feedback" key={error}>
            {error}
          </div>
        )
      })}*/}
    </div>
  );
}
