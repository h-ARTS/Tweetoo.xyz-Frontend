import React, { useCallback, createContext } from 'react';
import useMutateLike from '../hooks/react-query/useMutateLike';
import useMutateRetweet from '../hooks/react-query/useMutateRetweet';

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

  function handleAction(type) {
    const lookupAction = {
      like: () => mutateLike({ isLiked: tweet.isLiked, tweet }),
      retweet: () => mutateRetweet({ isRetweet: tweet.isRetweet, tweet })
    };

    lookupAction[type]();
    if (onRefresh) onRefresh();
  }

  const toggleReplyDialog = useCallback(() => {
    setOpenReplyDialog(!openReplyDialog);
  }, [openReplyDialog, setOpenReplyDialog]);

  const action = {
    like: {
      handleAction
    },
    retweet: {
      handleAction
    },
    bookmark: {
      onClick: handleBookmark
    },
    reply: {
      handleAction: toggleReplyDialog
    }
  };

  return (
    <TweetContext.Provider
      value={{ action, openReplyDialog, tweet, toggleReplyDialog }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export default TweetContextProvider;
