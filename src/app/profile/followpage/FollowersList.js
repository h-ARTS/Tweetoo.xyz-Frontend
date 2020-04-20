import React, { useEffect } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../../redux/actions/user.actions';
// MUI Components
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import UserListItem from '../UserListItem';

export default function FollowersList({ type }) {
  const loadingUsers = useSelector(state => state.ui.loadingUsers);
  const users = useSelector(state => {
    const getStateUsers = {
      followers: state.user.current.followers,
      following: state.user.current.following,
      followers_watching: state.user.watching.followers,
      following_watching: state.user.watching.following
    };

    return getStateUsers[type];
  });
  const { followers, following } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length > 0) {
      dispatch(getUsers(users, { type }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return users.length === 0 ? (
    <Box display="flex" alignItems="center" justifyContent="center" py={2}>
      <Typography variant="h6">No followers yet.. Start exploring!</Typography>
    </Box>
  ) : loadingUsers ? (
    <Box display="flex" alignItems="center" justifyContent="center" py={2}>
      <CircularProgress color="secondary" />
    </Box>
  ) : (
    <List>
      {type.includes('followers')
        ? followers.map(user => <UserListItem user={user} key={user._id} />)
        : following.map(user => <UserListItem user={user} key={user._id} />)}
    </List>
  );
}
