import React, { useState, useEffect } from 'react';
import { useParams, navigate } from '@reach/router';
// Mui components
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
// Components
import FollowersList from './FollowersList';
import PageTitle from '../../../common/ui/PageTitle';
import ProfileTabPanel from '../ProfileTabPanel';
// Hooks
import useA11yTabProps from '../../../common/hooks/useA11yTabProps';
import useFetchUser from '../../../common/hooks/react-query/useFetchUser';

export const FollowerPage = React.memo(function FollowerPage({ path }) {
  const params = useParams();
  const a11yProps = useA11yTabProps('follow');
  const tabs = { followers: 0, following: 1 };
  const [tabValue, setTabValue] = useState(tabs[path]);
  const isNotCurrentUser = params.userId !== 'profile';
  const { status, data, refetch } = useFetchUser(
    isNotCurrentUser ? params.userId : '',
    'FollowerPage'
  );

  useEffect(() => {
    // refetch();

    setTabValue(tabs[path]);
  }, [path, refetch, tabs]);

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      navigate('followers', { replace: true });
    } else {
      navigate('following', { replace: true });
    }
    setTabValue(newValue);
  };

  return status === 'loading' ? (
    <Box>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <PageTitle
        backButton
        renderTitle={
          <>
            {data.fullName}
            <Typography
              variant="caption"
              color="textSecondary"
              component="span"
            >
              ・@{data.handle}
            </Typography>
          </>
        }
      />
      <Paper variant="outlined" square>
        <Tabs
          variant="fullWidth"
          value={tabValue}
          onChange={handleTabChange}
          aria-label="follow tabs"
        >
          <Tab label="Followers" {...a11yProps(0)} />
          <Tab label="I'm following" {...a11yProps(0)} />
        </Tabs>
        <ProfileTabPanel value={tabValue} index={0}>
          {isNotCurrentUser ? (
            <FollowersList currentUser={data} type="followers_watching" />
          ) : (
            <FollowersList currentUser={data} type="followers" />
          )}
        </ProfileTabPanel>
        <ProfileTabPanel value={tabValue} index={1}>
          {isNotCurrentUser ? (
            <FollowersList currentUser={data} type="following_watching" />
          ) : (
            <FollowersList currentUser={data} type="following" />
          )}
        </ProfileTabPanel>
      </Paper>
    </>
  );
});

export default FollowerPage;
