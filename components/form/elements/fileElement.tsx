import React, {ForwardedRef, useCallback, useState} from "react";
import {FormElementProps} from "@components/form/formElement";
import {FileInput} from "@react-md/form";
import styles from './file.module.scss';
import {CameraOutlineIcon} from "@components/icons/camera-outline.icon";
import {useTranslation} from "next-i18next";

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
      <FileInput
        ref={ref}
        name={'_' + element.key}
        className={className + ' ' + styles.fileInput}
        id={element.key}
        onChange={onChange}
        theme="clear"
        accept={element.valid_types}
        themeType="contained"
        buttonType={"text"}
        disableIconSpacing={true}
      >
        {getIcon()}
        <span className={styles.fileInputLabel}>{element.publicLabel}</span>
      </FileInput>
      <pre>
        <code>{file || t("none_selected")}</code>
      </pre>
    </>
  )
})
