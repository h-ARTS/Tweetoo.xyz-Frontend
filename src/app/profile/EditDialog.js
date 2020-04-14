import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData, imageUpload } from '../../redux/actions/user.actions';
// Mui components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
// Mui Icons
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone';
import CloseIcon from '@material-ui/icons/CloseTwoTone';
// Mui styles
import { makeStyles } from '@material-ui/core/styles';
// Components
import DialogTitle from '../../common/ui/DialogTitle';

const useStyles = makeStyles(theme => ({
  ...theme.spreadThis,
  dialogContent: {
    padding: 0
  },
  coverUploadContainer: {
    position: 'relative',
    borderLeft: `3px solid ${theme.palette.primary.main}`,
    borderRight: `3px solid ${theme.palette.primary.main}`,
    paddingBottom: '33.3333%'
  },
  coverImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: props =>
      `url(http://localhost:6500/${props.coverImage.url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  },
  coverImageActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgb(0,0,0, 0.3)',
    opacity: '0.75'
  },
  userImageUploadContainer: {
    position: 'relative',
    height: 20,
    left: 0,
    right: 0
  },
  userImageBackdrop: {
    backgroundColor: 'rgb(0,0,0, 0.3)',
    position: 'absolute',
    width: theme.spacing(15),
    height: theme.spacing(15),
    borderRadius: '50%',
    left: '20px',
    bottom: '-5px',
    margin: '0 auto'
  },
  userImageAction: {
    position: 'absolute',
    height: 0,
    top: '-60px',
    left: '55px',
    opacity: 0.75
  },
  userImage: {
    position: 'absolute',
    backgroundImage: props =>
      `url(http://localhost:6500/${props.userImage.url})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: theme.spacing(15),
    height: theme.spacing(15),
    border: `5px solid ${theme.palette.primary.main}`,
    borderRadius: '50%',
    left: '15px',
    bottom: '-10px'
  }
}));
export default function EditDialog({ openEditDialog, handleCloseEdit }) {
  const coverImagefileInputEl = useRef(null);
  const userImagefileInputEl = useRef(null);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const {
    fullName,
    bio,
    location,
    website,
    handle,
    userImage,
    coverImage
  } = useSelector(state => state.user.current);
  const classes = useStyles({ coverImage, userImage });

  useEffect(() => {
    if (openEditDialog && Object.keys(data).length === 0) {
      setData({ fullName, bio, location, website });
    }
  }, [bio, data, fullName, location, openEditDialog, website]);

  const handleDataChange = event => {
    const userData = {
      ...data,
      [event.target.name]: event.target.value
    };
    setData(userData);
  };

  const saveUserData = event => {
    event.preventDefault();
    dispatch(updateUserData(data));
    handleCloseEdit();
  };

  const onCoverImageEditClick = () => {
    coverImagefileInputEl.current.click();
  };

  const onUserImageEditClick = () => {
    userImagefileInputEl.current.click();
  };

  const handleFileUpload = event => {
    const file = event.target.files[0];
    dispatch(imageUpload({ file, handle, dimension: event.target.name }));
  };

  return (
    <Dialog
      open={openEditDialog}
      color="secondary"
      aria-labelledby="edit-profile-title"
      aria-describedby="edit-profile-description"
      onClose={handleCloseEdit}
      PaperProps={{ elevation: 0 }}
      scroll="paper"
      fullWidth
    >
      <DialogTitle
        id="edit-profile-title"
        onClose={handleCloseEdit}
        ariaLabel="edit-profile-title"
      >
        Edit profile
      </DialogTitle>
      <DialogContent className={classes.dialogContent} dividers>
        <Box className={classes.coverUploadContainer}>
          <Box className={classes.coverImage} />
          <Box className={classes.coverImageActions}>
            <IconButton color="primary" onClick={onCoverImageEditClick}>
              <AddAPhotoIcon />
            </IconButton>
            <InputBase
              type="file"
              name="coverImage"
              className={classes.fileInputBase}
              inputProps={{
                accept: 'image/png, image/jpeg, image/webp',
                tabIndex: '-1',
                'data-focusable': true,
                ref: coverImagefileInputEl
              }}
              onChange={handleFileUpload}
            />
            <IconButton color="primary">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className={classes.userImageUploadContainer}>
          <Box className={classes.userImage} />
          <Box className={classes.userImageBackdrop} />
          <Box className={classes.userImageAction}>
            <IconButton color="primary" onClick={onUserImageEditClick}>
              <AddAPhotoIcon />
            </IconButton>
            <InputBase
              type="file"
              name="userImage"
              className={classes.fileInputBase}
              inputProps={{
                accept: 'image/png, image/jpeg, image/webp',
                tabIndex: '-1',
                'data-focusable': true,
                ref: userImagefileInputEl
              }}
              onChange={handleFileUpload}
            />
          </Box>
        </Box>
        <Box padding={2}>
          <Box py={1}>
            <TextField
              autoComplete="fullname"
              name="fullName"
              color="secondary"
              variant="filled"
              id="fullName"
              label="Name"
              required
              fullWidth
              autoFocus
              value={data.fullName}
              onChange={handleDataChange}
            />
          </Box>
          <Box py={1}>
            <TextField
              autoComplete="bio"
              color="secondary"
              name="bio"
              id="bio"
              label="Bio"
              variant="filled"
              multiline
              fullWidth
              value={data.bio}
              onChange={handleDataChange}
            />
          </Box>
          <Box py={1}>
            <TextField
              autoComplete="location"
              color="secondary"
              name="location"
              id="location"
              label="Where do you live?"
              variant="filled"
              fullWidth
              value={data.location}
              onChange={handleDataChange}
            />
          </Box>
          <Box py={1}>
            <TextField
              autoComplete="website"
              color="secondary"
              name="website"
              type="url"
              id="website"
              label="Website"
              variant="filled"
              fullWidth
              value={data.website}
              onChange={handleDataChange}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          onClick={saveUserData}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
