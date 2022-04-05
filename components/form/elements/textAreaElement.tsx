import React, {ForwardedRef} from "react";
import {FormElementProps} from "@components/form/formElement";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {FormControlLabel} from '@mui/material';

export const TextAreaElement = React.forwardRef((props: FormElementProps, ref: ForwardedRef<HTMLTextAreaElement>) => (
  <FormControlLabel
    control={
      <TextareaAutosize
        ref={ref}
        className="text-area"
        id={props.element.key}
        name={props.element.key}
        maxRows={4}
      />
    }
    label={props.element.publicLabel}
  />
))
