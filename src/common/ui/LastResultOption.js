import React from 'react';
import { navigate } from '@reach/router';
// Mui Component
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// MUI Icons
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  listItemLeft: {
    display: 'flex',
    alignItems: 'center'
  },
  listItemText: {
    marginLeft: theme.spacing(2)
  }
}));
export default function LastResultOption({ params, onRemove }) {
  const classes = useStyles();

  const navigateToEntry = e => {
    e.stopPropagation();
    navigate(`/${params.handle}`);
  };

  return (
    <Box className={classes.listItem} onClick={navigateToEntry}>
      <Box className={classes.listItemLeft}>
        <Avatar
          alt={params.fullName}
          src={`http://localhost:6500/${params.userImage.url}`}
        ></Avatar>
        <Typography className={classes.listItemText} variant="body1">
          {params.fullName}
        </Typography>
      </Box>
      <Box>
        <IconButton
          aria-label="delete"
          size="small"
          color="secondary"
          onClick={e => onRemove(e, params)}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  );
}
