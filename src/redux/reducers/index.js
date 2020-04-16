import { combineReducers } from 'redux';

import ui from './ui.reducers';
import user from './user.reducers';
import tweets from './tweet.reducers';
import replies from './reply.reducers';
import signup from './signup.reducers';

export default combineReducers({
  ui,
  user,
  tweets,
  replies,
  signup_form: signup
});
