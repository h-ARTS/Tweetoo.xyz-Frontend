import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCachedProfileImage } from '../../../redux/actions/signup.actions';
// Mui Components
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
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
  fileInputBase: {
    height: 0.1,
    width: 0.1,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: '-1'
  },
  profileImage: {
    position: 'absolute',
    backgroundImage: props => `url(http://localhost:6500/${props.userImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}));
export default function FileUploadButton() {
  const fileInputEl = useRef(null);
  const dispatch = useDispatch();
  const { userHandle, userImage } = useSelector(state => state.signup_form);
  const classes = useStyles({ userImage });

  const handleFileUpload = event => {
    event.stopPropagation();
    const file = event.target.files[0];
    dispatch(uploadCachedProfileImage({ file, userHandle }));
  };

  const onButtonClick = () => {
    fileInputEl.current.click();
  };

  return (
    <ButtonBase
      autoFocus
      className={classes.root}
      color="secondary"
      data-focusable="true"
      aria-haspopup="false"
      aria-label="Add Avatar photo"
      role="button"
      focusRipple
      onClick={onButtonClick}
    >
      <Avatar className={classes.avatar}>
        <Box className={classes.profileImage} />
        <UploadIcon fontSize="large" />
        <InputBase
          type="file"
          className={classes.fileInputBase}
          inputProps={{
            accept: 'image/png, image/jpeg, image/webp',
            tabIndex: '-1',
            'data-focusable': true,
            ref: fileInputEl
          }}
          onChange={handleFileUpload}
        />
      </Avatar>
    </ButtonBase>
  );
}
