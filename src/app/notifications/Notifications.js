import React, { useEffect } from 'react';
import { navigate } from '@reach/router';
// Mui Components
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
// Components
import PageTitle from '../../common/ui/PageTitle';
import RightBar from '../../common/ui/RightBar';
import SuggestedFollowListContainer from '../discover/SuggestedFollowListContainer';
import TrendsList from '../discover/TrendsList';
import NotificationListItem from './NotificationListItem';
import useFetchNotifications from '../../common/hooks/react-query/useFetchNotifications';
import useMutateMarkAllRead from '../../common/hooks/react-query/useMutateMarkAllRead';

export const Notifications = () => {
  const { status, data } = useFetchNotifications();
  const markAllRead = useMutateMarkAllRead();

  useEffect(() => {
    markAllRead();
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
          {status === 'loading' ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : (
            <List disablePadding>
              {data.map(notification => (
                <NotificationListItem
                  key={notification._id}
                  notification={notification}
                  navigateToPage={navigateToPage}
                />
              ))}
            </List>
          )}
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
