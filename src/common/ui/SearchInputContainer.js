import React, { useState, useEffect } from 'react';
import { navigate, useLocation } from '@reach/router';
import { v1 as uuid } from 'uuid';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { searchQuery } from '../../redux/actions/data.actions';
// MUI Components
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
// MUI Styles
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
// Components
import SearchListBoxWrapper from './SearchListBoxWrapper';
import SearchInput from './SearchInput';
// import useStorage from '../hooks/useStorage';
import useDebounce from '../hooks/useDebounce';
import LastResultOption from './LastResultOption';

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
  }
}));

export default function SearchInputContainer(props) {
  const classes = useStyles();
  // const { setItem, removeAll, removeOne, getItem } = useStorage('lastSearched');
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const loading = open && options.length === 0;
  const dispatch = useDispatch();
  const users = useSelector(state => state.searchEntries.users);
  const debouncedDispatch = useDebounce(dispatch, 250);
  const location = useLocation();

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (localStorage.getItem('lastResults')) {
      const pastResults = localStorage.getItem('lastResults');

      if (active) {
        setOptions(JSON.parse(pastResults));
      }
    }

    return () => {
      active = false;
    };
  }, [loading, open]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    if (searchTerm !== '') debouncedDispatch(searchQuery(searchTerm));
  }, [debouncedDispatch, searchTerm]);

  useEffect(() => {
    setOptions(users);
  }, [users]);

  const handleSearch = e => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const submitSearchTerm = e => {
    e.preventDefault();
    localStorage.setItem(
      'lastResults',
      JSON.stringify([
        {
          id: uuid(),
          fullName: searchTerm,
          handle: '',
          userImage: {
            url: ''
          }
        }
      ])
    );

    if (location.pathname.includes('search?q=')) {
      dispatch(searchQuery(searchTerm));
      return;
    }

    navigate(`/discover/search?q=${searchTerm}`);
  };

  const handleOptionClick = params => {
    if (location.pathname.includes('search?q=')) {
      dispatch(searchQuery(searchTerm));
    }

    if (!localStorage.getItem('lastResults')) {
      const stringifiedResult = JSON.stringify([
        {
          id: uuid(),
          fullName: params.fullName,
          handle: params.handle,
          userImage: {
            url: params.userImage.url
          }
        }
      ]);
      localStorage.setItem('lastResults', stringifiedResult);
      return;
    } else {
      const pastResults = JSON.parse(localStorage.getItem('lastResults'));
      if (pastResults.find(item => item.fullName === params.fullName)) return;
      pastResults.push({
        id: uuid(),
        fullName: params.fullName,
        handle: params.handle,
        userImage: {
          url: params.userImage.url
        }
      });
      localStorage.setItem('lastResults', JSON.stringify(pastResults));
      return;
    }
  };

  const handleDelete = (e, params) => {
    e.stopPropagation();
    const pastResults = localStorage.getItem('lastResults');
    const filtered = JSON.parse(pastResults).filter(
      item => item.id !== params.id
    );
    localStorage.setItem('lastResults', JSON.stringify(filtered));
  };

  const removeAllLatestResults = e => {
    e.stopPropagation();
    localStorage.removeItem('lastResults');
    setOptions([]);
  };

  const renderListBoxComponent = React.forwardRef((props, ref) => (
    <SearchListBoxWrapper
      {...props}
      ref={ref}
      onClick={removeAllLatestResults}
    />
  ));

  const renderInput = params => (
    <SearchInput
      value={searchTerm}
      InputLabelProps={params.InputLabelProps}
      inputProps={params.inputProps}
      inputRef={params.InputProps.ref}
      loading={loading}
      onKeyUp={handleSearch}
    />
  );

  const renderOption = params => (
    <LastResultOption
      params={params}
      onRemove={handleDelete}
      onClick={handleOptionClick}
      navigate={navigate}
    />
  );

  const getOptionLabel = option => option.fullName;

  const openAutoComplete = () => setOpen(true);

  const closeAutoComplete = () => setOpen(false);

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
        onSubmit={submitSearchTerm}
      >
        <Autocomplete
          open={open}
          onOpen={openAutoComplete}
          onClose={closeAutoComplete}
          loading={loading}
          options={options}
          getOptionLabel={getOptionLabel}
          ListboxComponent={renderListBoxComponent}
          renderOption={renderOption}
          renderInput={renderInput}
        />
      </FormControl>
    </Box>
  );
}
