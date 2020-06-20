import { combineReducers } from 'redux';

import ui from './ui.reducers';
import user from './user.reducers';
import tweets from './tweet.reducers';
import signup from './signup.reducers';
import notifications from './notifications.reducers';
import bookmarks from './bookmarks.reducers';
import searchEntries from './search.reducers';
import cached from './cached.reducers';

export default combineReducers({
  ui,
  user,
  tweets,
  notifications,
  bookmarks,
  searchEntries,
  cached,
  signup_form: signup
});
