import React, { useContext } from 'react';
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

import ReplyDialog from './ReplyDialog';
import { TweetContext } from '../../common/context/TweetContextProvider';

const like = createMuiTheme({
  palette: {
    primary: { main: grey[600] },
    secondary: { main: red[600] }
  }
});

const retweet = createMuiTheme({
  palette: {
    primary: { main: grey[600] },
    secondary: { main: green[600] }
  }
});

const defaultTheme = createMuiTheme({
  palette: {
    primary: { main: grey[600] },
    secondary: { main: blue[600] }
  }
});

const actionButtons = isActive => ({
  reply: {
    ariaLabel: 'reply',
    colorFactory: 'primary',
    Icon: ReplyIcon,
    theme: defaultTheme
  },
  retweet: {
    ariaLabel: 'retweet',
    colorFactory: isActive ? 'secondary' : 'primary',
    Icon: RetweetIcon,
    theme: retweet
  },
  like: {
    ariaLabel: 'like',
    colorFactory: isActive ? 'secondary' : 'primary',
    Icon: LikeIcon,
    theme: like
  },
  bookmark: {
    ariaLabel: 'bookmark',
    colorFactory: isActive ? 'secondary' : 'primary',
    Icon: BookmarkIcon,
    theme: defaultTheme
  }
});

const StyledBadge = withStyles({
  badge: {
    zIndex: 0,
    color: 'inherit',
    backgroundColor: 'transparent',
    right: '-20px',
    bottom: '12px'
  }
})(Badge);

export const TweetAction = React.memo(function TweetAction({
  actionType,
  count,
  isActive
}) {
  const { ariaLabel, colorFactory, Icon, theme } = actionButtons(isActive)[
    actionType
  ];
  const { action, tweet, openReplyDialog, toggleReplyDialog } = useContext(
    TweetContext
  );

  const handleAction = () => {
    action[actionType].onClick();
  };

  if (actionType !== 'bookmark') {
    return (
      <>
        <ThemeProvider theme={theme}>
          <IconButton
            aria-label={ariaLabel}
            color={colorFactory}
            onClick={handleAction}
          >
            <StyledBadge
              badgeContent={count}
              max={100000}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Icon />
            </StyledBadge>
          </IconButton>
        </ThemeProvider>
        {actionType === 'reply' && (
          <ReplyDialog
            tweet={tweet}
            openReplyDialog={openReplyDialog}
            handleCloseEdit={toggleReplyDialog}
          />
        )}
      </>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <IconButton
          aria-label={ariaLabel}
          color={colorFactory}
          onClick={handleAction}
        >
          <Icon />
        </IconButton>
      </ThemeProvider>
    );
  }
});

export default TweetAction;
