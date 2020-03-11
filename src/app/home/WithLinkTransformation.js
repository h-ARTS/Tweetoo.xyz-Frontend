import React, { Component } from 'react';
import { Link } from '@reach/router';
import Anchor from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';

const HiddenBox = styled(Box)({
  fontSize: 0,
  minWidth: 0,
  overflowWrap: 'break-word'
});

export default WrappedComponent => {
  // eslint-disable-next-line no-useless-escape
  const hashtagPattern = /\B\#\w\w+\b/g;
  // eslint-disable-next-line no-useless-escape
  const profilePattern = /\B\@\w\w+\b/g;
  // eslint-disable-next-line no-useless-escape
  const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  const httpPattern = /^(f|ht)tps?:\/\//i;
  const withoutHttpPattern = /^(:\/\/)/;

  return class extends Component {
    static displayName = `WithLinkTransformation(${WrappedComponent.displayName ||
      WrappedComponent.name})`;

    getValidUrl = url => {
      let newUrl = window.decodeURIComponent(url);
      newUrl = newUrl.trim().replace(/\s/g, '');

      if (withoutHttpPattern.test(newUrl)) {
        return `http${newUrl}`;
      }

      if (!httpPattern.test(newUrl)) {
        return `http://${newUrl}`;
      }

      return newUrl;
    };

    linkFactory = url => {
      const newUrl = this.getValidUrl(url);
      const httpLength = newUrl.includes('https') ? 8 : 7;
      const http = (
        <HiddenBox component="span">
          {newUrl.substring(0, httpLength)}
        </HiddenBox>
      );
      if (newUrl.length > 27) {
        const shortened = newUrl.substring(httpLength, 29);
        const restUrl = (
          <HiddenBox component="span">{newUrl.substring(29)}</HiddenBox>
        );

        return (
          <>
            {http}
            {shortened}
            {restUrl}
            <span>…</span>
          </>
        );
      } else {
        const restUrl = newUrl.substring(httpLength);
        return (
          <>
            {http}
            {restUrl}
          </>
        );
      }
    };

    hashtagTransform = children => {
      const words = children.split(' ');
      return words.map(word => {
        if (word.match(hashtagPattern) != null) {
          return (
            <React.Fragment key={word}>
              <Link
                to={`/?search=${word}`}
                alt={word}
                aria-label={`Discover ${word}`}
              >
                {word}
              </Link>{' '}
            </React.Fragment>
          );
        } else if (word.match(profilePattern) != null) {
          return (
            <React.Fragment key={word}>
              <Link
                to={`/${word}`}
                alt={word}
                title={word}
                aria-label={`Learn more about ${word.substring(1)}`}
              >
                {word}
              </Link>{' '}
            </React.Fragment>
          );
        } else if (word.match(urlPattern) != null) {
          const url = this.getValidUrl(word);
          return (
            <React.Fragment key={url}>
              <Anchor
                href={`${url}`}
                title={url}
                target="_blank"
                role="link"
                rel="noopener noreferrer"
                aria-label={`Open Link in a new tab: ${url}`}
              >
                {this.linkFactory(word)}
              </Anchor>{' '}
            </React.Fragment>
          );
        }
        return word + ' ';
      });
    };

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
