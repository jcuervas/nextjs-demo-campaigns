import React, {ForwardedRef} from "react";
import {FormElementProps} from "@components/form/formElement";
import {TextField} from "@react-md/form";

export const TextElement = React.forwardRef((props: FormElementProps, ref: ForwardedRef<HTMLInputElement>) => (
    <TextField
      ref={ref}
      id={props.element.key}
      name={props.element.key}
      type={props.element.type}
      defaultValue={props.value}
      label={props.element.publicLabel}
    />
  )
);
