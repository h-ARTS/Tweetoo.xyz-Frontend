import React from 'react';
import { navigate, useLocation } from '@reach/router';
// MUI Components
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// MUI Styles
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBackRounded';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: '49px',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderTop: 0
  },
  pageBack: {
    marginRight: theme.spacing(2)
  },
  pageTitle: {
    fontWeight: 800
  }
}));
export default function PageTitle(props) {
  const classes = useStyles();
  const location = useLocation();
  const filteredPaths = ['/home', '/trending', '/notifications', '/bookmarks'];

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <Paper className={classes.root} variant="outlined" square>
      {filteredPaths[location.pathname] ? (
        <IconButton
          size="small"
          color="secondary"
          onClick={navigateBack}
          className={classes.pageBack}
        >
          <ArrowBackIcon />
        </IconButton>
      ) : null}
      <Typography className={classes.pageTitle} variant="h6" component="h2">
        {props.title}
      </Typography>
    </Paper>
  );
}
