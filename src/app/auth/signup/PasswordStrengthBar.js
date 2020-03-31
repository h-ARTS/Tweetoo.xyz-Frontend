import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import usePasswordStrengthMeter from '../../../common/hooks/usePasswordStrengthMeter';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  label: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: props => theme.palette.getContrastText(props.color)
  }
}));
export default function PasswordStrengthBar({ password }) {
  const [label, styles, value, color] = usePasswordStrengthMeter(password);
  const classes = useStyles({ color });

  return (
    <Box position="relative">
      <LinearProgress
        color="primary"
        className={styles.root}
        variant="determinate"
        value={value}
      />
      <Typography className={classes.label} variant="caption">
        {label}
      </Typography>
    </Box>
  );
}
