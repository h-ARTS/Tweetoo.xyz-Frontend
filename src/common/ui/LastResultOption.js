import React from 'react';
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
export default function LastResultOption({
  params,
  onRemove,
  onClick,
  navigate
}) {
  const classes = useStyles();

  const navigateToEntryAndSaveResult = e => {
    e.stopPropagation();
    onClick(params);

    if (params.handle !== '') navigate(`/${params.handle}`);
    else navigate(`/discover/search?q=${params.fullName}`);
  };

  const removeItem = e => onRemove(e, params);

  return (
    <Box className={classes.listItem} onClick={navigateToEntryAndSaveResult}>
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
        {!params._id ? (
          <IconButton
            aria-label="delete"
            size="small"
            color="secondary"
            onClick={removeItem}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        ) : null}
      </Box>
    </Box>
  );
}
