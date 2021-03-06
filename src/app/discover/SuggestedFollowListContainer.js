import React from 'react';
// Mui Components
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
// Mui Styles
import { makeStyles } from '@material-ui/core/styles';
// Components
import SuggestedFollowListItem from './SuggestedFollowListItem';
import CustomListSubheader from '../../common/ui/CustomListSubheader';
// Hooks
import useFakeFollowersApi from '../../common/hooks/useFakeFollowers';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  loading: {
    justifyContent: 'center'
  }
}));
export default function SuggestedFollowListContainer() {
  const classes = useStyles();
  const [loading, usersToFollow] = useFakeFollowersApi(4);

  const followUser = () => {};

  return (
    <List
      component={Paper}
      subheader={<CustomListSubheader title="You might follow them?" />}
      variant="outlined"
      square
    >
      {loading ? (
        <ListItem className={classes.loading}>
          <CircularProgress color="secondary" size={30} />
        </ListItem>
      ) : (
        usersToFollow.map(user => (
          <React.Fragment key={`${user.name.first}-${user.name.last}`}>
            <SuggestedFollowListItem
              user={user}
              handleFollowUser={followUser}
            />
            {usersToFollow[usersToFollow.length - 1] !== user ? (
              <Divider variant="inset" />
            ) : null}
          </React.Fragment>
        ))
      )}
    </List>
  );
}
