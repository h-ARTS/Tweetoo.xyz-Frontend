import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useMatch, useParams } from '@reach/router';
import useFetchUser from '../../common/hooks/react-query/useFetchUser';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_USER, PROFILE_TAB_CHANGE } from '../../redux/types';
// Mui Components
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
// Hooks
import useFollow from '../../common/hooks/useFollow';
import useA11yTabProps from '../../common/hooks/useA11yTabProps';
import ProfileHome from './ProfileHome';

export const ProfileHomeContainer = () => {
  const [open, setOpen] = useState(false);
  const loading = useSelector(state => state.ui.loading);
  const profile = useSelector(state => state.ui.profile);
  const { current } = useSelector(state => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  const a11yProps = useA11yTabProps('profile');
  const date = dayjs(current.createdAt).format('MMMM YYYY');
  const isNotCurrentUser =
    params.userId !== 'profile' && params.userId !== `${current.handle}`;
  const match = useMatch('/:userId');
  const { status, data, refetch } = useFetchUser(
    params.userId === 'profile' ? current.handle : params.userId
  );
  const {
    followingTitle,
    isFollowing,
    isFollowingYou,
    handleFollowUser,
    handleFollowingBtnTitle
  } = useFollow(status === 'success' && data.handle);

  useEffect(() => {
    refetch();
    window.scroll(0, 0);

    if (match && !profile.tabValue) {
      dispatch({ type: PROFILE_TAB_CHANGE, tabValue: 0 });
    }

    return () => {
      dispatch({ type: CLEAR_USER });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.userId]);

  const handleTabChange = (event, newValue) => {
    dispatch({ type: PROFILE_TAB_CHANGE, tabValue: newValue });
  };

  const toggleEditDialog = () => {
    setOpen(!open);
  };

  return status === 'loading' ? (
    <Box display="flex" alignItems="center" justifyContent="center">
      <CircularProgress />
    </Box>
  ) : (
    <ProfileHome
      a11yProps={a11yProps}
      date={date}
      open={open}
      user={data}
      loading={loading}
      profile={profile}
      isFollowing={isFollowing}
      isFollowingYou={isFollowingYou}
      isNotCurrentUser={isNotCurrentUser}
      followingTitle={followingTitle}
      toggleEditDialog={toggleEditDialog}
      handleTabChange={handleTabChange}
      handleFollowUser={handleFollowUser}
      handleFollowingBtnTitle={handleFollowingBtnTitle}
    />
  );
};

export default ProfileHomeContainer;
