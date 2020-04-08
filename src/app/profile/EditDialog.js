import React from 'react';
import { useSelector } from 'react-redux';
// Mui components
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// Mui Icons
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone';
import CloseIcon from '@material-ui/icons/CloseTwoTone';
// Mui styles
import { makeStyles } from '@material-ui/core/styles';
// Components
import DialogTitle from '../../common/ui/DialogTitle';

const useStyles = makeStyles(theme => ({
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
    backgroundImage: props => `url(${props.coverImage})`,
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
    height: 30,
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
    bottom: '15px',
    margin: '0 auto'
  },
  userImageAction: {
    position: 'absolute',
    height: 0,
    top: '-70px',
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
    bottom: '10px'
  }
}));
export default function EditDialog({ openEditDialog, handleCloseEdit }) {
  const coverImage = 'https://source.unsplash.com/random/600x240';
  const { userImage } = useSelector(state => state.currentUser);
  const classes = useStyles({ coverImage: coverImage, userImage });

  return (
    <Dialog
      open={openEditDialog}
      color="secondary"
      aria-labelledby="edit-profile-title"
      aria-describedby="edit-profile-description"
      onClose={handleCloseEdit}
      PaperProps={{ elevation: 0 }}
      scroll="body"
      fullWidth
    >
      <DialogTitle
        id="edit-profile-title"
        onClose={handleCloseEdit}
        ariaLabel="edit-profile-title"
      >
        Edit profile
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Box className={classes.coverUploadContainer}>
          <Box className={classes.coverImage} />
          <Box className={classes.coverImageActions}>
            <IconButton color="primary">
              <AddAPhotoIcon />
            </IconButton>
            <IconButton color="primary">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className={classes.userImageUploadContainer}>
          <Box className={classes.userImage} />
          <Box className={classes.userImageBackdrop} />
          <Box className={classes.userImageAction}>
            <IconButton color="primary">
              <AddAPhotoIcon />
            </IconButton>
          </Box>
        </Box>
        <Box padding={2}></Box>
      </DialogContent>
    </Dialog>
  );
}
