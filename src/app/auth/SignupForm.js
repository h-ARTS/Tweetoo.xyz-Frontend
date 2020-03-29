import React, { useState } from 'react';
// Redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { updateFormData } from '../../redux/actions/signup.actions';
// Mui Components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// Mui Icon
import ArrowBackIcon from '@material-ui/icons/ArrowBackTwoTone';
// Mui styles
import { makeStyles } from '@material-ui/core/styles';
// Components
import ImageBioForm from './signup/ImageBioForm';
import NameEmailForm from './signup/NameEmailForm';
import UsernamePasswordForm from './signup/UsernamePasswordForm';

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    textAlign: 'center',
    paddingBottom: theme.spacing(1)
  },
  dialogTitleH2: {
    fontWeight: 800
  },
  dialogActions: {
    justifyContent: 'space-between',
    padding: theme.spacing(2, 3)
  }
}));
export default function SignupForm({ open, closeDialog }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const {
    email,
    fullName,
    password,
    userHandle,
    bio,
    website,
    location
  } = useSelector(state => state.signup_form, shallowEqual);

  const handleDataChange = data => {
    dispatch(updateFormData(data));
  };

  const getCurrentStep = Step => {
    switch (Step) {
      case 0:
        return (
          <NameEmailForm
            email={email}
            fullName={fullName}
            onDataChange={handleDataChange}
          />
        );
      case 1:
        return (
          <UsernamePasswordForm
            handle={userHandle}
            password={password}
            onDataChange={handleDataChange}
          />
        );
      case 2:
        return (
          <ImageBioForm
            bio={bio}
            location={location}
            website={website}
            onDataChange={handleDataChange}
          />
        );
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

  // const handleSubmit = event => {
  //   event.preventDefault();
  // };

  return (
    <Dialog
      open={open}
      color="secondary"
      aria-labelledby="signup-form-title"
      onClose={closeDialog}
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
      <DialogContent>
        {getCurrentStep(activeStep)}
        {/* <form onSubmit={handleSubmit} encType="multipart/form-data">
        </form> */}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        {activeStep === 0 ? (
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
        ) : (
          <IconButton color="secondary" onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        )}
        {activeStep === 2 ? (
          <Button
            color="secondary"
            type="submit"
            variant="contained"
            disableElevation
          >
            Finish
          </Button>
        ) : (
          <Button color="secondary" onClick={handleNext}>
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
