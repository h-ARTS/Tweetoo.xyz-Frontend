import React, { useState, useEffect } from 'react';
import { useParams, useLocation, navigate } from '@reach/router';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions/user.actions';
import { CLEAR_USER } from '../../redux/types';
// Mui components
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
// Components
import PageTitle from '../../common/ui/PageTitle';
import useA11yTabProps from '../../common/hooks/useA11yTabProps';
import ProfileTabPanel from './ProfileTabPanel';
import UserListItem from './UserListItem';

export default function FollowerPage() {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const a11yProps = useA11yTabProps('follow');
  const [tabValue, setTabValue] = useState(0);
  const { current, watching } = useSelector(state => state.user);
  const isNotCurrentUser =
    params.userId !== 'profile' && params.userId !== current.handle;

  useEffect(() => {
    if (isNotCurrentUser) {
      dispatch(getUser(params.userId));
    }

    if (location.pathname.includes('following')) {
      setTabValue(1);
    }

    return () => {
      dispatch({ type: CLEAR_USER });
    };
  }, [dispatch, isNotCurrentUser, location.pathname, params.userId]);

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      navigate('followers', { replace: true });
    } else {
      navigate('following', { replace: true });
    }
    setTabValue(newValue);
  };

  const userPropFactory = prop => {
    return isNotCurrentUser ? watching[prop] : current[prop];
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
          <List>
            {userPropFactory('followers').map(user => (
              <UserListItem handle={user.handle} key={user._id} />
            ))}
          </List>
        </ProfileTabPanel>
        <ProfileTabPanel value={tabValue} index={1}>
          <List>
            {userPropFactory('following').map(user => (
              <UserListItem handle={user.handle} key={user._id} />
            ))}
          </List>
        </ProfileTabPanel>
      </Paper>
    </>
  );
}
