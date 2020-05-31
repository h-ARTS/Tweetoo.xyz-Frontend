import React, { useState, useCallback, createContext } from 'react';
import store from '../../redux/store';
import useMutateLike from '../hooks/react-query/useMutateLike';
import useMutateRetweet from '../hooks/react-query/useMutateRetweet';
import { postRetweet } from '../../redux/actions/tweet.actions';
import {
  createBookmark,
  removeBookmark
} from '../../redux/actions/bookmarks.action';

export const TweetContext = createContext();

const TweetContextProvider = ({
  tweet,
  onRefresh,
  openReplyDialog,
  setOpenReplyDialog,
  children
}) => {
  const mutateLike = useMutateLike();
  const mutateRetweet = useMutateRetweet();

  const handleLike = useCallback(() => {
    if (tweet.isLiked) {
      mutateLike({ tweet, type: 'unlike' });
    } else {
      mutateLike({ tweet, type: 'like' });
    }

    if (onRefresh) onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tweet.isLiked]);

  const handleRetweet = useCallback(() => {
    if (tweet.isRetweet) {
      mutateRetweet({ tweet, type: 'undoretweet' });
    } else {
      mutateRetweet({ tweet, type: 'retweet' });
    }

    if (onRefresh) onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tweet.isRetweet]);

  const handleBookmark = useCallback(() => {
    if (onRefresh) onRefresh();
    return !tweet.isBookmark
      ? store.dispatch(createBookmark(tweet._id))
      : store.dispatch(removeBookmark(tweet._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tweet.isBookmark]);

  const toggleReplyDialog = useCallback(() => {
    console.log('triggered', openReplyDialog);
    setOpenReplyDialog(!openReplyDialog);
  }, [openReplyDialog, setOpenReplyDialog]);

  const [action, setAction] = useState({
    like: {
      onClick: handleLike
    },
    retweet: {
      onClick: handleRetweet
    },
    bookmark: {
      onClick: handleBookmark
    },
    reply: {
      onClick: toggleReplyDialog
    }
  });

  return (
    <TweetContext.Provider
      value={{ action, openReplyDialog, tweet, toggleReplyDialog }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export default TweetContextProvider;
