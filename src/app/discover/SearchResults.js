import React from 'react';
import { useSelector } from 'react-redux';
// Mui
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
// Components
import CustomListSubheader from '../../common/ui/CustomListSubheader';
import UserListItem from '../profile/UserListItem';
import Tweet from '../home/Tweet';

export default function SearchResultsContainer() {
  const { users, tweets } = useSelector(state => state.searchEntries);
  return (
    <Box>
      <List
        component={Paper}
        subheader={<CustomListSubheader title="People" divider />}
        variant="outlined"
        square
        disablePadding
      >
        {users.map(user => (
          <UserListItem user={user} />
        ))}
      </List>
      <List
        component={Paper}
        subheader={<Box borderTop="3px solid #e0e0e0" />}
        variant="outlined"
        square
        disablePadding
      >
        {tweets.map(tweet => (
          <Tweet tweet={tweet} />
        ))}
      </List>
    </Box>
  );
}
