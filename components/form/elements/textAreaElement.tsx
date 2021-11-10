import React, {ForwardedRef} from "react";
import {FormElementProps} from "@components/form/formElement";
import {TextArea, FormThemeProvider} from "@react-md/form";

export const TextAreaElement = React.forwardRef((props: FormElementProps, ref: ForwardedRef<HTMLTextAreaElement>) => (
  <FormThemeProvider
    theme="outline">
    <TextArea
      ref={ref}
      className="text-area"
      id={props.element.key}
      name={props.element.key}
      maxRows={4}
      defaultValue={props.value}
      label={props.element.publicLabel}
    />
  </FormThemeProvider>
))
