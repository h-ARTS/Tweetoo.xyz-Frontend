import React from 'react';
// Mui Components
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    borderLeft: 'none',
    borderTop: 'none',
    borderRight: 'none'
  }
}));
export const SkeletonTweet = () => {
  const classes = useStyles();

  return (
    <Card variant="outlined" square className={classes.root}>
      <CardHeader
        avatar={
          <Skeleton variant="circle" width={40} height={40} animation="wave" />
        }
        title={
          <Skeleton variant="text" width="50%" height={18} animation="wave" />
        }
      />
      <CardContent>
        <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
        <Skeleton
          animation="wave"
          height={15}
          width="70%"
          style={{ marginBottom: 6 }}
        />
        <Skeleton animation="wave" height={15} width="80%" />
        <Box display="flex" justifyContent="space-around" mt={3}>
          <Skeleton variant="circle" width={32} height={32} animation="wave" />
          <Skeleton variant="circle" width={32} height={32} animation="wave" />
          <Skeleton variant="circle" width={32} height={32} animation="wave" />
          <Skeleton variant="circle" width={32} height={32} animation="wave" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SkeletonTweet;
