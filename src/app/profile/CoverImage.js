import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  coverImage: {
    height: 200
  }
});
export default function CoverImage({ coverImage, children }) {
  const classes = useStyles();
  return (
    <CardMedia
      className={classes.coverImage}
      image={`http://localhost:6500/${coverImage.url}`}
    >
      {children}
    </CardMedia>
  );
}
