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
        <ListItem divider dense>
          <ListItemText
            primary={
              <>
                <Typography variant="caption">1. Trend</Typography>
                <Typography variant="body1" className={classes.hashTag}>
                  #TuesdayThoughts
                </Typography>
              </>
            }
            secondary={
              <Typography component="span" variant="body2" color="textPrimary">
                36'800 Tweets
              </Typography>
            }
          />
        </ListItem>
        <ListItem dense>
          <ListItemText
            primary={
              <>
                <Typography variant="caption">2. Trend</Typography>
                <Typography variant="body1" className={classes.hashTag}>
                  #Network4GServiceNoG
                </Typography>
              </>
            }
            secondary={
              <Typography component="span" variant="body2" color="textPrimary">
                14'500 Tweets
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
  );
}
