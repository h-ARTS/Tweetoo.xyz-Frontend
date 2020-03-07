import React from 'react';

export default WrappedComponent => {
  // eslint-disable-next-line no-useless-escape
  const hashtagPattern = /\B\#\w\w+\b/g;
  // eslint-disable-next-line no-useless-escape
  const profilePattern = /\B\@\w\w+\b/g;

  return class extends React.Component {
    static displayName = `WithLinkTransformation(${WrappedComponent})`;

    hashtagTransform(children) {
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
        } else if (word.match(profilePattern) != null) {
          return (
            <>
              <a href={`/${word}`} alt={word}>
                {word}
              </a>{' '}
            </>
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
