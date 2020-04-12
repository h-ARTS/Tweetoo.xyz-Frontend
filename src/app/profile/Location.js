import React from 'react';
// Mui
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LocationIcon from '@material-ui/icons/LocationOnTwoTone';

export const Location = ({ location }) => {
  return (
    <Box display="flex" alignItems="center" pb={1}>
      <LocationIcon />
      <Typography variant="subtitle2">{location}</Typography>
    </Box>
  );
};

export default Location;
