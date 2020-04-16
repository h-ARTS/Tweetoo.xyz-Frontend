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
    }
  },
  ui: {
    profile: {
      tabValue: 0
    },
    replyDialog: false,
    loading: false
  },
  tweets: [],
  replies: []
};
