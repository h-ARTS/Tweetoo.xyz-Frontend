import React, { useState, useEffect } from 'react';
import { useNavigate } from '@reach/router';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteTweet } from '../../redux/actions/tweet.actions';
// Mui Components
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
// Mui Theme
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
// Mui Icons
import BlockIcon from '@material-ui/icons/BlockTwoTone';
import DeleteIcon from '@material-ui/icons/DeleteForeverTwoTone';
import PersonAddIcon from '@material-ui/icons/PersonAddTwoTone';
// Components
import TweetSubheader from './TweetSubheader';
import MoreButton from './MoreButton';
import TweetAction from './TweetAction';
import TweetTitle from './TweetTitle';
import TweetText from './TweetText';
import WithLinkTransformation from './WithLinkTransformation';
import GenericPopover from '../../common/ui/GenericPopover';

const useStyles = makeStyles(theme => ({
  timeline: {},
  root: {
    '&:not(:last-child)': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    }
  },
  cardActionArea: {
    userSelect: 'auto'
  },
  cardHeader: {
    padding: '16px 16px 0'
  },
  cardContent: {
    paddingTop: 0
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    margin: '0 16px',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: 10
  },
  avatar: {
    backgroundColor: red[500]
  },
  actions: {
    justifyContent: 'space-around'
  }
}));

const TweetTextContainer = WithLinkTransformation(TweetText);

export default function Tweet(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [listItems, setListItem] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);
  const {
    _id,
    handle,
    fullName,
    fullText,
    image,
    replies,
    retweet,
    retweetCount,
    likeCount,
    createdAt,
    createdBy
  } = props.tweet;
  const replyCount = replies.length;

  useEffect(() => {
    if (currentUser.handle === handle) {
      setListItem([
        ...listItems,
        {
          title: 'Delete Tweet',
          divider: false,
          callback: handleDeleteTweet,
          icon: DeleteIcon,
          iconColor: theme.palette.error.main,
          textColor: 'error'
        }
      ]);
    } else {
      setListItem([
        {
          title: `Follow @${handle}`,
          divider: true,
          icon: PersonAddIcon
        },
        {
          title: `Block @${handle}`,
          divider: true,
          icon: BlockIcon,
          iconColor: theme.palette.error.main,
          textColor: 'error'
        }
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavigateToUser = () => {
    navigate(`/${handle}`);
  };

  const navigateToTweet = event => {
    event.stopPropagation();
    navigate(`/${handle}/tweet/${_id}`);
  };

  const handleStopPropagation = event => {
    event.stopPropagation();
  };

  const handleMore = event => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleDeleteTweet = () => {
    dispatch(deleteTweet(_id));
  };

  const popoverProps = {
    id: Boolean(anchorEl) ? 'more-popover' : undefined,
    open: Boolean(anchorEl),
    anchorEl,
    onClose: handleClose,
    items: listItems
  };

  return (
    <>
      <Card className={classes.root} component="div" square varaint="outlined">
        <CardActionArea
          component="article"
          role="article"
          data-focusable="true"
          tabIndex="0"
          onClick={navigateToTweet}
          className={classes.cardActionArea}
          disableRipple
        >
          {retweet && <TweetSubheader handle={handle} />}
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar aria-label="profile" className={classes.avatar}>
                P
              </Avatar>
            }
            title={
              <TweetTitle
                handle={handle}
                fullName={fullName}
                time={createdAt}
                handleStopPropagation={handleStopPropagation}
                onClick={handleNavigateToUser}
              />
            }
            action={<MoreButton onClick={handleMore} />}
          />
          <TweetTextContainer
            className={classes.cardContent}
            fullText={fullText}
          />
          {image && (
            <CardMedia title="Random" image={image} className={classes.media} />
          )}
        </CardActionArea>
        <CardActions className={classes.actions}>
          <TweetAction actionType="reply" count={replyCount} />
          <TweetAction actionType="retweet" count={retweetCount} />
          <TweetAction actionType="like" count={likeCount} />
          <TweetAction actionType="bookmark" />
        </CardActions>
      </Card>
      <GenericPopover {...popoverProps} />
    </>
  );
}
