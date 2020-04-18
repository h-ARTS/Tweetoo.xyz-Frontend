import { useState, useCallback } from 'react';
import { useLocation } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import { updateFollower } from '../../redux/actions/user.actions';

export const useFollow = tweetHandle => {
  const [followingTitle, setFollowingTitle] = useState('following');
  const { current, watching } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { pathname } = useLocation('/:userId');
  const isNotCurrentUser =
    pathname !== '/profile' &&
    pathname !== `/${current.handle}` &&
    tweetHandle !== current.handle;

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

  const handleFollowUser = () => {
    dispatch(updateFollower(watching.handle, !isFollowing()));
  };

  return {
    followingTitle,
    isFollowing,
    isFollowingYou,
    handleFollowUser,
    handleFollowingBtnTitle
  };
};