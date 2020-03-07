import React, { Component } from 'react';

export default WrappedComponent => {
  // eslint-disable-next-line no-useless-escape
  const hashtagPattern = /\B\#\w\w+\b/g;
  // eslint-disable-next-line no-useless-escape
  const profilePattern = /\B\@\w\w+\b/g;

  return class extends Component {
    static displayName = `WithLinkTransformation(${WrappedComponent.displayName ||
      WrappedComponent.name})`;

    hashtagTransform(children) {
      const words = children.split(' ');
      return words.map(word => {
        if (word.match(hashtagPattern) != null) {
          return (
            <React.Fragment key={word}>
              <a href={`/?search=${word}`} alt={word}>
                {word}
              </a>{' '}
            </React.Fragment>
          );
        } else if (word.match(profilePattern) != null) {
          return (
            <React.Fragment key={word}>
              <a href={`/${word}`} alt={word}>
                {word}
              </a>{' '}
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
