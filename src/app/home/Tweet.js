import React, { useState, useEffect } from 'react';
import { useNavigate } from '@reach/router';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTweet,
  handleLikeTweet,
  postRetweet
} from '../../redux/actions/tweet.actions';
// Mui Components
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
// Mui Theme
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
// Mui Icons
import BlockIcon from '@material-ui/icons/BlockTwoTone';
import DeleteIcon from '@material-ui/icons/DeleteForeverTwoTone';
import PersonAddIcon from '@material-ui/icons/PersonAddTwoTone';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabledTwoTone';
// Components
import TweetSubheader from './TweetSubheader';
import MoreButton from './MoreButton';
import TweetAction from './TweetAction';
import TweetTitle from './TweetTitle';
import TweetText from './TweetText';
import WithLinkTransformation from './WithLinkTransformation';
import GenericPopover from '../../common/ui/GenericPopover';
import { useFollow } from '../../common/hooks/useFollow';
import ReplyDialog from './ReplyDialog';
import { deleteReply } from '../../redux/actions/reply.action';
import {
  createBookmark,
  removeBookmark
} from '../../redux/actions/bookmarks.action';

const useStyles = makeStyles(theme => ({
  timeline: {},
  root: {
    '&:not(:last-child)': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    }
  },
  cardActionArea: {
    userSelect: 'auto'
  },
  cardHeader: {
    padding: '16px 16px 0'
  },
  cardContent: {
    paddingTop: 0
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    margin: '0 16px',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: 10
  },
  avatar: {
    backgroundColor: red[500]
  },
  actions: {
    justifyContent: 'space-around'
  }
}));

const TweetTextContainer = WithLinkTransformation(TweetText);

export default function Tweet({
  tweet,
  minimized = false,
  largeText = false,
  onRefresh
}) {
  const classes = useStyles();
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
    <>
      <Card
        className={classes.root}
        component="div"
        square
        varaint="outlined"
        elevation={0}
      >
        <CardActionArea
          component="article"
          role="article"
          data-focusable="true"
          tabIndex="0"
          onClick={navigateToTweet}
          className={classes.cardActionArea}
          disableRipple
          disabled={minimized}
        >
          {isRetweet && <TweetSubheader handle={currentUser.handle} />}
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar
                aria-label="profile"
                src={`http://localhost:6500/${userImageUrl}`}
                className={classes.avatar}
              />
            }
            title={
              <TweetTitle
                handle={handle}
                fullName={fullName}
                time={createdAt}
                handleStopPropagation={handleStopPropagation}
                onClick={handleNavigateToUser}
              />
            }
            action={!minimized && <MoreButton onClick={handleMore} />}
          />
          <TweetTextContainer
            className={classes.cardContent}
            fullText={fullText}
            largeText={largeText}
          />
          {image && (
            <CardMedia title="Random" image={image} className={classes.media} />
          )}
        </CardActionArea>
        {!minimized && (
          <CardActions className={classes.actions}>
            {tweet.hasOwnProperty('replies') && (
              <TweetAction
                actionType="reply"
                count={replies.length}
                onClick={toggleReplyDialog}
              />
            )}
            <TweetAction
              actionType="retweet"
              count={retweetCount}
              isActive={isRetweet}
              onClick={handleRetweet}
            />
            <TweetAction
              actionType="like"
              count={likeCount}
              isActive={isLiked}
              onClick={handleLike}
            />
            <TweetAction
              actionType="bookmark"
              isActive={isBookmark}
              onClick={handleBookmark}
            />
          </CardActions>
        )}
      </Card>
      <GenericPopover {...popoverProps} />
      <ReplyDialog
        tweet={tweet}
        openReplyDialog={openReplyDialog}
        handleCloseEdit={toggleReplyDialog}
      />
    </>
  );
}
