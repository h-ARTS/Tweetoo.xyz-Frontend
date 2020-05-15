import React, { useState, useEffect } from 'react';
import { useNavigate } from '@reach/router';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTweet,
  handleLikeTweet,
  postRetweet
} from '../../redux/actions/tweet.actions';
import { deleteReply } from '../../redux/actions/reply.action';
import {
  createBookmark,
  removeBookmark
} from '../../redux/actions/bookmarks.action';
// Mui Styles
import { useTheme } from '@material-ui/core/styles';
// Mui Icons
import BlockIcon from '@material-ui/icons/BlockTwoTone';
import DeleteIcon from '@material-ui/icons/DeleteForeverTwoTone';
import PersonAddIcon from '@material-ui/icons/PersonAddTwoTone';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabledTwoTone';
// Hooks
import useFollow from '../../common/hooks/useFollow';
import Tweet from './Tweet';

export default function TweetContainer({
  tweet,
  minimized = false,
  largeText = false,
  onRefresh
}) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [listItems, setListItem] = useState([]);
  const [openReplyDialog, setOpenReplyDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.current);
  const {
    _id,
    handle,
    fullName,
    fullText,
    image,
    replies,
    isRetweet,
    retweetCount,
    likeCount,
    isLiked,
    isBookmark,
    createdAt,
    createdBy,
    userImageUrl
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
        },
        {
          title: `Block @${handle}`,
          divider: true,
          icon: BlockIcon,
          iconColor: theme.palette.error.main,
          textColor: 'error'
        }
      ]);
    }

    setOpenReplyDialog(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFollowing, replies]);

  const handleNavigateToUser = () => {
    navigate(`/${handle}`);
  };

  const navigateToTweet = event => {
    event.stopPropagation();
    navigate(`/${handle}/tweet/${_id}`);
  };

  const handleStopPropagation = event => {
    event.stopPropagation();
  };

  const handleMore = event => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  // Tweet action methods

  const handleLike = () => {
    if (isLiked) {
      dispatch(handleLikeTweet(_id, 'unlike'));
    } else {
      dispatch(handleLikeTweet(_id, 'like'));
    }
    if (onRefresh) onRefresh();
  };

  const handleDeleteTweet = () => {
    dispatch(deleteTweet(_id));
  };

  const handleRetweet = () => {
    dispatch(postRetweet(_id, !isRetweet));
    if (onRefresh) onRefresh();
  };

  const handleFollow = () => {
    handleFollowUser();
    setAnchorEl(null);
  };

  const toggleReplyDialog = () => {
    setOpenReplyDialog(!openReplyDialog);
  };

  const handleDeleteReply = () => {
    dispatch(deleteReply(_id));
  };

  const handleBookmark = () => {
    if (onRefresh) onRefresh();
    return !isBookmark
      ? dispatch(createBookmark(_id))
      : dispatch(removeBookmark(_id));
  };

  const popoverProps = {
    id: Boolean(anchorEl) ? 'more-popover' : undefined,
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
      image={image}
      replies={replies}
      tweet={tweet}
      createdAt={createdAt}
      handleStopPropagation={handleStopPropagation}
      handleMore={handleMore}
      handleLike={handleLike}
      handleRetweet={handleRetweet}
      openReplyDialog={openReplyDialog}
      likeCount={likeCount}
      retweetCount={retweetCount}
      toggleReplyDialog={toggleReplyDialog}
    />
  );
}
