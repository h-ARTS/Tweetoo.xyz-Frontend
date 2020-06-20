import React from 'react';
// MUI Components
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
// Components & Hooks
import UserListItem from '../UserListItem';

export default function FollowersList({ type, currentUser }) {
  return !currentUser.followers || !currentUser.following ? (
    <Box display="flex" alignItems="center" justifyContent="center" p={2}>
      <Typography>
        You don't have anyone in your list. Start discovering!
      </Typography>
    </Box>
  ) : (
    <List>
      {type.includes('followers')
        ? currentUser.followers.map(f => <UserListItem user={f} key={f._id} />)
        : currentUser.following.map(f => <UserListItem user={f} key={f._id} />)}
    </List>
  );
}
