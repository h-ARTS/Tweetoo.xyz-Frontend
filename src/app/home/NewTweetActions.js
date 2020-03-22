import React from 'react';
// Mui Components
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/ImageTwoTone';
import ScheduleIcon from '@material-ui/icons/ScheduleTwoTone';
// Mui Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  tweetActionButton: {
    padding: theme.spacing(1)
  }
}));
export default function NewTweetActions() {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" marginTop="5px" marginLeft="-10px">
      <IconButton color="secondary" className={classes.tweetActionButton}>
        <ImageIcon />
      </IconButton>
      <IconButton color="secondary" className={classes.tweetActionButton}>
        <ScheduleIcon />
      </IconButton>
    </Box>
  );
}
