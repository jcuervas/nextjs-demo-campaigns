import React, {ForwardedRef} from "react";
import {FormElementProps} from "@components/form/formElement";
import {Checkbox} from "@react-md/form";

export const CheckElement = React.forwardRef((props: FormElementProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
      <Checkbox
        ref={ref}
        id={props.element.key}
        name={props.element.key}
        defaultChecked={props.value}
        label={props.element.publicLabel}
        disableProgrammaticRipple={false}
        disableRipple={false}
        rippleClassNames={{}}
        rippleTimeout={0}/>
    )
  }
);
