import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Mui components
import CloseIcon from '@material-ui/icons/CloseRounded';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { removeCachedImage } from '../../../redux/actions/data.actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '10px 0'
  },
  gridListTile: {
    position: 'relative',
    '& .MuiGridListTile-tile': {
      borderRadius: 10
    }
  },
  closeButton: {
    position: 'absolute',
    top: 6,
    left: 6,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
}));
export default function TweetImages() {
  const dispatch = useDispatch();
  const cachedImages = useSelector(state => state.cached.newTweetImages);
  const classes = useStyles();

  const imagesSortedTileSizes = useMemo(() => {
    const images = cachedImages;
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
  }, [cachedImages]);

  const deleteCachedTweetImage = (event, imageId) => {
    event.stopPropagation();

    dispatch(removeCachedImage(imageId));
  };

  if (!cachedImages.length) return <div></div>;

  return (
    <GridList cellHeight={200} cols={3} className={classes.root}>
      {imagesSortedTileSizes.map(tile => (
        <GridListTile
          className={classes.gridListTile}
          key={tile._id}
          cols={tile.cols}
          data-id={tile._id}
        >
          <IconButton
            size="small"
            className={classes.closeButton}
            color="primary"
            data-imageid={tile._id}
            onClick={e => deleteCachedTweetImage(e, tile._id)}
          >
            <CloseIcon />
          </IconButton>
          <img src={`http://localhost:6500/${tile.path}`} alt={tile.name} />
        </GridListTile>
      ))}
    </GridList>
  );
}
