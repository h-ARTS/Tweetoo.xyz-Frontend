import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const modalRoot = document.getElementById('modal');

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000
  }
});
export default function Modal({ children, onClick }) {
  const classes = useStyles();
  const modalEl = useRef(null);
  if (!modalEl.current) {
    modalEl.current = document.createElement('div');
  }

  useEffect(() => {
    modalRoot.appendChild(modalEl.current);

    return () => modalRoot.removeChild(modalEl.current);
  }, []);

  return createPortal(
    <Box onClick={onClick} className={classes.root}>
      {children}
    </Box>,
    modalEl.current
  );
}
