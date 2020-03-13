import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '& .MuiAutocomplete-option': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    }
  },
  listSubHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  subheader: {
    fontSize: '1.25rem',
    fontWeight: 700
  }
});

const SearchListBoxWrapper = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const { onClick } = props;
  const subheader = (
    <Box className={classes.listSubHeader} py={1} px={2}>
      <Typography className={classes.subheader}>Latest</Typography>
      <Button size="small" color="secondary" onClick={onClick}>
        Remove all
      </Button>
    </Box>
  );

  return (
    <List {...props} innerRef={ref} className={classes.root}>
      {subheader}
      {props.children}
    </List>
  );
});

export default SearchListBoxWrapper;
