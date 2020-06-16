import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postTweet } from '../../../redux/actions/tweet.actions';
import { postReply } from '../../../redux/actions/reply.action';
// Mui Components
import Paper from '@material-ui/core/Paper';
// Mui Styles
import { makeStyles } from '@material-ui/core/styles';
// Components
import NewTweetForm from './NewTweetForm';
import useCreateTweet from '../../../common/hooks/react-query/useCreateTweet';
import useCreateReply from '../../../common/hooks/react-query/useCreateReply';

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
  const newTweetImages = useSelector(state => state.cached.newTweetImages);
  const createTweet = useCreateTweet();
  const createReply = useCreateReply();
  const [tweetText, setTweetText] = useState('');

  const handleTweetText = useCallback(event => {
    setTweetText(event.target.value);
  }, []);

  const tweetImages = newTweetImages.map(image => {
    return {
      name: image.originalname,
      type: image.mimetype,
      url: image.path,
      mediaId: image._id
    };
  });

  const submitForm = () => {
    if (!reply) {
      createTweet({ fullText: tweetText, tweetImages });
    } else {
      createReply({ fullText: tweetText, tweetId });
    }
    setTweetText('');
    onFormSubmit();
  };

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
