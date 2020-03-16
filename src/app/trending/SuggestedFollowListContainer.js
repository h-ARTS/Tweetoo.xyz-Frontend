import React, { useState, useEffect } from 'react';
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
  const [potentialFollow, setPotentialFollow] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFakeUsers = async () => {
      const response = await fetch('https://uinames.com/api/?amount=4&ext', {
        mode: 'cors'
      });

      const potentialFollowers = await response.json();
      setPotentialFollow(potentialFollowers);
      setLoading(false);
    };

    fetchFakeUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const followUser = () => {};

  const subheader = <CustomListSubheader title="You might follow them?" />;

  return (
    <List component={Paper} subheader={subheader} variant="outlined" square>
      {loading ? (
        <ListItem className={classes.loading}>
          <CircularProgress color="secondary" size={30} />
        </ListItem>
      ) : (
        potentialFollow.map(user => (
          <React.Fragment key={`${user.name}-${user.surname}`}>
            <SuggestedFollowListItem
              user={user}
              handleFollowUser={followUser}
            />
            {potentialFollow[potentialFollow.length - 1] !== user ? (
              <Divider variant="inset" />
            ) : null}
          </React.Fragment>
        ))
      )}
    </List>
  );
}
