import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useLocation, useMatch } from '@reach/router';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions/user.actions';
import { CLEAR_USER, PROFILE_TAB_CHANGE } from '../../redux/types';
// Hooks
import useFollow from '../../common/hooks/useFollow';
import useA11yTabProps from '../../common/hooks/useA11yTabProps';
import ProfileHome from './ProfileHome';

export const ProfileHomeContainer = () => {
  const [open, setOpen] = useState(false);
  const loading = useSelector(state => state.ui.loading);
  const profile = useSelector(state => state.ui.profile);
  const { current, watching } = useSelector(state => state.user);
  const {
    followingTitle,
    isFollowing,
    isFollowingYou,
    handleFollowUser,
    handleFollowingBtnTitle
  } = useFollow(watching.handle);
  const location = useLocation();
  const dispatch = useDispatch();
  const a11yProps = useA11yTabProps('profile');
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
    <ProfileHome
      a11yProps={a11yProps}
      date={date}
      open={open}
      userPropFactory={userPropFactory}
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
