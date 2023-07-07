import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function SuccessMessage({ message, onClose }) {
  return (
    <Snackbar open={true} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity="success">
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SuccessMessage;
