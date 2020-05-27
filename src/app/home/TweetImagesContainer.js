import React from 'react';
import TweetImages from './TweetImages';
import useTweetImages from '../../common/hooks/useTweetImages';
import useImagePreview from '../../common/hooks/useImagePreview';

export default function TweetImagesContainer({ images }) {
  const imagesSortedInTileSizes = useTweetImages(images);
  const [showModal, togglePreview, PreviewModal] = useImagePreview(
    imagesSortedInTileSizes
  );

  const togglePreviewModal = event => {
    event.stopPropagation();
    const index = event.target.dataset.id;
    togglePreview(index);
  };

  return (
    <TweetImages
      showModal={showModal}
      imagesSortedInTileSizes={imagesSortedInTileSizes}
      onClick={togglePreviewModal}
      previewModal={<PreviewModal />}
    />
  );
}
