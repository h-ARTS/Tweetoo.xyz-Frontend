import React, { useState, useEffect, useCallback } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
// Mui Components
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import PersonAddIcon from '@material-ui/icons/PersonAddTwoTone';
import { useFollow } from '../../common/hooks/useFollow';

export default function UserListItem({ handle }) {
  let _isMounted = false;
  const initialState = { userImage: { url: '' } };
  const [user, setUser] = useState(initialState);
  const { isFollowing, handleFollowUser } = useFollow(user.handle);

  const fetchUser = useCallback(async () => {
    const user = await axios.get(`/api/user/${handle}`);
    if (_isMounted) {
      setUser(user.data);
    }
  }, [_isMounted, handle]);

  useEffect(() => {
    _isMounted = true;
    fetchUser();

    return () => {
      _isMounted = false;
    };
  }, [fetchUser]);

  return (
    <ListItem divider button component={Link} to={`/${handle}`}>
      <ListItemAvatar>
        <Avatar src={`http://localhost:6500/${user.userImage.url}`} />
      </ListItemAvatar>
      <ListItemText primary={user.fullName} secondary={user.bio} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="follow"
          color={isFollowing ? 'secondary' : 'default'}
          onClick={handleFollowUser}
        >
          <PersonAddIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
