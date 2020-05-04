import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';

export default function AlertContainer() {
  const { errors } = useSelector(state => state.ui);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (errors) {
      setOpen(true);
    }
  }, [errors]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={Slide}
        autoHideDuration={6000}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Alert elevation={6} severity="error" variant="filled">
          {errors ? errors.message : ''}
        </Alert>
      </Snackbar>
    </div>
  );
}
