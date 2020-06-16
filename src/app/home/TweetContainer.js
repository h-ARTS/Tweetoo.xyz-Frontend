import React, { useState, useEffect, useCallback } from 'react';
import { navigate } from '@reach/router';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteReply } from '../../redux/actions/reply.action';
// Mui Styles
import { useTheme } from '@material-ui/core/styles';
// Mui Icons
import DeleteIcon from '@material-ui/icons/DeleteForeverTwoTone';
import PersonAddIcon from '@material-ui/icons/PersonAddTwoTone';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabledTwoTone';
// Hooks
import useFollow from '../../common/hooks/useFollow';
import useFetchDoc from '../../common/hooks/react-query/useFetchDoc';
import useDeleteTweet from '../../common/hooks/react-query/useDeleteTweet';
// Components
import Tweet from './Tweet';
import SkeletonTweet from '../../common/ui/skeletons/SkeletonTweet';
import TweetContextProvider from '../../common/context/TweetContextProvider';

export const TweetContainer = React.memo(function TweetContainer({
  tweet,
  minimized = false,
  largeText = false,
  onRefresh = null
}) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [listItems, setListItem] = useState([]);
  const [openReplyDialog, setOpenReplyDialog] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.current);
  const { _id, handle, createdBy } = tweet;
  const { status, data, refetch } = useFetchDoc(tweet);
  const deleteTweet = useDeleteTweet();
  const { isFollowing, handleFollowUser } = useFollow(handle);

  useEffect(() => {
    if (currentUser._id === createdBy) {
      if (!tweet.hasOwnProperty('tweetId')) {
        setListItem([
          {
            title: 'Delete Tweet',
            divider: false,
            callback: handleDeleteTweet,
            icon: DeleteIcon,
            iconColor: theme.palette.error.main,
            textColor: 'error'
          }
        ]);
      } else {
        setListItem([
          {
            title: 'Delete Reply',
            divider: false,
            callback: handleDeleteReply,
            icon: DeleteIcon,
            iconColor: theme.palette.error.main,
            textColor: 'error'
          }
        ]);
      }
    }

    setOpenReplyDialog(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentUser._id !== createdBy) {
      setListItem([
        {
          title: isFollowing() ? `Unfollow @${handle}` : `Follow @${handle}`,
          divider: true,
          callback: handleFollow,
          icon: isFollowing() ? PersonAddDisabledIcon : PersonAddIcon
        }
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFollowing]);

  const handleNavigateToUser = useCallback(() => {
    navigate(`/${handle}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateToTweet = useCallback(event => {
    event.stopPropagation();
    navigate(`/${handle}/tweet/${_id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMore = useCallback(event => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = event => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  // Tweet action methods

  const handleDeleteTweet = () => {
    deleteTweet({ tweetId: _id });
    onRefresh();
  };

  const handleFollow = () => {
    handleFollowUser();
    setAnchorEl(null);
  };

  const handleDeleteReply = () => {
    dispatch(deleteReply(_id));
  };

  const popoverProps = {
    id: 'more-popover',
    open: Boolean(anchorEl),
    anchorEl,
    items: listItems,
    onClose: handleClose
  };

  return status === 'loading' ? (
    <SkeletonTweet />
  ) : (
    <TweetContextProvider
      tweet={data}
      onRefresh={onRefresh ? onRefresh : refetch}
      openReplyDialog={openReplyDialog}
      setOpenReplyDialog={setOpenReplyDialog}
    >
      <Tweet
        popoverProps={popoverProps}
        isBookmark={data.isBookmark}
        isLiked={data.isLiked}
        isRetweet={data.isRetweet}
        minimized={minimized}
        largeText={largeText}
        navigateToTweet={navigateToTweet}
        handleNavigateToUser={handleNavigateToUser}
        currentUser={currentUser}
        userImageUrl={data.userImageUrl}
        handle={handle}
        fullName={data.fullName}
        fullText={data.fullText}
        replies={data.replies}
        tweet={data}
        createdAt={data.createdAt}
        tweetImages={data.tweetImages}
        handleMore={handleMore}
        likeCount={data.likeCount}
        retweetCount={data.retweetCount}
      />
    </TweetContextProvider>
  );
});

export default TweetContainer;
