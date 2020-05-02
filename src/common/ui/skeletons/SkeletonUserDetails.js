import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonUserDetails = () => {
  return (
    <React.Fragment>
      <Skeleton variant="text" animation="wave" width={140} height={24} />
      <Skeleton variant="text" animation="wave" width={160} height={24} />
      <Skeleton variant="text" animation="wave" width={100} height={24} />
    </React.Fragment>
  );
};

export default SkeletonUserDetails;
