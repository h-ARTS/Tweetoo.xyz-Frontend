import axios from 'axios';

export default async function isLikedPipe(data) {
  const response = await axios.get('/api/tweet/liked');

  const results = data.map(function(doc) {
    doc.isLiked = false;
    this.forEach(liked => {
      if (liked._id === doc._id) {
        doc.isLiked = true;
      }
    });
    return doc;
  }, response.data);

  return results;
}
