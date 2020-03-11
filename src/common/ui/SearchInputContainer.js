import React, { useState } from 'react';
// MUI Components
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/SearchTwoTone';
// MUI Styles
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    borderRadius: 0,
    borderTop: 0,
    borderBottom: 0,
    backgroundColor: grey[100]
  },
  inputAdornment: {
    color: theme.palette.primary.dark
  }
}));

export default function SearchInputContainer() {
  const classes = useStyles();

  return (
    <Box className={classes.root} component={Paper} variant="outlined">
      <FormControl
        fullWidth
        aria-label="Search on Tweetoo.xyz"
        component="form"
        role="search"
      >
        <InputLabel htmlFor="search-input" color="secondary">
          Search on Tweetoo.xyz
        </InputLabel>
        <Input
          color="secondary"
          id="search-input"
          aria-describedby="search-helper-text"
          startAdornment={
            <InputAdornment position="start" className={classes.inputAdornment}>
              <SearchIcon />
            </InputAdornment>
          }
        />
        <FormHelperText id="search-helper-text" hidden>
          Discover on Tweetoo.xyz
        </FormHelperText>
      </FormControl>
    </Box>
  );
}
