import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardActions,
  Badge
} from '@material-ui/core';
// MUI Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReplyIcon from '@material-ui/icons/ChatBubbleTwoTone';
import RetweetIcon from '@material-ui/icons/CachedTwoTone';
import LikeIcon from '@material-ui/icons/FavoriteTwoTone';
import BookmarkIcon from '@material-ui/icons/BookmarkTwoTone';
// MUI Theme
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  withStyles
} from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import { Link } from '@reach/router';

const useStyles = makeStyles(theme => ({
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
  likeIcon: {
    color: red[500]
  },
  actions: {
    justifyContent: 'space-around'
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'baseline',
    flexShrink: 1
  },
  user: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  handle: {
    color: theme.palette.primary.dark,
    marginLeft: '5px'
  },
  dotDivider: {
    color: theme.palette.primary.dark,
    padding: '0 5px'
  },
  tweetTime: {
    color: theme.palette.primary.dark
  }
}));

const tweetTheme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red
  }
});

const StyledBadge = withStyles({
  badge: {
    color: 'white',
    bottom: '-2px'
  }
})(Badge);

export default function Timeline() {
  const classes = useStyles();

  return (
    <div className={classes.timeline}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="profile" className={classes.avatar}>
              P
            </Avatar>
          }
          title={
            <div className={classes.titleContainer}>
              <Link to={`/${'mr_paki'}`} className={classes.user}>
                Mr Paki
              </Link>
              <Typography variant="body2" className={classes.handle}>
                @mr_paki
              </Typography>
              <div className={classes.dotDivider}>
                <span>·</span>
              </div>
              <div className={classes.tweetTime}>
                <time dateTime="2020-02-24T20:18:29.000Z">12 Min.</time>
              </div>
            </div>
          }
          action={
            <IconButton aria-label="more">
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent className={classes.cardContent}>
          <Typography type="body2">
            This impressive paella is a perfect party dish and a fun meal
            #partydish
          </Typography>
        </CardContent>
        <CardMedia
          title="Random"
          image="https://source.unsplash.com/random/450x250"
          className={classes.media}
        />
        <CardActions className={classes.actions}>
          <IconButton aria-label="reply" color="secondary">
            <StyledBadge
              badgeContent={12}
              max={100000}
              color="secondary"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <ReplyIcon />
            </StyledBadge>
          </IconButton>
          <ThemeProvider theme={tweetTheme}>
            <IconButton aria-label="retweet" color="primary">
              <StyledBadge
                badgeContent={1023}
                max={100000}
                color="primary"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <RetweetIcon />
              </StyledBadge>
            </IconButton>
          </ThemeProvider>
          <ThemeProvider theme={tweetTheme}>
            <IconButton aria-label="like" color="secondary">
              <StyledBadge
                badgeContent={329}
                max={100000}
                color="secondary"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <LikeIcon />
              </StyledBadge>
            </IconButton>
          </ThemeProvider>
          <IconButton aria-label="bookmark" color="secondary">
            <BookmarkIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="profile" className={classes.avatar}>
              P
            </Avatar>
          }
          title="Hanan Khan Mufti"
          action={
            <IconButton aria-label="more">
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent className={classes.cardContent}>
          <Typography type="body2">
            This impressive paella is a perfect party dish and a fun meal
            #partydish
          </Typography>
        </CardContent>
        <CardMedia
          title="Random"
          image="https://source.unsplash.com/random/450x250"
          className={classes.media}
        />
        <CardActions className={classes.cardActions}>
          <IconButton aria-label="reply" color="secondary">
            <ReplyIcon />
          </IconButton>
          <ThemeProvider theme={tweetTheme}>
            <IconButton aria-label="retweet" color="primary">
              <RetweetIcon />
            </IconButton>
          </ThemeProvider>
          <ThemeProvider theme={tweetTheme}>
            <IconButton aria-label="like" color="secondary">
              <LikeIcon />
            </IconButton>
          </ThemeProvider>
          <IconButton aria-label="bookmark" color="secondary">
            <BookmarkIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
