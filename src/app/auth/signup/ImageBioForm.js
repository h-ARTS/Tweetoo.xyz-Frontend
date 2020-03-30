import React from 'react';
// Mui Components
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FileUploadButton from './FileUploadButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  dialogText: {
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  },
  gridFileUpload: {
    textAlign: 'center'
  }
}));
export default function ImageBioForm({ bio, location, website, onDataChange }) {
  const classes = useStyles();

  const handleDataChange = event => {
    onDataChange({
      [event.target.id]: event.target.value
    });
  };

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
            color="secondary"
            name="location"
            id="location"
            label="Where do you live?"
            variant="filled"
            fullWidth
            value={location}
            onChange={handleDataChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="website"
            color="secondary"
            name="website"
            type="url"
            id="website"
            label="Website"
            variant="filled"
            fullWidth
            value={website}
            onChange={handleDataChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="bio"
            color="secondary"
            name="bio"
            id="bio"
            label="Bio"
            variant="filled"
            multiline
            fullWidth
            value={bio}
            onChange={handleDataChange}
          />
        </Grid>
      </Grid>
    </>
  );
}
