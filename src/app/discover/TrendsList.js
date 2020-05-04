import React from 'react';
import { useNavigate } from '@reach/router';
// MUI
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
// Ui components
import CustomListSubheader from '../../common/ui/CustomListSubheader';
import TrendListItem from './TrendListItem';

const trends = [
  {
    trend_title: '#CoronaOutbreak',
    tweet_count: 200800,
    number: 1
  },
  {
    trend_title: '#TuesdayThoughts',
    tweet_count: 38600,
    number: 2
  },
  {
    trend_title: '#Network4GServiceNoG',
    tweet_count: 14500,
    number: 3
  },
  {
    trend_title: '#BanJangGeoMirBlackmailer',
    tweet_count: 7760,
    number: 4
  }
];

export default function TrendsList() {
  const navigate = useNavigate();

  const handleNavigate = trend_title => {
    navigate(`/?search=${trend_title}`);
  };

  return (
    <Box className="trendsList">
      <List
        component={Paper}
        subheader={<CustomListSubheader title="Trends: Pakistan" divider />}
        variant="outlined"
        square
        disablePadding
      >
        {trends.map(trend => (
          <TrendListItem
            key={trend.trend_title}
            trend={trend}
            divider={trends[trends.length - 1] !== trend}
            handleNavigate={handleNavigate}
          />
        ))}
      </List>
    </Box>
  );
}
