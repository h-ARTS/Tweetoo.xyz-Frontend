import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useLocation, useMatch, Link } from '@reach/router';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions/user.actions';
import { CLEAR_USER, PROFILE_TAB_CHANGE } from '../../redux/types';
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
import { useFollow } from '../../common/hooks/useFollow';
import useA11yTabProps from '../../common/hooks/useA11yTabProps';
import SkeletonCoverImage from '../../common/ui/skeletons/SkeletonCoverImage';
import SkeletonUserImage from '../../common/ui/skeletons/SkeletonUserImage';

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
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));
export const ProfileHomeContainer = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {
    followingTitle,
    isFollowing,
    isFollowingYou,
    handleFollowUser,
    handleFollowingBtnTitle
  } = useFollow();
  const location = useLocation();
  const dispatch = useDispatch();
  const a11yProps = useA11yTabProps('profile');
  const { profile, loading } = useSelector(state => state.ui);
  const { current, watching } = useSelector(state => state.user);
  const date = dayjs(current.createdAt).format('MMMM YYYY');
  const isNotCurrentUser =
    location.pathname !== '/profile' &&
    location.pathname !== `/${current.handle}`;
  const match = useMatch('/:userId');

  useEffect(() => {
    if (isNotCurrentUser) {
      dispatch(getUser(location.pathname.substring(1)));
    }

    if (match && !profile.tabValue) {
      dispatch({ type: PROFILE_TAB_CHANGE, tabValue: 0 });
    }

    return () => {
      dispatch({ type: CLEAR_USER });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleTabChange = (event, newValue) => {
    dispatch({ type: PROFILE_TAB_CHANGE, tabValue: newValue });
  };

  const toggleEditDialog = () => {
    setOpen(!open);
  };

  const userPropFactory = prop => {
    return isNotCurrentUser ? watching[prop] : current[prop];
  };

  return (
    <>
      <PageTitle renderTitle={userPropFactory('handle')} backButton />
      <Card variant="outlined" square>
        {loading ? (
          <>
            <SkeletonCoverImage />
            <SkeletonUserImage />
          </>
        ) : (
          <CoverImage coverImage={userPropFactory('coverImage')}>
            <ProfileImage userImage={userPropFactory('userImage')} />
          </CoverImage>
        )}
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
                    onClick={handleFollowUser}
                    onMouseEnter={handleFollowingBtnTitle}
                    onMouseLeave={handleFollowingBtnTitle}
                  >
                    {followingTitle}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleFollowUser}
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
              <Link to="following" className={classes.link}>
                <Typography variant="body2">
                  <strong>{userPropFactory('following').length}</strong>{' '}
                  Following
                </Typography>
              </Link>
            </Box>
            <Box mr={1}>
              <Link to="followers" className={classes.link}>
                <Typography variant="body2">
                  <strong>{userPropFactory('followers').length}</strong>{' '}
                  Follower
                </Typography>
              </Link>
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
          value={profile.tabValue}
          onChange={handleTabChange}
          aria-label="profile tabs"
          className={classes.tabs}
        >
          <Tab label="Tweets" {...a11yProps(0)} />
          <Tab label="Likes" {...a11yProps(1)} />
          <Tab label="Media" {...a11yProps(2)} />
        </Tabs>
        <TweetsPanel
          value={profile.tabValue}
          index={0}
          userTweets={userPropFactory('tweets')}
        />
        <LikesPanel value={profile.tabValue} index={1} />
        <ProfileTabPanel value={profile.tabValue} index={2}>
          Media
        </ProfileTabPanel>
      </Card>
      <EditDialog openEditDialog={open} handleCloseEdit={toggleEditDialog} />
    </>
  );
};

export default ProfileHomeContainer;
