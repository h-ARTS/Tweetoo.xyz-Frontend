import React, { useCallback } from 'react';
// Mui components
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Components
import TweetContainer from '../home/TweetContainer';
import SkeletonTweet from '../../common/ui/skeletons/SkeletonTweet';
// Hooks
import { useParams } from '@reach/router';
import useFetchReplies from '../../common/hooks/react-query/useFetchReplies';

const Replies = () => {
  const params = useParams();
  const { status, data, refetch } = useFetchReplies(params.tweetId);

  const refetchNewReplies = useCallback(() => {
    refetch();
  }, [refetch]);

  return status === 'loading' ? (
    [1, 2, 3].map(key => <SkeletonTweet key={key} />)
  ) : status === 'error' || !data.length ? (
    <Box p={1}>
      <Typography>Looks like nobody replied uptil yet. Reply now!</Typography>
    </Box>
  ) : (
    data.map(reply => (
      <TweetContainer
        key={reply._id}
        tweet={reply}
        onRefresh={refetchNewReplies}
      />
    ))
  );
};

export default Replies;
