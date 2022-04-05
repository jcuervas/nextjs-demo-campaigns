import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import {DialogContent, DialogTitle} from '@mui/material';


interface PopupProps {
  text?: string;
  label?: string;
}

export function Popup(props: PopupProps) {
  const [visible, setVisible] = useState(false);
  const {label, text} = props
  return (
    <div>
      <a href="#" className="link" onClick={() => setVisible(true)}>{props.label}</a>
      <Dialog
        id="popup-dialog"
        open={visible}
        aria-labelledby={label}>
        <DialogTitle>{label}</DialogTitle>
        <DialogContent>{text}</DialogContent>
      </Dialog>
    </div>
  );
}
