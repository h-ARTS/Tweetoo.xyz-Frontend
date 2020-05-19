import React from 'react';
// Mui Component
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
// Mui Icons
import ImageIcon from '@material-ui/icons/ImageTwoTone';
import ScheduleIcon from '@material-ui/icons/ScheduleTwoTone';
// Mui styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  tweetActionButton: {
    padding: theme.spacing(1)
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

export default function NewTweetAction({
  actionComponentType,
  handleFileUpload,
  fileInputEl,
  onImageUploadClick
}) {
  const classes = useStyles();
  const actions = {
    imageUpload: (
      <div>
        <IconButton
          color="secondary"
          className={classes.tweetActionButton}
          onClick={onImageUploadClick}
        >
          <ImageIcon />
        </IconButton>
        <InputBase
          type="file"
          className={classes.fileInputBase}
          inputProps={{
            accept: 'image/png, image/jpeg, image/webp',
            tabIndex: '-1',
            'data-focusable': true,
            ref: fileInputEl,
            multiple: true
          }}
          onChange={handleFileUpload}
        />
      </div>
    ),
    schedule: (
      <IconButton color="secondary" className={classes.tweetActionButton}>
        <ScheduleIcon />
      </IconButton>
    )
  };
  return actions[actionComponentType];
}
