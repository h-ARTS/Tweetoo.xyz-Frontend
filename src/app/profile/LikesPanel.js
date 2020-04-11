import React from 'react';
import { useSelector } from 'react-redux';
import ProfileTabPanel from './ProfileTabPanel';
import Tweet from '../home/Tweet';

export default function LikesPanel({ value, index }) {
  const { liked } = useSelector(state => state.currentUser);

  return (
    <ProfileTabPanel value={value} index={index}>
      {liked.map(filteredTweet => (
        <Tweet key={filteredTweet._id} tweet={filteredTweet} />
      ))}
    </ProfileTabPanel>
  );
}
