import React from 'react';
// MUI
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Ui components
import TrendsHeading from '../home/TrendsHeading';
// Mui Styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  hashTag: {
    fontWeight: 600
  },
  paperRoot: {
    borderRadius: 0
  }
});

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
  const classes = useStyles();
  return (
    <Box className="trendsList">
      <List
        className={classes.paperRoot}
        component={Paper}
        variant="outlined"
        disablePadding
        subheader={<TrendsHeading />}
      >
        {trends.map(trend => (
          <ListItem divider dense key={trend.number}>
            <ListItemText
              primary={
                <>
                  <Typography variant="caption">{`${trend.number}. Trend`}</Typography>
                  <Typography variant="body1" className={classes.hashTag}>
                    {trend.trend_title}
                  </Typography>
                </>
              }
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {trend.tweet_count} Tweets
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
