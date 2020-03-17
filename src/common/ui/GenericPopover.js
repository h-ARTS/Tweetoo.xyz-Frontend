import React from 'react';
// Mui Components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfiedTwoTone';
// Mui Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  popoverCard: {
    borderTopRightRadius: 0
  },
  listItemIcon: {
    minWidth: 40
  }
});

export default function GenericPopover({ items, id, open, anchorEl, onClose }) {
  const classes = useStyles();
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      elevation={4}
      PaperProps={{
        className: classes.popoverCard
      }}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      <List disablePadding>
        {items.map(item => (
          <ListItem button divider={item.divider}>
            <ListItemIcon className={classes.listItemIcon}>
              <SentimentVeryDissatisfiedIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography>{item.title}</Typography>} />
          </ListItem>
        ))}
      </List>
    </Popover>
  );
}
