import React from 'react';
import useImagePreview from '../../common/hooks/useImagePreview';
import TweetSingleImage from './TweetSingleImage';

export default function TweetSingleImageContainer({ tweetImages }) {
  const [showModal, togglePreview, PreviewModal] = useImagePreview(tweetImages);

  const toggleImagePreview = event => {
    event.stopPropagation();
    togglePreview(0);
  };

  return (
    <TweetSingleImage
      previewModal={<PreviewModal />}
      showModal={showModal}
      onClick={toggleImagePreview}
      image={`http://localhost:6500/${tweetImages[0].url}`}
    />
  );
}
