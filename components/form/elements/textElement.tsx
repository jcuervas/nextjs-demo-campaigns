import React, {ForwardedRef} from "react";
import {FormElementProps} from "@components/form/formElement";
import {StyledTextField} from '@components/shared';
import {useTranslation} from 'next-i18next';

export const TextElement = React.forwardRef((props: FormElementProps, ref: ForwardedRef<HTMLInputElement>) => {
  const {t} = useTranslation('common');
  return (
      <StyledTextField
        ref={ref}
        variant="standard"
        {...props.register}
        id={props.element.key}
        name={props.element.key}
        type={props.element.type}
        error={props.error}
        label={t(props.element.publicLabel)}
      />
    );
  }
);
