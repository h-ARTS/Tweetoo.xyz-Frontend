import React from 'react';
import { useNavigate } from '@reach/router';
// Mui Components
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
// Mui Theme
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
// Components
import CardHeaderRetweeted from './CardHeaderRetweeted';
import MoreButton from './MoreButton';
import TweetAction from './TweetAction';
import TweetTitle from './TweetTitle';
import TweetText from './TweetText';
import WithLinkTransformation from './WithLinkTransformation';

const useStyles = makeStyles(theme => ({
  ...theme.tweetooxyz,
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

export default function Tweet(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    handle,
    fullName,
    fullText,
    timestamp,
    image,
    tweetId,
    retweet
  } = props.tweet;

  const handleNavigateToUser = () => {
    navigate(`/${handle}`);
  };

  const navigateToTweet = event => {
    event.stopPropagation();
    navigate(`/${handle}/tweet/${tweetId}`);
  };

  const handleStopPropagation = event => {
    event.stopPropagation();
  };

  return (
    <Card className={classes.root} component="div" square varaint="outlined">
      <CardActionArea
        component="article"
        role="article"
        data-focusable="true"
        tabIndex="0"
        onClick={navigateToTweet}
        className={classes.cardActionArea}
        disableRipple
      >
        {retweet && <CardHeaderRetweeted handle={handle} />}
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar aria-label="profile" className={classes.avatar}>
              P
            </Avatar>
          }
          title={
            <TweetTitle
              handle={handle}
              fullName={fullName}
              time={timestamp}
              handleStopPropagation={handleStopPropagation}
              onClick={handleNavigateToUser}
            />
          }
          action={<MoreButton />}
        />
        <TweetTextContainer
          className={classes.cardContent}
          fullText={fullText}
        />
        {image && (
          <CardMedia title="Random" image={image} className={classes.media} />
        )}
      </CardActionArea>
      <CardActions className={classes.actions}>
        <TweetAction actionType="reply" />
        <TweetAction actionType="retweet" />
        <TweetAction actionType="like" />
        <TweetAction actionType="bookmark" />
      </CardActions>
    </Card>
  );
}
