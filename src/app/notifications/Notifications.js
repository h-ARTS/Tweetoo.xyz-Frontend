import React from 'react';
import { useSelector } from 'react-redux';
// Mui Components
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
// Mui Icons
import LikeIcon from '@material-ui/icons/FavoriteTwoTone';
import PersonAddIcon from '@material-ui/icons/PersonAddTwoTone';
import ReplyIcon from '@material-ui/icons/ReplyTwoTone';
// Components
import PageTitle from '../../common/ui/PageTitle';
import RightBar from '../../common/ui/RightBar';
import SuggestedFollowListContainer from '../trending/SuggestedFollowListContainer';
import TrendsList from '../trending/TrendsList';
import { red, green, lightBlue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  like: {
    color: theme.palette.getContrastText(red['A400']),
    backgroundColor: red['A400']
  },
  reply: {
    color: theme.palette.getContrastText(green['A400']),
    backgroundColor: green['A400']
  },
  follow: {
    color: theme.palette.getContrastText(lightBlue['A400']),
    backgroundColor: lightBlue['A400']
  }
}));
export const Notifications = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const notifications = useSelector(state => state.notifications);

  const generatePrimaryText = user => {
    const text = {
      follow: `${user.sender} is following you`,
      like: `${user.sender} liked your tweet.`,
      reply: `${user.sender} replied on your tweet.`
    };

    return text[user.type];
  };

  const generateIcon = user => {
    const icons = {
      follow: (
        <Avatar className={classes.follow}>
          <PersonAddIcon />
        </Avatar>
      ),
      like: (
        <Avatar className={classes.like}>
          <LikeIcon />
        </Avatar>
      ),
      reply: (
        <Avatar className={classes.reply}>
          <ReplyIcon />
        </Avatar>
      )
    };

    return icons[user.type];
  };

  return (
    <>
      <Grid item xs={12} md={8}>
        <PageTitle renderTitle="Notifications" />
        <Paper variant="outlined" square>
          <List disablePadding>
            {notifications.map(n => (
              <ListItem key={n._id} button divider>
                <ListItemAvatar>
                  <Box>{generateIcon(n)}</Box>
                </ListItemAvatar>
                <ListItemText primary={generatePrimaryText(n)} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Hidden smDown>
        <RightBar>
          <Box my={1}>
            <TrendsList />
          </Box>
          <SuggestedFollowListContainer />
        </RightBar>
      </Hidden>
    </>
  );
});

export default Notifications;
