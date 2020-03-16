import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  subheader: {
    color: '#000',
    paddingTop: theme.spacing(1),
    fontSize: '1.25rem',
    fontWeight: 700
  }
}));

export default function CustomListSubheader({ title }) {
  const classes = useStyles();

  return (
    <ListSubheader>
      <Typography component="p" className={classes.subheader}>
        {title}
      </Typography>
    </ListSubheader>
  );
}
