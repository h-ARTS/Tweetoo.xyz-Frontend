import React from 'react';
// Mui Components
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
// Mui Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  subheader: {
    color: '#000',
    paddingTop: theme.spacing(1),
    fontSize: '1.25rem',
    fontWeight: 700
  },
  divider: {
    marginTop: theme.spacing(1)
  }
}));
export default function CustomListSubheader({ title, divider }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ListSubheader>
        <Typography component="p" className={classes.subheader}>
          {title}
        </Typography>
      </ListSubheader>
      {divider && <Divider className={classes.divider} />}
    </React.Fragment>
  );
}
