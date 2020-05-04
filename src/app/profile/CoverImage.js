import React from 'react';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles({
  coverImage: {
    height: 200
  },
  noImage: {
    height: 200,
    backgroundColor: grey[500]
  }
});
export default function CoverImage({ coverImage, children }) {
  const classes = useStyles();
  return !coverImage ? (
    <Box className={classes.noImage}>{children}</Box>
  ) : (
    <CardMedia
      className={classes.coverImage}
      image={`http://localhost:6500/${coverImage.url}`}
    >
      {children}
    </CardMedia>
  );
}
