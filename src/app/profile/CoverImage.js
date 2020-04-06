import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  coverImage: {
    height: 200
  }
});
export default function CoverImage(props) {
  const classes = useStyles();
  return (
    <CardMedia
      className={classes.coverImage}
      image="https://source.unsplash.com/random/700x240"
    >
      {props.children}
    </CardMedia>
  );
}
