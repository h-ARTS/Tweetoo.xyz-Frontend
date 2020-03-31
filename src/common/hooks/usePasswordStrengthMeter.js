import { makeStyles, lighten, useTheme } from '@material-ui/core/styles';
import { red, orange, green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1),
    height: 20,
    backgroundColor: props => lighten(props.color, 0.5),
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: props => props.color
    }
  }
}));
const usePasswordStrengthMeter = password => {
  const theme = useTheme();
  let points = 0;

  const haveAtLeast8Chars = p => p.match(/.{8,}/g) && 1;
  const haveAtLeast12Chars = p => p.match(/.{12,}/g) && 1;
  const haveAtLeastLowerCase = p => p.match(/(?=.*?[a-z])/g) && 1;
  const haveAtLeastUpperCase = p => p.match(/(?=.*?[A-Z])/g) && 1;
  const haveAtLeastOneDigit = p => p.match(/(?=.*?[0-9])/g) && 1;
  const haveAtLeastSpecialChars = p =>
    p.match(/(?=.*?[§°#+"ç//=€£?!@$%^&*-])/g) && 1;

  points =
    haveAtLeast8Chars(password) +
    haveAtLeast12Chars(password) +
    haveAtLeastLowerCase(password) +
    haveAtLeastUpperCase(password) +
    haveAtLeastOneDigit(password) +
    haveAtLeastSpecialChars(password);

  const levels = {
    '0': {
      value: 0,
      label: 'Password strength',
      color: theme.palette.primary.dark
    },
    '1': {
      value: 16,
      label: 'Very poor',
      color: red[700]
    },
    '2': {
      value: 32,
      label: 'Weak',
      color: red[400]
    },
    '3': {
      value: 48,
      label: 'Weak',
      color: red[400]
    },
    '4': {
      value: 64,
      label: 'Avarege',
      color: orange[500]
    },
    '5': {
      value: 80,
      label: 'Good',
      color: green[400]
    },
    '6': {
      value: 100,
      label: 'Excellent',
      color: green[700]
    }
  };

  console.log(points);
  const color = levels[points].color;
  const styles = useStyles({ color });
  const label = levels[points].label;
  const value = levels[points].value;

  return [label, styles, value, color];
};

export default usePasswordStrengthMeter;
