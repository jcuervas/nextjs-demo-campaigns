import React, {ForwardedRef, useCallback, useState} from 'react';
import {FormElementProps} from '@components/form/formElement';
import {CameraOutlineIcon} from '@components/icons/camera-outline.icon';
import {useTranslation} from 'next-i18next';
import {IconButton, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {StyledIconButton, StyledText } from '@components/shared';

const HiddenInput = styled('input')({display: 'none'})

export const FileElement = React.forwardRef((props: FormElementProps, ref: ForwardedRef<HTMLInputElement>) => {

  const {element, className} = props;
  const [file, setFile] = useState("");
  const {t} = useTranslation('common');

  function getIcon() {
    return element.image
      ? <img src={element.image} alt="" className="img-upload"/>
      : <CameraOutlineIcon/>
  }

  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {

      const [file] = Array.from(event.currentTarget.files || [null]);
      if (file) {
        setFile(file.name);
      }
      props.onFile(file, element);
    },[]
  );

  return (
    <>
      <label htmlFor={element.key}>
        <HiddenInput
          name={'_' + element.key}
          accept="image/*"
          id={element.key}
          type="file"
          onChange={onChange}/>
        {
          // @ts-ignore
          <StyledIconButton color="info" component="span">
            {getIcon()}
            <StyledText
              variant="body1">
              {t(element.publicLabel)}
            </StyledText>
          </StyledIconButton>
        }
        <pre>
        <StyledText variant="body2">{file || t("none_selected")}</StyledText>
      </pre>
      </label>
    </>
  )
})
