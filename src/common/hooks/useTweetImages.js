import { useMemo } from 'react';

const useTweetImages = targetImages => {
  const imagesSortedInTileSizes = useMemo(() => {
    const images = targetImages;
    const imageTileSizes = {
      1: [3],
      2: [1.5, 1.5],
      3: [3, 1.5, 1.5],
      4: [1.5, 1.5, 1.5, 1.5],
      5: [3, 2, 1, 1, 2],
      6: [1]
    };

    images.forEach(function getOne(image, idx) {
      image.cols = this[idx];
    }, imageTileSizes[images.length]);

    return images;
  }, [targetImages]);

  return imagesSortedInTileSizes;
};

export default useTweetImages;
