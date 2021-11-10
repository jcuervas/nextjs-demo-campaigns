import React from "react";

import {TextElement} from './elements/textElement';
import {CheckElement} from './elements/checkElement';
import {FileElement} from './elements/fileElement';

import {TextAreaElement} from "@components/form/elements/textAreaElement";
import {ObjectLiteral} from "@interfaces/util";
import {useTranslation} from "next-i18next";
import {FormField} from "@interfaces/campaign";

const ElementDictionary = {
  text: TextElement,
  email: TextElement,
  checkbox: CheckElement,
  file: FileElement,
  textarea: TextAreaElement,
};

export interface FormElementProps {
  element: FormField & { image?: string; valid_types?: any };
  value?: any;
  className: string;
  register: any;
  errors: any;
  onFile?: (file: File, element: FormField) => void
}

export const FormElement = (props: FormElementProps) => {

  const {element, register, errors} = props;
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
        ref={register(rules)}/>
      <i className="bar"/>
      {getErrors(errors[element.key]).map(error => {
        return (
          <div className="feedback" key={error}>
            {error}
          </div>
        )
      })}
    </div>
  );
}
