import React, { useState, useEffect } from 'react';

const useFakeFollowersApi = amount => {
  const [usersToFollow, setPotentialUserToFollow] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchFakeUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return [loading, usersToFollow];
};

export default useFakeFollowersApi;
