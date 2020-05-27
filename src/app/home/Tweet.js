import React from 'react';
// Mui Components
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
// Mui Theme
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
// Components
import TweetSingleImageContainer from './TweetSingleImageContainer';
import GenericPopover from '../../common/ui/GenericPopover';
import MoreButton from './MoreButton';
import ReplyDialog from './ReplyDialog';
import TweetAction from './TweetAction';
import TweetImagesContainer from './TweetImagesContainer';
import TweetSubheader from './TweetSubheader';
import TweetText from './TweetText';
import TweetTitle from './TweetTitle';
import WithLinkTransformation from './WithLinkTransformation';

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
  avatar: {
    backgroundColor: red[500]
  },
  actions: {
    justifyContent: 'space-around'
  }
}));

const TweetTextContainer = WithLinkTransformation(TweetText);

export default function Tweet({
  navigateToTweet,
  minimized,
  isRetweet,
  currentUser,
  userImageUrl,
  handle,
  fullName,
  fullText,
  createdAt,
  handleNavigateToUser,
  handleMore,
  largeText,
  tweet,
  replies,
  toggleReplyDialog,
  retweetCount,
  handleRetweet,
  likeCount,
  isLiked,
  handleLike,
  isBookmark,
  tweetImages,
  handleBookmark,
  popoverProps,
  openReplyDialog
}) {
  const classes = useStyles();

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
          {!tweetImages.length ? null : tweetImages.length === 1 ? (
            <TweetSingleImageContainer tweetImages={tweetImages} />
          ) : (
            <TweetImagesContainer images={tweetImages} />
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
