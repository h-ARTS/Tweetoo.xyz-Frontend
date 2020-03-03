// MUI Icons
import HomeIcon from '@material-ui/icons/HomeTwoTone';
import PublicIcon from '@material-ui/icons/PublicTwoTone';
import BellIcon from '@material-ui/icons/NotificationsTwoTone';
import BookmarksIcon from '@material-ui/icons/BookmarksTwoTone';
import ProfileIcon from '@material-ui/icons/AccountCircleTwoTone';

export default [
  {
    to: '/home',
    title: 'Home',
    icon: HomeIcon
  },
  {
    to: '/trending',
    title: 'Trending',
    icon: PublicIcon
  },
  {
    to: '/notifications',
    title: 'Notifications',
    icon: BellIcon
  },
  {
    to: '/bookmarks',
    title: 'Bookmarks',
    icon: BookmarksIcon
  },
  {
    to: '/profile',
    title: 'Profile',
    icon: ProfileIcon
  }
];
