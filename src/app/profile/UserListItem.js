import React, { useContext, useEffect } from 'react';
import { Link } from '@reach/router';
// Mui Components
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import PersonAddIcon from '@material-ui/icons/PersonAddTwoTone';
import { useFollow } from '../../common/hooks/useFollow';
import { UserContext } from '../../common/context/UserContextProvider';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function UserListItem({ user }) {
  const current = useContext(UserContext);
  const { isFollowing, handleFollowUser } = useFollow(user.handle);
  const { status, data, refetch } = useQuery(
    ['follower', user.handle],
    async () => {
      const response = await axios.get('/api/user/' + user.handle);

      return response.data;
    }
  );

  useEffect(() => {
    refetch();
  }, [isFollowing, refetch]);

  return status === 'loading' ? (
    <ListItem />
  ) : (
    <ListItem divider button component={Link} to={`/${data.handle}`}>
      <ListItemAvatar>
        {data.userImage ? (
          <Avatar src={`http://localhost:6500/${data.userImage.url}`} />
        ) : (
          <Avatar />
        )}
      </ListItemAvatar>
      <ListItemText primary={data.fullName} secondary={data.bio} />
      {current._id !== data._id && (
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="follow"
            color={isFollowing() ? 'secondary' : 'default'}
            onClick={handleFollowUser}
          >
            <PersonAddIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}
