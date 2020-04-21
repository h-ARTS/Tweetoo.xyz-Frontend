import React, { useEffect } from 'react';
import { navigate } from '@reach/router';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { markAllRead } from '../../redux/actions/notifications.actions';
// Mui Components
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
// Components
import PageTitle from '../../common/ui/PageTitle';
import RightBar from '../../common/ui/RightBar';
import SuggestedFollowListContainer from '../trending/SuggestedFollowListContainer';
import TrendsList from '../trending/TrendsList';
import NotificationListItem from './NotificationListItem';

export const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications);

  useEffect(() => {
    dispatch(markAllRead());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateToPage = (event, notification) => {
    event.stopPropagation();
    const { sender, tweetId, type } = notification;
    if (type === 'follow') {
      navigate(`/${sender}`);
    } else {
      navigate(`/${sender}/tweet/${tweetId}`);
    }
  };

  return (
    <>
      <Grid item xs={12} md={8}>
        <PageTitle renderTitle="Notifications" />
        <Paper variant="outlined" square>
          <List disablePadding>
            {notifications.map(n => (
              <NotificationListItem
                notification={n}
                navigateToPage={navigateToPage}
              />
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
};

export default Notifications;
