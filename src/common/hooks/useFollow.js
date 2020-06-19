import { useState, useCallback } from 'react';
import { useParams } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import { updateFollower } from '../../redux/actions/user.actions';

export const useFollow = userHandle => {
  const [followingTitle, setFollowingTitle] = useState('following');
  const current = useSelector(state => state.user.current);
  const dispatch = useDispatch();
  const params = useParams();
  const isNotCurrentUser =
    params.userId !== 'profile' && params.userId !== current.handle;

  const isFollowing = useCallback(() => {
    if (isNotCurrentUser) {
      const found = current.following.find(handle => {
        return handle === userHandle;
      });
      return Boolean(found);
    }
  }, [current.following, isNotCurrentUser, userHandle]);

  const isFollowingYou = useCallback(() => {
    if (isNotCurrentUser) {
      const found = current.followers.find(handle => {
        return handle === userHandle;
      });
      return Boolean(found);
    }
  }, [current.followers, isNotCurrentUser, userHandle]);

  const handleFollowingBtnTitle = useCallback(() => {
    if (followingTitle === 'following') {
      setFollowingTitle('unfollow');
    } else {
      setFollowingTitle('following');
    }
  }, [followingTitle]);

  const handleFollowUser = () => {
    dispatch(updateFollower(userHandle, !isFollowing()));
  };

  return {
    followingTitle,
    isFollowing,
    isFollowingYou,
    handleFollowUser,
    handleFollowingBtnTitle
  };
};

export default useFollow;
