import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCachedProfileImage } from '../../../redux/actions/signup.actions';
// Mui Components
import Avatar from '@material-ui/core/Avatar';
import InputBase from '@material-ui/core/InputBase';
import ButtonBase from '@material-ui/core/ButtonBase';
import UploadIcon from '@material-ui/icons/CloudUploadTwoTone';
// Mui Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.secondary.main,
    borderRadius: '50%'
  },
  avatar: {
    position: 'relative',
    width: 90,
    height: 90,
    color: theme.palette.secondary.main,
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.secondary.main}`
  },
  fileInput: {
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    opacity: 0,
    outline: 0,
    position: 'absolute',
    cursor: 'pointer'
  }
}));
export default function FileUploadButton() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userHandle } = useSelector(state => state.signup_form);

  const handleFileUpload = event => {
    const file = event.target.files[0];
    dispatch(uploadCachedProfileImage({ file, userHandle }));
  };

  return (
    <ButtonBase className={classes.root} color="secondary">
      <Avatar className={classes.avatar} component="label">
        <UploadIcon fontSize="large" />
        <InputBase
          type="file"
          className={classes.fileInput}
          inputProps={{ accept: 'image/png, image/jpeg, image/webp' }}
          onChange={handleFileUpload}
        />
      </Avatar>
    </ButtonBase>
  );
}
