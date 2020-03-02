import React, { useState, useEffect } from 'react';
import { IconButton, Badge } from '@material-ui/core';
import {
  ThemeProvider,
  createMuiTheme,
  withStyles
} from '@material-ui/core/styles';
import { grey, red, green, blue } from '@material-ui/core/colors';

// Mui Icons
import ReplyIcon from '@material-ui/icons/ChatBubbleTwoTone';
import RetweetIcon from '@material-ui/icons/CachedTwoTone';
import LikeIcon from '@material-ui/icons/FavoriteTwoTone';
import BookmarkIcon from '@material-ui/icons/BookmarkTwoTone';

const like = createMuiTheme({
  palette: {
    primary: { main: grey[500] },
    secondary: { main: red[500] }
  }
});

const retweet = createMuiTheme({
  palette: {
    primary: { main: grey[500] },
    secondary: { main: green[500] }
  }
});

const defaultTheme = createMuiTheme({
  palette: {
    primary: { main: blue[700] },
    secondary: { main: blue[700] }
  }
});

const StyledBadge = withStyles({
  badge: {
    color: 'inherit',
    backgroundColor: 'transparent',
    right: '-20px',
    bottom: '12px'
  }
})(Badge);

const actionButtons = isActive => ({
  reply: {
    ariaLabel: 'reply',
    colorFactory: 'secondary',
    onClick: () => {},
    Icon: ReplyIcon,
    theme: defaultTheme
  },
  retweet: {
    ariaLabel: 'retweet',
    colorFactory: isActive ? 'secondary' : 'primary',
    onClick: () => {},
    Icon: RetweetIcon,
    theme: retweet
  },
  like: {
    ariaLabel: 'like',
    colorFactory: isActive ? 'secondary' : 'primary',
    onClick: () => {},
    Icon: LikeIcon,
    theme: like
  },
  bookmark: {
    ariaLabel: 'bookmark',
    colorFactory: 'primary',
    onClick: () => {},
    Icon: BookmarkIcon
  }
});

export default function TweetAction({ actionType }) {
  const [active, setActive] = useState(false);
  const [replyCount, setReplyCount] = useState(0);
  const { ariaLabel, colorFactory, onClick, Icon, theme } = actionButtons(
    active
  )[actionType];

  useEffect(() => {
    const getReplies = ['432', '21312', '21312'];
    setReplyCount(getReplies.length);
  }, [replyCount]);

  const setAction = () => {
    setActive(!active);

    onClick();
  };

  if (theme) {
    return (
      <ThemeProvider theme={theme}>
        <IconButton
          aria-label={ariaLabel}
          color={colorFactory}
          onClick={setAction}
        >
          <StyledBadge
            badgeContent={1023}
            max={100000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Icon />
          </StyledBadge>
        </IconButton>
      </ThemeProvider>
    );
  } else {
    return (
      <IconButton
        aria-label={ariaLabel}
        color={colorFactory()}
        onClick={setAction}
      >
        <Icon />
      </IconButton>
    );
  }
}