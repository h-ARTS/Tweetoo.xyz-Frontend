import React, { useState, useEffect } from 'react';
// MUI Components
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
// MUI Icons
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/SearchTwoTone';
// MUI Lab
import Autocomplete from '@material-ui/lab/Autocomplete';
// MUI Styles
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
// Components
import SearchListBoxWrapper from './SearchListBoxWrapper';
import { CircularProgress } from '@material-ui/core';

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
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  listItemLeft: {
    display: 'flex',
    alignItems: 'center'
  },
  listItemText: {
    marginLeft: theme.spacing(2)
  }
}));

const lastSearched = [
  { full_name: 'Alif Mirza', tag: 'AM' },
  { full_name: 'John Doe', tag: 'JD' },
  { full_name: 'Tom Cat', tag: 'TC' },
  { full_name: 'Andrew Anderson', tag: 'AA' },
  { full_name: 'Burak Ozan', tag: 'BO' },
  { full_name: 'Muhammad Irfan', tag: 'MI' }
];

export default function SearchInputContainer() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    setTimeout(() => {
      if (active) {
        setOptions(lastSearched);
      }
    }, 1000);

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleDelete = e => {
    e.stopPropagation();
  };

  const renderListBoxComponent = React.forwardRef((props, ref) => (
    <SearchListBoxWrapper {...props} ref={ref} onClick={handleDelete} />
  ));

  const renderLastResultOptions = params => (
    <Box className={classes.listItem}>
      <Box className={classes.listItemLeft}>
        <Avatar alt={params.full_name}>{params.tag}</Avatar>
        <Typography className={classes.listItemText} variant="body1">
          {params.full_name}
        </Typography>
      </Box>
      <Box>
        <IconButton
          aria-label="delete"
          size="small"
          color="secondary"
          onClick={handleDelete}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box className={classes.root}>
      <FormControl
        fullWidth
        aria-label="Search on Tweetoo.xyz"
        component="form"
        role="search"
      >
        <Autocomplete
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          loading={loading}
          options={options}
          getOptionLabel={option => option.full_name}
          ListboxComponent={renderListBoxComponent}
          renderOption={renderLastResultOptions}
          renderInput={params => (
            <>
              <InputLabel
                htmlFor="search-input"
                color="secondary"
                {...params.InputLabelProps}
              >
                Search on Tweetoo.xyz
              </InputLabel>
              <Input
                fullWidth
                color="secondary"
                id="search-input"
                aria-describedby="search-helper-text"
                inputProps={params.inputProps}
                ref={params.InputProps.ref}
                startAdornment={
                  <InputAdornment
                    position="start"
                    className={classes.inputAdornment}
                  >
                    <SearchIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="secondary" size={20} />
                    ) : null}
                  </React.Fragment>
                }
              />
              <FormHelperText id="search-helper-text" hidden>
                Discover on Tweetoo.xyz
              </FormHelperText>
            </>
          )}
        />
      </FormControl>
    </Box>
  );
}
