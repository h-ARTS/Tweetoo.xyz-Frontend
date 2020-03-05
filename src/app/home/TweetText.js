import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function TweetText({ fullText }) {
  const fullTextQueryHashtagToAnchor = () => {
    // eslint-disable-next-line no-useless-escape
    const hashtagPattern = /\B\#\w\w+\b/g;
    // eslint-disable-next-line no-useless-escape
    // const profilePattern = /\B\@\w\w+\b/g;

    const components = {
      fullText: ({ children }) => {
        const words = children.split(' ');
        return words.map(word => {
          if (word.match(hashtagPattern) != null) {
            return (
              <>
                <a href={`/?search=${word}`} alt={word}>
                  {word}
                </a>{' '}
              </>
            );
          }
          return word + ' ';
        });
      }
    };

    const Paragraph = components['fullText'];

    return (
      <Typography type="body2">
        <Paragraph>{fullText}</Paragraph>
      </Typography>
    );
  };

  return <CardContent>{fullTextQueryHashtagToAnchor()}</CardContent>;
}
