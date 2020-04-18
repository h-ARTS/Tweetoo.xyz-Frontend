import React, { useEffect } from 'react';
import { useParams } from '@reach/router';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_REPLIES } from '../../redux/types';
import { getReplies } from '../../redux/actions/reply.action';
// Mui components
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tweet from '../home/Tweet';

export const Replies = React.memo(() => {
  const params = useParams();
  const dispatch = useDispatch();
  const { loadingReplies } = useSelector(state => state.ui);
  const replies = useSelector(state => state.replies);

  useEffect(() => {
    console.log('Replies', 're-render');
    dispatch(getReplies(params.tweetId));

    return () => {
      if (replies.length > 0) {
        dispatch({ type: CLEAR_REPLIES });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.tweetId, replies.length]);

  if (loadingReplies) {
    return (
      <Box p={3}>
        <CircularProgress size="small" color="secondary" />
      </Box>
    );
  } else {
    return replies.map(reply => <Tweet key={reply._id} tweet={reply} />);
  }
});

export default Replies;
