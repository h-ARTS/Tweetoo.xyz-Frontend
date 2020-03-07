import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      fontWeight: 600,
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
}));
export default function TweetText(props) {
  const classes = useStyles();
  const { fullText, hashtagTransform } = props;
  return (
    <CardContent>
      <Typography type="body2" className={classes.root}>
        {hashtagTransform(fullText)}
      </Typography>
    </CardContent>
  );
}
