import { useState, useEffect } from 'react';

const useFakeFollowersApi = amount => {
  const [usersToFollow, setPotentialUserToFollow] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFakeUsers = async () => {
    const response = await fetch(
      `https://uinames.com/api/?amount=${amount}&ext`,
      {
        mode: 'cors'
      }
    );

    const potentialUsersToFollow = await response.json();
    setPotentialUserToFollow(potentialUsersToFollow);
    setLoading(false);
  };

  useEffect(() => {
    fetchFakeUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return [loading, usersToFollow];
};

export default useFakeFollowersApi;
