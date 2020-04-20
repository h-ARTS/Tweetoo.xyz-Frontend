import React from 'react';
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

export default function UserListItem({ user }) {
  const { isFollowing, handleFollowUser } = useFollow(user.handle);

  return (
    <ListItem divider button component={Link} to={`/${user.handle}`}>
      <ListItemAvatar>
        {user.userImage ? (
          <Avatar src={`http://localhost:6500/${user.userImage.url}`} />
        ) : (
          <Avatar />
        )}
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
