import {
  createMuiTheme
} from '@material-ui/core/styles';

const themeName = 'Tweetoo.xyz';

const palette = {
  primary: {
    main: "#ffffff",
    light: "rgb(255, 255, 255)",
    dark: "rgb(178, 178, 178)",
    contrastText: '#000000'
  },
  secondary: {
    main: "#2962FF",
    light: "rgb(83, 129, 255)",
    dark: "rgb(28, 68, 178)",
    contrastText: "#fff"
  }
};

const typography = {
  fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif",
  useNextVariants: true
}

export default createMuiTheme({
  themeName,
  palette,
  typography,
  spreadThis: {}
});