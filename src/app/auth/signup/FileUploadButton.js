import React, { useRef } from 'react';
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
  fileInputBase: {
    height: 0.1,
    width: 0.1,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: '-1'
  }
}));
export default function FileUploadButton() {
  const classes = useStyles();
  const fileInputEl = useRef(null);
  const dispatch = useDispatch();
  const { userHandle } = useSelector(state => state.signup_form);

  const handleFileUpload = event => {
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
      tabIndex="0"
      onClick={onButtonClick}
    >
      <Avatar className={classes.avatar}>
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
