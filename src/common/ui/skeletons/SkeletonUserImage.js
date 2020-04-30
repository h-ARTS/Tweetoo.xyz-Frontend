import React from 'react';
// Mui Components
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    margin: '0 auto',
    left: 0,
    right: 0,
    bottom: '-70px',
    backgroundColor: '#f5f5f5',
    width: 135,
    height: 135,
    borderRadius: '50%',
    border: '5px solid #fff'
  }
});
const SkeletonUserImage = () => {
  const classes = useStyles();

  return (
    <Box position="relative">
      <Box className={classes.root}>
        <Skeleton variant="circle" animation="wave" width={135} height={135} />
      </Box>
    </Box>
  );
};

export default SkeletonUserImage;
