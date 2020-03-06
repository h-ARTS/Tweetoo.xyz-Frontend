import React from 'react';
// Mui Components
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Ui components
import TrendsHeading from '../../app/home/TrendsHeading';
// Mui styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  hashTag: {
    fontWeight: 600
  },
  rightAside: {
    position: 'sticky',
    top: 0,
    right: 0
  }
});

export default function RightBar() {
  const classes = useStyles();

  return (
    <Grid item md={4}>
      <aside className={classes.rightAside}>
        <div className="searchField"></div>
        <div className="trendsList">
          <List
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
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
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
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    14'500 Tweets
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </div>
      </aside>
    </Grid>
  );
}
