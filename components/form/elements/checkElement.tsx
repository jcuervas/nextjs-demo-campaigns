import React, {ForwardedRef} from 'react';
import {FormElementProps} from '@components/form/formElement';
import Checkbox from '@mui/material/Checkbox';
import {FormControlLabel} from '@mui/material';

export const CheckElement = React.forwardRef((props: FormElementProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            ref={ref}
            {...props.register}
            id={props.element.key}
            name={props.element.key}
            defaultChecked={false}
            disableRipple={false}/>
        }
        label={props.element.publicLabel}
    />)
  }
);
