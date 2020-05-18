import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postTweet } from '../../redux/actions/tweet.actions';
import { postReply } from '../../redux/actions/reply.action';
// Mui Components
import Paper from '@material-ui/core/Paper';
// Mui Styles
import { makeStyles } from '@material-ui/core/styles';
// Components
import NewTweetForm from './NewTweetForm';

const useStyles = makeStyles({
  root: {
    borderWidth: '0 0 6px 0'
  }
});
export const NewTweetFormContainer = React.memo(function NewTweetFormContainer({
  reply,
  tweetId,
  onFormSubmit
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const current = useSelector(state => state.user.current);
  const [tweetText, setTweetText] = useState('');

  const handleTweetText = useCallback(event => {
    setTweetText(event.target.value);
  }, []);

  const submitForm = useCallback(() => {
    if (!reply) {
      dispatch(postTweet({ fullText: tweetText }));
    } else {
      dispatch(postReply(tweetText, tweetId));
    }
    setTweetText('');
    onFormSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper className={classes.root} variant="outlined" square>
      <NewTweetForm
        user={current}
        tweetText={tweetText}
        onTweetText={handleTweetText}
        onSubmit={submitForm}
      />
    </Paper>
  );
});

export default NewTweetFormContainer;
