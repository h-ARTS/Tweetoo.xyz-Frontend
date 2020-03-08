import React from 'react';
import { IconButton } from '@material-ui/core';
// MUI Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function MoreButton() {
  return (
    <IconButton aria-label="more" onClick={e => e.stopPropagation()}>
      <MoreVertIcon />
    </IconButton>
  );
}
