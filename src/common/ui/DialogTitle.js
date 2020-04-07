import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/CloseTwoTone';

const styles = theme => ({
  ...theme.spreadThis,
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1)
  }
});
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ariaLabel } = props;
  return (
    <MuiDialogTitle disableTypography aria-label={ariaLabel}>
      <Typography component="h2" variant="h5" className={classes.dialogTitle}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          color="secondary"
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default DialogTitle;
