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
  Badge,
  CardActionArea
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
import { red, green, blue, grey } from '@material-ui/core/colors';
import { Link } from '@reach/router';
import ToggleButton from '../../common/ui/ToggleButton';

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
  },
  user: {
    display: 'flex',
    alignItems: 'baseline',
    flexShrink: 1,
    fontSize: '1rem',
    textDecoration: 'none',
    '& .MuiTypography-body1': {
      color: theme.palette.primary.contrastText,
      fontWeight: 600,
      '&:hover': {
        textDecoration: 'underline'
      }
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

const StyledBadge = withStyles({
  badge: {
    color: 'inherit',
    backgroundColor: 'transparent',
    right: '-20px',
    bottom: '12px'
  }
})(Badge);

const BookmarkButton = withStyles(theme => ({
  root: {
    color: theme.palette.primary.dark,
    '&:hover': {
      color: blue[700]
    }
  }
}))(IconButton);

const like = createMuiTheme({
  palette: {
    primary: { main: grey[500] },
    secondary: { main: red[400] }
  }
});

const retweet = createMuiTheme({
  palette: {
    primary: { main: grey[500] },
    secondary: { main: green[400] }
  }
});

export default function Timeline() {
  const classes = useStyles();

  return (
    <div className={classes.timeline}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar aria-label="profile" className={classes.avatar}>
                P
              </Avatar>
            }
            title={
              <div className={classes.titleContainer}>
                <Link to={`/${'mr_paki'}`} className={classes.user}>
                  <Typography variant="body1">Mr Paki</Typography>
                  <Typography variant="body2" className={classes.handle}>
                    @mr_paki
                  </Typography>
                  <div className={classes.dotDivider}>
                    <span>·</span>
                  </div>
                  <div className={classes.tweetTime}>
                    <time dateTime="2020-02-24T20:18:29.000Z">12 Min.</time>
                  </div>
                </Link>
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
        </CardActionArea>
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
          <ToggleButton>
            {({ active, onClick }) => (
              <ThemeProvider theme={retweet}>
                <IconButton
                  aria-label="retweet"
                  color={active ? 'secondary' : 'primary'}
                  onClick={onClick}
                >
                  <StyledBadge
                    badgeContent={1023}
                    max={100000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  >
                    <RetweetIcon />
                  </StyledBadge>
                </IconButton>
              </ThemeProvider>
            )}
          </ToggleButton>
          <ToggleButton>
            {({ active, onClick }) => (
              <ThemeProvider theme={like}>
                <IconButton
                  color={active ? 'secondary' : 'primary'}
                  aria-label="like"
                  onClick={onClick}
                >
                  <StyledBadge
                    badgeContent={329}
                    max={100000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  >
                    <LikeIcon />
                  </StyledBadge>
                </IconButton>
              </ThemeProvider>
            )}
          </ToggleButton>
          <BookmarkButton color="primary" aria-label="bookmark">
            <BookmarkIcon />
          </BookmarkButton>
        </CardActions>
      </Card>
    </div>
  );
}
