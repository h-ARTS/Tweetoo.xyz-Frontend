import React, { useState, useEffect } from 'react';

const useFakeFollowersApi = amount => {
  const [potentialFollow, setPotentialFollow] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFakeUsers = async () => {
      const response = await fetch(
        `https://uinames.com/api/?amount=${amount}&ext`,
        {
          mode: 'cors'
        }
      );

      const potentialFollowers = await response.json();
      setPotentialFollow(potentialFollowers);
      setLoading(false);
    };

    fetchFakeUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return [loading, potentialFollow];
};

export default useFakeFollowersApi;
