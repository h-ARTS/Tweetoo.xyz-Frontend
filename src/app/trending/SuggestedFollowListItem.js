import React from 'react';
// Mui Components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
// Mui Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  sFollowHandle: {
    color: theme.palette.primary.dark
  }
}));

export default function SuggestedFollowListItem({ user, handleFollowUser }) {
  const classes = useStyles();
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          alt={`${user.name.first} ${user.name.last}`}
          src={user.picture.thumbnail}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="subtitle2">
            {user.name.first} {user.name.last}
          </Typography>
        }
        secondary={
          <Typography variant="body2" className={classes.sFollowHandle}>
            {`@${user.name.first}${user.name.last}`}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          disableElevation
          onClick={handleFollowUser}
        >
          Follow
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
