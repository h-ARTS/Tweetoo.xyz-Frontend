import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function TweetText(props) {
  const { fullText, hashtagTransform } = props;
  return (
    <CardContent>
      <Typography type="body2">{hashtagTransform(fullText)}</Typography>
    </CardContent>
  );
}
