import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonFullnameHandleBio = () => {
  return (
    <React.Fragment>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        mb={1}
        mt={-3}
      >
        <Skeleton variant="text" animation="wave" width={90} height={32} />
        <Skeleton variant="text" animation="wave" width={50} height={21} />
      </Box>
      <Box>
        <Skeleton variant="text" animation="wave" width="100%" />
        <Skeleton variant="text" animation="wave" width="70%" />
      </Box>
    </React.Fragment>
  );
};

export default SkeletonFullnameHandleBio;
