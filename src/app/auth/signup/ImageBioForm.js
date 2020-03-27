import React from 'react';
// Mui Components
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FileUploadButton from './FileUploadButton';
import { makeStyles } from '@material-ui/core/styles';

// bio: String,
// birthday: Date,
const useStyles = makeStyles(theme => ({
  dialogText: {
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  },
  gridFileUpload: {
    textAlign: 'center'
  }
}));
export default function ImageBioForm() {
  const classes = useStyles();
  return (
    <>
      <DialogContentText className={classes.dialogText}>
        Tell us more about yourself.
      </DialogContentText>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.gridFileUpload}>
          <FileUploadButton />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="location"
            name="location"
            color="secondary"
            variant="filled"
            required
            fullWidth
            id="location"
            label="Where do you live?"
            dense
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="website"
            name="website"
            color="secondary"
            variant="filled"
            fullWidth
            id="website"
            label="Website"
            type="url"
            dense
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="bio"
            name="bio"
            color="secondary"
            variant="filled"
            fullWidth
            id="bio"
            label="Bio"
            multiline
            dense
          />
        </Grid>
      </Grid>
    </>
  );
}
