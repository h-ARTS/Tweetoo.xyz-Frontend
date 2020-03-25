import { combineReducers } from 'redux';

import ui from './ui.reducers';
import user from './user.reducers';
import tweets from './tweet.reducers';

export default combineReducers({
  ui,
  currentUser: user,
  tweets
});
