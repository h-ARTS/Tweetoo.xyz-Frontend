import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
// Mui
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// Mui Styles
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
// Mui Icons
import LocationIcon from '@material-ui/icons/LocationOnTwoTone';
import CalendarIcon from '@material-ui/icons/CalendarTodayTwoTone';
// Components
import CoverImage from './CoverImage';
import PageTitle from '../../common/ui/PageTitle';
import ProfileImage from './ProfileImage';

const useStyles = makeStyles(theme => ({
  firstLayer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
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
  }
}));
export default function ProfileHomeContainer() {
  const classes = useStyles();
  const {
    handle,
    userImage,
    fullName,
    location,
    bio,
    createdAt,
    following,
    followers,
    tweets
  } = useSelector(state => state.currentUser);
  const date = dayjs(createdAt).format('MMMM YYYY');

  return (
    <>
      <PageTitle title={handle} />
      <Card variant="outlined" square>
        <CoverImage coverImagePath={''}>
          <ProfileImage userImage={userImage} />
        </CoverImage>
        <CardContent>
          <Box className={classes.firstLayer}>
            <Box className={classes.locationJoined}>
              <Box display="flex" alignItems="center">
                <LocationIcon />
                <Typography variant="subtitle2">{location}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <CalendarIcon />
                <Typography variant="subtitle2">Joined since {date}</Typography>
              </Box>
            </Box>
            <Button onClick={''} variant="outlined" color="secondary">
              Edit Profile
            </Button>
          </Box>
          <Box textAlign="center" my={1}>
            <Typography className={classes.fullName} variant="h5" component="p">
              {fullName}
            </Typography>
            <Typography className={classes.handle} variant="subtitle2">
              @{handle}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">{bio}</Typography>
          </Box>
          <Box mt={1} display="flex" justifyContent="space-around">
            <Box>
              <Typography>{following.length} Following</Typography>
            </Box>
            <Box>
              <Typography>{followers.length} Follower</Typography>
            </Box>
            <Box>
              <Typography>{tweets.length} Tweets</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
