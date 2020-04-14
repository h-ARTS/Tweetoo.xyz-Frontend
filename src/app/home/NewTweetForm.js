import React, { useState } from 'react';
import { Link } from '@reach/router';
// Mui Components
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
// Mui Icons
import CreateIcon from '@material-ui/icons/CreateTwoTone';
// Mui Styles
import { deepPurple } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
// Components
import NewTweetActions from './NewTweetActions';
import { useSelector, useDispatch } from 'react-redux';
import { postTweet } from '../../redux/actions/tweet.actions';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: deepPurple[700]
  },
  formControl: {
    width: '100%',
    marginLeft: theme.spacing(1)
  },
  inputAdornment: {
    color: theme.palette.primary.dark
  },
  tweetButton: {
    marginTop: '5px'
  }
}));
export default function NewTweetForm({ user }) {
  const classes = useStyles();
  const [tweetText, setTweetText] = useState('');
  const dispatch = useDispatch();
  const { userImage } = useSelector(state => state.user.current);

  const handleTweetText = event => {
    setTweetText(event.target.value);
  };

  const submitTweet = event => {
    dispatch(postTweet({ fullText: tweetText }));
    setTweetText('');
  };

  return (
    <Box display="flex" pl={2} pr={2} pt={2} pb={1} alignItems="stretch">
      <Link to={`/${user.handle}`}>
        <Avatar
          className={classes.avatar}
          src={`http://localhost:6500/${userImage.url}`}
          children={userImage.url ? null : 'PH'}
        />
      </Link>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="new-tweet" color="secondary">
          What are you thinking?
        </InputLabel>
        <Input
          multiline
          id="new-tweet"
          aria-describedby="new-tweet"
          color="secondary"
          fullWidth
          value={tweetText}
          onChange={handleTweetText}
          startAdornment={
            <InputAdornment position="start" className={classes.inputAdornment}>
              <CreateIcon />
            </InputAdornment>
          }
        />
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
        >
          <NewTweetActions />
          <Button
            className={classes.tweetButton}
            variant="contained"
            color="secondary"
            onClick={submitTweet}
            disableElevation
          >
            Tweet!
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
}
