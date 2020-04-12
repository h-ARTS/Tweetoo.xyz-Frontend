import React from 'react';
// Mui
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CalendarIcon from '@material-ui/icons/CalendarTodayTwoTone';

export const Joined = ({ date }) => {
  return (
    <Box display="flex" alignItems="center" pb={1}>
      <CalendarIcon />
      <Typography variant="subtitle2">Joined since {date}</Typography>
    </Box>
  );
};

export default Joined;
