import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from '@reach/router';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getUser, updateFollower } from '../../redux/actions/user.actions';
import { CLEAR_USER } from '../../redux/types';
import dayjs from 'dayjs';
// Mui
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
// Mui Styles
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
// Components
import CoverImage from './CoverImage';
import PageTitle from '../../common/ui/PageTitle';
import ProfileImage from './ProfileImage';
import ProfileTabPanel from './ProfileTabPanel';
import TweetsPanel from './TweetsPanel';
import EditDialog from './EditDialog';
import LikesPanel from './LikesPanel';
import Website from './Website';
import Joined from './Joined';
import Location from './Location';

const useStyles = makeStyles(theme => ({
  firstLayer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '96px'
  },
  followButton: {
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.error.main,
      borderColor: theme.palette.error.main
    }
  },
  locationJoined: {
    color: grey[600],
    '& .MuiSvgIcon-root': {
      paddingRight: theme.spacing(1)
    }
  },
  fullName: {
    fontWeight: 700
  },
  handle: {
    color: grey[600]
  },
  followingChip: {
    marginLeft: theme.spacing(1),
    height: 20,
    fontSize: '0.65rem'
  },
  tabs: {
    borderBottom: '1px solid rgba(0,0,0,0.12)'
  },
  cardContent: {
    paddingBottom: theme.spacing(1)
  }
}));
export const ProfileHomeContainer = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [followingTitle, setFollowingTitle] = useState('following');
  const location = useLocation();
  const dispatch = useDispatch();
  const { current, watching } = useSelector(state => state.user);
  const date = dayjs(current.createdAt).format('MMMM YYYY');
  const isNotCurrentUser =
    location.pathname !== '/profile' &&
    location.pathname !== `/${current.handle}`;

  useEffect(() => {
    if (isNotCurrentUser) {
      dispatch(getUser(location.pathname.substring(1)));
    }

    return () => {
      dispatch({ type: CLEAR_USER });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const a11yProps = index => {
    return {
      id: `profile-tab-${index}`,
      'aria-controls': `profile-tabpanel-${index}`
    };
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleEditDialog = () => {
    setOpen(!open);
  };

  const userPropFactory = prop => {
    return isNotCurrentUser ? watching[prop] : current[prop];
  };

  const isFollowing = useCallback(() => {
    if (isNotCurrentUser) {
      const found = current.following.find(f => {
        return f.userId === watching._id;
      });
      return Boolean(found);
    }
  }, [current.following, isNotCurrentUser, watching._id]);

  const isFollowingYou = useCallback(() => {
    if (isNotCurrentUser) {
      const found = current.followers.find(f => {
        return f.userId === watching._id;
      });
      return Boolean(found);
    }
  }, [current.followers, isNotCurrentUser, watching._id]);

  const handleFollowingBtnTitle = useCallback(() => {
    if (followingTitle === 'following') {
      setFollowingTitle('unfollow');
    } else {
      setFollowingTitle('following');
    }
  }, [followingTitle]);

  const unfollowUser = () => {
    dispatch(updateFollower(watching.handle));
  };

  const followUser = () => {
    dispatch(updateFollower(watching.handle, true));
  };

  return (
    <>
      <PageTitle title={userPropFactory('handle')} />
      <Card variant="outlined" square>
        <CoverImage coverImage={userPropFactory('coverImage')}>
          <ProfileImage userImage={userPropFactory('userImage')} />
        </CoverImage>
        <CardContent className={classes.cardContent}>
          <Box className={classes.firstLayer}>
            <Box className={classes.locationJoined}>
              {userPropFactory('location') && (
                <Location location={userPropFactory('location')} />
              )}
              <Joined date={date} />
              {userPropFactory('website') && (
                <Website website={userPropFactory('website')} />
              )}
            </Box>
            {isNotCurrentUser ? (
              <Box>
                {isFollowing() ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    disableElevation
                    className={classes.followButton}
                    onClick={unfollowUser}
                    onMouseEnter={handleFollowingBtnTitle}
                    onMouseLeave={handleFollowingBtnTitle}
                  >
                    {followingTitle}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={followUser}
                  >
                    Follow
                  </Button>
                )}
              </Box>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={toggleEditDialog}
              >
                Edit Profile
              </Button>
            )}
          </Box>
          <Box textAlign="center" mb={1} mt={-3}>
            <Typography className={classes.fullName} variant="h5" component="p">
              {userPropFactory('fullName')}
            </Typography>
            <Typography className={classes.handle} variant="subtitle2">
              @{userPropFactory('handle')}
              {isFollowingYou() && (
                <Chip
                  size="small"
                  label="Following you"
                  className={classes.followingChip}
                />
              )}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">{userPropFactory('bio')}</Typography>
          </Box>
          <Box mt={1} display="flex">
            <Box mr={1}>
              <Typography variant="body2">
                <strong>{userPropFactory('following').length}</strong> Following
              </Typography>
            </Box>
            <Box mr={1}>
              <Typography variant="body2">
                <strong>{userPropFactory('followers').length}</strong> Follower
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">
                <strong>{userPropFactory('tweets').length}</strong> Tweets
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleTabChange}
          aria-label="profile tabs"
          className={classes.tabs}
        >
          <Tab label="Tweets" {...a11yProps(0)} />
          <Tab label="Likes" {...a11yProps(1)} />
          <Tab label="Media" {...a11yProps(2)} />
        </Tabs>
        <TweetsPanel
          value={value}
          index={0}
          userTweets={userPropFactory('tweets')}
        />
        <LikesPanel value={value} index={1} />
        <ProfileTabPanel value={value} index={2}>
          Media
        </ProfileTabPanel>
      </Card>
      <EditDialog openEditDialog={open} handleCloseEdit={toggleEditDialog} />
    </>
  );
};

export default ProfileHomeContainer;
