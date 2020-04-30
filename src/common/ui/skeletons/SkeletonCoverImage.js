import React from 'react';
// Mui Components
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: 200
  }
});
const SkeletonCoverImage = () => {
  const classes = useStyles();
  return <Skeleton variant="rect" animation="wave" className={classes.root} />;
};

export default SkeletonCoverImage;
