export default {
  user: {
    current: {
      authenticated: false,
      tweets: [],
      following: [],
      followers: [],
      userImage: {
        url: ''
      },
      coverImage: {
        url: ''
      }
    },
    watching: {
      tweets: [],
      following: [],
      followers: [],
      userImage: {
        url: ''
      },
      coverImage: {
        url: ''
      }
    },
    followers: [],
    following: []
  },
  ui: {
    profile: {
      tabValue: 0
    },
    replyDialog: false,
    loading: false,
    loadingReplies: false,
    loadingUsers: false
  },
  tweets: [],
  replies: [],
  bookmarks: [],
  notifications: [],
  searchEntries: {
    users: [],
    tweets: []
  }
};
