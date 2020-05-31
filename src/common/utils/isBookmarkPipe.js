import axios from 'axios';

export default async function isBookmarkPipe(data) {
  const response = await axios.get('/api/bookmarks');

  const results = data.map(function(doc) {
    doc.isBookmark = false;
    this.forEach(bookmarked => {
      if (bookmarked.tweetId === doc._id) {
        doc.isBookmark = true;
      }
    });
    return doc;
  }, response.data);

  return results;
}
