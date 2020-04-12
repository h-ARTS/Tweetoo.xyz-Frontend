import React from 'react';
import ProfileTabPanel from './ProfileTabPanel';
import Tweet from '../home/Tweet';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function LikesPanel({ value, index, liked }) {
  if (!liked) {
    return (
      <ProfileTabPanel value={value} index={index}>
        <Box p={1}>
          <Typography>
            So far you have no liked tweets. Start discovering Tweetoo!
          </Typography>
        </Box>
      </ProfileTabPanel>
    );
  } else {
    return (
      <ProfileTabPanel value={value} index={index}>
        {liked.map(tweet => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </ProfileTabPanel>
    );
  }
}
