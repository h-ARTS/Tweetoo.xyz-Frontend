import React from 'react';
import { Divider, Typography } from '@material-ui/core';
import { styled, makeStyles } from '@material-ui/core/styles';
import { compose, spacing } from '@material-ui/system';

const Box = styled('div')(compose(spacing));
const useStyles = makeStyles(theme => ({
  trendsTitle: {
    fontSize: '1.25rem',
    fontWeight: 700
  }
}));

export default function TrendsHeading() {
  const classes = useStyles();

  return (
    <Box>
      <Box py={1} px={2}>
        <Typography className={classes.trendsTitle}>
          Trends: Pakistan
        </Typography>
      </Box>
      <Divider />
    </Box>
  );
}
