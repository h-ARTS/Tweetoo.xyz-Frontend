import React from 'react';
// Mui Components
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Mui Theme
import { makeStyles } from '@material-ui/core/styles';
// Components
import Timeline from '../../common/ui/Timeline';
import Layout from '../../common/ui/Layout';
import TrendsHeading from './TrendsHeading';

const useStyles = makeStyles(theme => ({
  inline: {
    display: 'inline'
  },
  hashTag: {
    fontWeight: 600
  },
  rightAside: {
    position: 'sticky',
    top: 0,
    right: 0
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Layout>
      <Grid item xs={12} md={8}>
        <Timeline />
      </Grid>
      <Hidden smDown>
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
      </Hidden>
    </Layout>
  );
}
