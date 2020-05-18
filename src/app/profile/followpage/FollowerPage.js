import React, { useState, useEffect } from 'react';
import { useParams, useLocation, navigate } from '@reach/router';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../../redux/actions/user.actions';
// Mui components
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
// Components
import FollowersList from './FollowersList';
import PageTitle from '../../../common/ui/PageTitle';
import ProfileTabPanel from '../ProfileTabPanel';
import useA11yTabProps from '../../../common/hooks/useA11yTabProps';

export const FollowerPage = React.memo(function FollowerPage() {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const a11yProps = useA11yTabProps('follow');
  const tabs = ['followers', 'following'];
  const fIndex = location.pathname.indexOf('follow');
  const pagename = location.pathname.substring(fIndex);
  const [tabValue, setTabValue] = useState(tabs.indexOf(pagename));
  const { current, watching } = useSelector(state => state.user);
  const isNotCurrentUser =
    params.userId !== 'profile' && params.userId !== current.handle;

  useEffect(() => {
    if (isNotCurrentUser) {
      dispatch(getUser(params.userId));
    }
    setTabValue(tabs.indexOf(pagename));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isNotCurrentUser, location.pathname, params.userId]);

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      navigate('followers', { replace: true });
    } else {
      navigate('following', { replace: true });
    }
    setTabValue(newValue);
  };

  return (
    <>
      <PageTitle
        backButton
        renderTitle={
          <>
            {isNotCurrentUser ? watching.fullName : current.fullName}
            <Typography
              variant="caption"
              color="textSecondary"
              component="span"
            >
              ・@{isNotCurrentUser ? watching.handle : current.handle}
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
            <FollowersList type="followers_watching" />
          ) : (
            <FollowersList type="followers" />
          )}
        </ProfileTabPanel>
        <ProfileTabPanel value={tabValue} index={1}>
          {isNotCurrentUser ? (
            <FollowersList type="following_watching" />
          ) : (
            <FollowersList type="following" />
          )}
        </ProfileTabPanel>
      </Paper>
    </>
  );
});

export default FollowerPage;
