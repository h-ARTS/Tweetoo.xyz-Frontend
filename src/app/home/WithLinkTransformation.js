import React, { Component } from 'react';
import { Link } from '@reach/router';
import Anchor from '@material-ui/core/Link';

export default WrappedComponent => {
  // eslint-disable-next-line no-useless-escape
  const hashtagPattern = /\B\#\w\w+\b/g;
  // eslint-disable-next-line no-useless-escape
  const profilePattern = /\B\@\w\w+\b/g;
  // eslint-disable-next-line no-useless-escape
  const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

  return class extends Component {
    static displayName = `WithLinkTransformation(${WrappedComponent.displayName ||
      WrappedComponent.name})`;

    hashtagTransform(children) {
      const words = children.split(' ');
      return words.map(word => {
        if (word.match(hashtagPattern) != null) {
          return (
            <React.Fragment key={word}>
              <Link to={`/?search=${word}`} alt={word}>
                {word}
              </Link>{' '}
            </React.Fragment>
          );
        } else if (word.match(profilePattern) != null) {
          return (
            <React.Fragment key={word}>
              <Link to={`/${word}`} alt={word} title={word}>
                {word}
              </Link>{' '}
            </React.Fragment>
          );
        } else if (word.match(urlPattern) != null) {
          return (
            <React.Fragment key={word}>
              <Anchor
                href={`${word}`}
                title={word}
                target="_blank"
                role="link"
                rel="noopener noreferrer"
              >
                {word}
              </Anchor>{' '}
            </React.Fragment>
          );
        }
        return word + ' ';
      });
    }

    render() {
      const { fullText } = this.props;
      return (
        <WrappedComponent
          {...this.props}
          fullText={fullText}
          hashtagTransform={this.hashtagTransform}
        />
      );
    }
  };
};
