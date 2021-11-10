import React from "react";
import {Dialog, DialogContent, DialogHeader, useToggle} from "react-md";


interface PopupProps {
  text?: string;
  label?: string;
}

export function Popup(props: PopupProps) {
  const [visible, enable, disable] = useToggle(false);
  const {label, text} = props
  return (
    <div>
      <a href="#" className="link" onClick={enable}>{props.label}</a>
      <Dialog
        id="popup-dialog"
        visible={visible}
        onRequestClose={disable}
        aria-labelledby={label}>
        <DialogHeader>{label}</DialogHeader>
        <DialogContent>{text}</DialogContent>
      </Dialog>
    </div>
  );
}
