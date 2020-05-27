import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCachedImage } from '../../../redux/actions/data.actions';
import useTweetImages from '../../../common/hooks/useTweetImages';
import TweetImages from '../TweetImages';

export default function CachedTweetImagesContainer() {
  const cachedImages = useSelector(state => state.cached.newTweetImages);
  const dispatch = useDispatch();
  const imagesSortedInTileSizes = useTweetImages(cachedImages);

  const deleteCachedTweetImage = (event, imageId) => {
    event.stopPropagation();

    dispatch(removeCachedImage(imageId));
  };

  return (
    <TweetImages
      isEdit
      onRemove={deleteCachedTweetImage}
      cachedImages={cachedImages}
      imagesSortedInTileSizes={imagesSortedInTileSizes}
    />
  );
}
