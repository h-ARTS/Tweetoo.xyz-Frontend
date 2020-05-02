import React from 'react';
// MUI Components
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import SearchIcon from '@material-ui/icons/SearchTwoTone';
// Mui Styles
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  inputAdornment: {
    color: theme.palette.primary.dark
  }
}));
export default function SearchInput(props) {
  const classes = useStyles();

  const {
    InputLabelProps,
    inputProps,
    inputRef,
    loading,
    onChange,
    value
  } = props;
  return (
    <React.Fragment>
      <InputLabel htmlFor="search-input" color="secondary" {...InputLabelProps}>
        Search on Tweetoo.xyz
      </InputLabel>
      <Input
        fullWidth
        value={value}
        color="secondary"
        id="search-input"
        aria-describedby="search-helper-text"
        inputProps={inputProps}
        onKeyUp={e => onChange(e)}
        ref={inputRef}
        startAdornment={
          <InputAdornment position="start" className={classes.inputAdornment}>
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          <React.Fragment>
            {loading ? <CircularProgress color="secondary" size={20} /> : null}
          </React.Fragment>
        }
      />
      <FormHelperText id="search-helper-text" hidden>
        Discover on Tweetoo.xyz
      </FormHelperText>
    </React.Fragment>
  );
}
