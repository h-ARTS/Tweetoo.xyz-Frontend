import React, { useState, useEffect } from 'react';
// MUI Components
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// MUI Icons
import CloseIcon from '@material-ui/icons/Close';
// MUI Lab
import Autocomplete from '@material-ui/lab/Autocomplete';
// MUI Styles
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
// Components
import SearchListBoxWrapper from './SearchListBoxWrapper';
import SearchInput from './SearchInput';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    borderRadius: 0,
    borderTop: 0,
    borderBottom: 0,
    backgroundColor: grey[100]
  },
  root2: {
    padding: theme.spacing(2),
    marginBottom: '8px',
    backgroundColor: 'white'
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

localStorage.setItem('last_searched', JSON.stringify(lastSearched));

export default function SearchInputContainer(props) {
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
      const result = localStorage.getItem('last_searched');

      if (active) {
        setOptions(JSON.parse(result));
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
    <Box
      className={props.variant === 2 ? classes.root2 : classes.root}
      component={Paper}
      variant="outlined"
    >
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
            <SearchInput
              InputLabelProps={params.InputLabelProps}
              inputProps={params.inputProps}
              inputRef={params.InputProps.ref}
              loading={loading}
            />
          )}
        />
      </FormControl>
    </Box>
  );
}
