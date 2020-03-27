import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBackTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import NameEmailForm from './signup/NameEmailForm';
import UsernamePasswordForm from './signup/UsernamePasswordForm';
import ImageBioForm from './signup/ImageBioForm';

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    textAlign: 'center',
    paddingBottom: theme.spacing(1)
  },
  dialogTitleH2: {
    fontWeight: 800
  }
}));
export default function SignupForm({ open, onClick }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const getCurrentStep = Step => {
    // const Component = {
    //   '0': NameEmailForm,
    //   '1': UsernamePasswordForm,
    //   '2': ImageBioForm
    // };
    // return <Component.Step />;
    switch (Step) {
      case 0:
        return <NameEmailForm />;
      case 1:
        return <UsernamePasswordForm />;
      case 2:
        return <ImageBioForm />;
      default:
        throw new Error('No Component defined!');
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Dialog
      open={open}
      color="secondary"
      aria-labelledby="signup-form-title"
      onClose={onClick}
      PaperProps={{ elevation: 0 }}
      fullWidth
    >
      <DialogTitle
        id="signup-form-title"
        className={classes.dialogTitle}
        disableTypography
      >
        <Typography
          component="h2"
          variant="h5"
          className={classes.dialogTitleH2}
        >
          Tweetoo.xyz
        </Typography>
      </DialogTitle>
      <DialogContent>{getCurrentStep(activeStep)}</DialogContent>
      <DialogActions>
        {activeStep === 0 ? (
          <Button onClick={''} color="secondary">
            Cancel
          </Button>
        ) : (
          <IconButton color="secondary" onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Button color="secondary" onClick={handleNext}>
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
}
