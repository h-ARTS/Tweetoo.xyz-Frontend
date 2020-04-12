import React from 'react';
// Mui
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import PublicIcon from '@material-ui/icons/PublicTwoTone';

export const Website = React.forwardRef(({ website }, ref) => {
  return (
    <Box display="flex" alignItems="center">
      <PublicIcon />
      <Link
        ref={ref}
        href={`http://${website}`}
        color="secondary"
        variant="subtitle2"
        target="_blank"
        rel="noopener noreferrer"
      >
        {website}
      </Link>
    </Box>
  );
});

export default Website;
