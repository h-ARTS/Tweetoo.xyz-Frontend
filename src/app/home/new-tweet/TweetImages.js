import React from 'react';
// Mui components
import CloseIcon from '@material-ui/icons/CloseRounded';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: props =>
      !props.isEdit ? '0 16px 10px !important' : '16px 0 10px !important',
    border: props => !props.isEdit && '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: props => (!props.isEdit ? 10 : 0)
  },
  gridListTile: {
    position: 'relative',
    padding: props => !props.isEdit && '0 !important',
    '& .MuiGridListTile-tile': {
      borderRadius: props => (props.isEdit ? 10 : 0)
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
export default function TweetImages({
  isEdit,
  cachedImages = [],
  imagesSortedInTileSizes,
  onRemove
}) {
  const classes = useStyles({ isEdit });

  if (!cachedImages.length && !imagesSortedInTileSizes.length)
    return <div></div>;

  return (
    <GridList cellHeight={isEdit ? 200 : 290} cols={3} className={classes.root}>
      {imagesSortedInTileSizes.map(tile => (
        <GridListTile
          className={classes.gridListTile}
          key={tile._id}
          cols={tile.cols}
          data-id={tile._id}
        >
          {isEdit && (
            <IconButton
              size="small"
              className={classes.closeButton}
              color="primary"
              onClick={e => onRemove(e, tile._id)}
            >
              <CloseIcon />
            </IconButton>
          )}
          <img
            src={`http://localhost:6500/${tile.url || tile.path}`}
            alt={tile.name}
          />
        </GridListTile>
      ))}
    </GridList>
  );
}
