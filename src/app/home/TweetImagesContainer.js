import React from 'react';
import useTweetImages from '../../common/hooks/useTweetImages';
import TweetImages from './new-tweet/TweetImages';

export default function TweetImagesContainer({ images }) {
  const imagesSortedInTileSizes = useTweetImages(images);

  return <TweetImages imagesSortedInTileSizes={imagesSortedInTileSizes} />;
}
