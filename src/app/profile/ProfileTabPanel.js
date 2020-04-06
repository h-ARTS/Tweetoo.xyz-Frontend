import React from 'react';
import Box from '@material-ui/core/Box';

export default function ProfileTabPanel({ children, value, index, ...other }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}
