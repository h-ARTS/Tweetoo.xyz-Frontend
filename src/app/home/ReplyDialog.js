import React from 'react';
import { Link } from '@reach/router';
// Mui Components
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '../../common/ui/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// Components
import TweetContainer from './TweetContainer';
import NewTweetFormContainer from './new-tweet/NewTweetFormContainer';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0)
  }
}));
export default function ReplyDialog({
  tweet,
  openReplyDialog,
  handleCloseEdit
}) {
  const classes = useStyles();

  return (
    <Dialog
      open={openReplyDialog}
      color="secondary"
      aria-labelledby="reply-title"
      aria-describedby="reply-description"
      onClose={handleCloseEdit}
      PaperProps={{ elevation: 0 }}
      scroll="paper"
      fullWidth
    >
      <DialogTitle onClose={handleCloseEdit} id="reply-title" size="small">
        <Box p={1}></Box>
      </DialogTitle>
      <DialogContent dividers className={classes.root}>
        <TweetContainer tweet={tweet} minimized />
        <Box p={2}>
          <Typography variant="body2" color="textSecondary">
            Reply on <Link to={`/${tweet.handle}`}>{tweet.handle}</Link>
          </Typography>
        </Box>
        <NewTweetFormContainer
          reply
          tweetId={tweet._id}
          onFormSubmit={handleCloseEdit}
        />
      </DialogContent>
    </Dialog>
  );
}
