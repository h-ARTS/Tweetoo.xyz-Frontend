import React, { memo } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    margin: '0 16px',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: 10
  }
});
const TweetSingleImage = memo(function TweetSingleImage({
  showModal,
  previewModal,
  onClick,
  image
}) {
  const classes = useStyles();

  return (
    <>
      {showModal && previewModal}
      <CardMedia onClick={onClick} className={classes.media} image={image} />
    </>
  );
});

export default TweetSingleImage;
