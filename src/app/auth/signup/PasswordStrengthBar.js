import React from 'react';
import usePasswordStrengthMeter from '../../../common/hooks/usePasswordStrengthMeter';
// Mui Components
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// Mui styles
import { makeStyles, lighten } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    height: 20,
    backgroundColor: props => lighten(props.color, 0.5),
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: props => props.color
    }
  },
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
  const [label, value, color] = usePasswordStrengthMeter(password);
  const classes = useStyles({ color });

  return (
    <Box position="relative">
      <LinearProgress
        className={classes.root}
        color="primary"
        variant="determinate"
        value={value}
      />
      <Typography className={classes.label} variant="caption">
        {label}
      </Typography>
    </Box>
  );
}
