import React, { useState, useEffect, useCallback } from 'react';
import { navigate } from '@reach/router';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteTweet, postRetweet } from '../../redux/actions/tweet.actions';
import { deleteReply } from '../../redux/actions/reply.action';
import {
  createBookmark,
  removeBookmark
} from '../../redux/actions/bookmarks.action';
// Mui Styles
import { useTheme } from '@material-ui/core/styles';
// Mui Icons
import DeleteIcon from '@material-ui/icons/DeleteForeverTwoTone';
import PersonAddIcon from '@material-ui/icons/PersonAddTwoTone';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabledTwoTone';
// Hooks
import useFollow from '../../common/hooks/useFollow';
import useMutateLike from '../../common/hooks/react-query/useMutateLike';
import Tweet from './Tweet';

export const TweetContainer = React.memo(function TweetContainer({
  tweet,
  minimized = false,
  largeText = false,
  onRefresh
}) {
  const mutateLike = useMutateLike();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [listItems, setListItem] = useState([]);
  const [openReplyDialog, setOpenReplyDialog] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.current);
  const {
    _id,
    handle,
    fullName,
    fullText,
    replies,
    isRetweet,
    retweetCount,
    likeCount,
    isLiked,
    isBookmark,
    createdAt,
    createdBy,
    userImageUrl,
    tweetImages
  } = tweet;
  const { isFollowing, handleFollowUser } = useFollow(handle);

  useEffect(() => {
    if (currentUser._id === createdBy) {
      if (tweet.hasOwnProperty('replies')) {
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
    } else {
      setListItem([
        {
          title: isFollowing() ? `Unfollow @${handle}` : `Follow @${handle}`,
          divider: true,
          callback: handleFollow,
          icon: isFollowing() ? PersonAddDisabledIcon : PersonAddIcon
        }
      ]);
    }

    setOpenReplyDialog(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFollowing, replies]);

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

  const handleLike = useCallback(() => {
    if (isLiked) {
      mutateLike({ tweet, type: 'unlike' });
    } else {
      mutateLike({ tweet, type: 'like' });
    }
    if (onRefresh) onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLiked]);

  const handleDeleteTweet = () => {
    dispatch(deleteTweet(_id));
  };

  const handleRetweet = useCallback(() => {
    dispatch(postRetweet(_id, !isRetweet));
    if (onRefresh) onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRetweet]);

  const handleFollow = () => {
    handleFollowUser();
    setAnchorEl(null);
  };

  const toggleReplyDialog = useCallback(() => {
    setOpenReplyDialog(!openReplyDialog);
  }, [openReplyDialog]);

  const handleDeleteReply = () => {
    dispatch(deleteReply(_id));
  };

  const handleBookmark = useCallback(() => {
    if (onRefresh) onRefresh();
    return !isBookmark
      ? dispatch(createBookmark(_id))
      : dispatch(removeBookmark(_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBookmark]);

  const popoverProps = {
    id: 'more-popover',
    open: Boolean(anchorEl),
    anchorEl,
    items: listItems,
    onClose: handleClose
  };

  return (
    <Tweet
      popoverProps={popoverProps}
      handleBookmark={handleBookmark}
      isBookmark={isBookmark}
      isLiked={isLiked}
      isRetweet={isRetweet}
      minimized={minimized}
      largeText={largeText}
      navigateToTweet={navigateToTweet}
      handleNavigateToUser={handleNavigateToUser}
      currentUser={currentUser}
      userImageUrl={userImageUrl}
      handle={handle}
      fullName={fullName}
      fullText={fullText}
      replies={replies}
      tweet={tweet}
      createdAt={createdAt}
      tweetImages={tweetImages}
      handleMore={handleMore}
      handleLike={handleLike}
      handleRetweet={handleRetweet}
      openReplyDialog={openReplyDialog}
      likeCount={likeCount}
      retweetCount={retweetCount}
      toggleReplyDialog={toggleReplyDialog}
    />
  );
});

export default TweetContainer;
