import React from 'react';
import { Link } from '@reach/router';
// MUI
import RetweetIcon from '@material-ui/icons/CachedTwoTone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  retweeted: {
    display: 'flex',
    alignItems: 'center',
    color: grey[600],
    padding: theme.spacing(1, 2, 0),
    marginBottom: theme.spacing(-1),
    '& svg': {
      marginRight: theme.spacing(1)
    },
    '& a': {
      color: grey[600],
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
}));
export default function CardHeaderRetweeted(props) {
  const classes = useStyles();

  return (
    <div className={classes.retweeted}>
      <RetweetIcon fontSize="small" />
      <Typography
        variant="caption"
        component={Link}
        onClick={e => e.stopPropagation()}
        to={`/${props.handle}`}
      >
        {props.handle} retweeted
      </Typography>
    </div>
  );
}
