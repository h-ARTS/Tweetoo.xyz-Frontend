import React from 'react';
import { Link } from '@reach/router';
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
import TweetsPanel from './TweetsPanel';
import EditDialog from './EditDialog';
import LikesPanel from './LikesPanel';
import Website from './Website';
import Joined from './Joined';
import Location from './Location';
import SkeletonCoverImage from '../../common/ui/skeletons/SkeletonCoverImage';
import SkeletonUserImage from '../../common/ui/skeletons/SkeletonUserImage';
import SkeletonFullnameHandleBio from '../../common/ui/skeletons/SkeletonFullnameHandleBio';
import SkeletonUserDetails from '../../common/ui/skeletons/SkeletonUserDetails';
import SkeletonCounting from '../../common/ui/skeletons/SkeletonCounting';
import MediaPanel from './MediaPanel';

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
    whiteSpace: 'pre-wrap',
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
export const ProfileHome = React.memo(function ProfileHome({
  user,
  loading,
  date,
  isNotCurrentUser,
  isFollowing,
  isFollowingYou,
  handleFollowUser,
  handleFollowingBtnTitle,
  followingTitle,
  toggleEditDialog,
  profile,
  handleTabChange,
  a11yProps,
  open
}) {
  const classes = useStyles();

  return (
    <>
      <PageTitle renderTitle={user.handle} backButton />
      <Card variant="outlined" square>
        {loading ? (
          <>
            <SkeletonCoverImage />
            <SkeletonUserImage />
          </>
        ) : (
          <CoverImage coverImage={user.coverImage}>
            <ProfileImage userImage={user.userImage} />
          </CoverImage>
        )}
        <CardContent className={classes.cardContent}>
          <Box className={classes.firstLayer}>
            <Box className={classes.locationJoined}>
              {loading ? (
                <SkeletonUserDetails />
              ) : (
                <>
                  {user.location && <Location location={user.location} />}
                  {user.date && <Joined date={date} />}
                  {user.website && <Website website={user.website} />}
                </>
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
          {loading ? (
            <SkeletonFullnameHandleBio />
          ) : (
            <>
              <Box textAlign="center" mb={1} mt={-3}>
                <Typography
                  className={classes.fullName}
                  variant="h5"
                  component="p"
                >
                  {user.fullName}
                </Typography>
                <Typography className={classes.handle} variant="subtitle2">
                  @{user.handle}
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
                <Typography variant="body2">{user.bio}</Typography>
              </Box>
            </>
          )}
          <Box mt={1} display="flex">
            <Box mr={1}>
              {loading ? (
                <SkeletonCounting />
              ) : (
                <Link to="following" className={classes.link}>
                  <Typography variant="body2">
                    <strong>{user.following.length}</strong> Following
                  </Typography>
                </Link>
              )}
            </Box>
            <Box mr={1}>
              {loading ? (
                <SkeletonCounting />
              ) : (
                <Link to="followers" className={classes.link}>
                  <Typography variant="body2">
                    <strong>{user.followers.length}</strong> Follower
                  </Typography>
                </Link>
              )}
            </Box>
            <Box>
              {loading ? (
                <SkeletonCounting />
              ) : (
                <Typography variant="body2">
                  <strong>{user.tweets.length}</strong> Tweets
                </Typography>
              )}
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
          userTweets={user.tweets}
        />
        <LikesPanel
          value={profile.tabValue}
          index={1}
          userTweets={user.tweets}
        />
        <MediaPanel
          value={profile.tabValue}
          index={2}
          handle={user.handle}
          userTweets={user.tweets}
        />
      </Card>
      <EditDialog openEditDialog={open} handleCloseEdit={toggleEditDialog} />
    </>
  );
});

export default ProfileHome;
