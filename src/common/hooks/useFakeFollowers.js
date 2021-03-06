import { useState, useEffect } from 'react';

const useFakeFollowersApi = amount => {
  const [usersToFollow, setPotentialUserToFollow] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFakeUsers = async () => {
    const response = await fetch(
      `https://randomuser.me/api/?results=${amount}`,
      {
        mode: 'cors'
      }
    );

    const potentialUsersToFollow = await response.json();
    setPotentialUserToFollow(potentialUsersToFollow.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchFakeUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return [loading, usersToFollow];
};

export default useFakeFollowersApi;
