import { useState, useCallback } from 'react';
import { useMatch } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import { updateFollower } from '../../redux/actions/user.actions';

export const useFollow = () => {
  const [followingTitle, setFollowingTitle] = useState('following');
  const { current, watching } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { userId } = useMatch('/:userId');
  const isNotCurrentUser = userId !== 'profile' && userId !== current.handle;

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
