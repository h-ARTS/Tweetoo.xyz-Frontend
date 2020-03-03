import React from 'react';
import { useNavigate } from '@reach/router';
// Mui Components
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// Mui Theme
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { red, blue } from '@material-ui/core/colors';
// Mui Icons
import BookmarkIcon from '@material-ui/icons/BookmarkTwoTone';
// Components
import MoreButton from './MoreButton';
import TweetAction from './TweetAction';
import TweetTitle from './TweetTitle';

const useStyles = makeStyles(theme => ({
  ...theme.tweetooxyz,
  timeline: {},
  root: {
    boxShadow: 'none',
    borderRadius: 0,
    '&:not(:last-child)': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    }
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

const BookmarkButton = withStyles(theme => ({
  root: {
    color: theme.palette.primary.dark,
    '&:hover': {
      color: blue[700]
    }
  }
}))(IconButton);

export default function Tweet(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { handle, fullName, fullText, timestamp } = props.tweet;

  const handleNavigation = () => {
    navigate(`/${handle}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea component="div" disableRipple>
        <CardHeader
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
              onClick={handleNavigation}
            />
          }
          action={<MoreButton />}
        />
        <CardContent className={classes.cardContent}>
          <Typography type="body2">{fullText}</Typography>
        </CardContent>
        <CardMedia
          title="Random"
          image="https://source.unsplash.com/random/470x240"
          className={classes.media}
        />
      </CardActionArea>
      <CardActions className={classes.actions}>
        <TweetAction actionType="reply" />
        <TweetAction actionType="retweet" />
        <TweetAction actionType="like" />
        <BookmarkButton color="primary" aria-label="bookmark">
          <BookmarkIcon />
        </BookmarkButton>
      </CardActions>
    </Card>
  );
}
