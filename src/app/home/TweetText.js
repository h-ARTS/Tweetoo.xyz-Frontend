import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function TweetText({ fullText }) {
  const fullTextQueryHashtagToAnchor = () => {
    const regex = /\B\#\w\w+\b/g;
    let matches = fullText.match(regex);
    const fullTextWithoutHashtags = fullText.replace(regex, '');

    const hashTagElems = matches.map(match => (
      <a href={`/?search=${match}`} alt={match}>
        {match}
      </a>
    ));
    return (
      <Typography type="body2">
        {fullTextWithoutHashtags} {hashTagElems.map(hashtag => hashtag)}
      </Typography>
    );
  };

  return <CardContent>{fullTextQueryHashtagToAnchor()}</CardContent>;
}
