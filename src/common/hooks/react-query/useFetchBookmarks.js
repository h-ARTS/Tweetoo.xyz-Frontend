import axios from 'axios';
import { useQuery } from 'react-query';

export default function useFetchBookmarks() {
  async function fetchBookmarks() {
    const bookmarks = await axios.get('/api/bookmarks');

    return bookmarks.data.map(bookmark => {
      return { _id: bookmark.tweetId, createdBy: bookmark.userId };
    });
  }

  const { status, data, error } = useQuery('bookmarks', fetchBookmarks);

  return [status, data, error];
}
