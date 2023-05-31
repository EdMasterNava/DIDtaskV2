import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { DialogTitle, IconButton } from '@mui/material';
import React from 'react';

const DialogHeader = ({ children, onClose }) => {
  return (
    <DialogTitle>
      {children}
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 16,
            color: 'grey'
          }}
        >
          <CloseOutlined />
        </IconButton>
      )}
    </DialogTitle>
  );
};

export default React.memo(DialogHeader);