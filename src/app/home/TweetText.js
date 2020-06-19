import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: props => (props.largeText ? '1.30rem' : 'inherit'),
    whiteSpace: 'pre-wrap',
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
export default function TweetText({
  largeText = 'inherit',
  fullText,
  hashtagTransform,
  handleStopPropagation
}) {
  const classes = useStyles({ largeText });

  return (
    <CardContent>
      <Typography
        variant="body1"
        className={classes.root}
        onClick={handleStopPropagation}
      >
        {hashtagTransform(fullText)}
      </Typography>
    </CardContent>
  );
}
