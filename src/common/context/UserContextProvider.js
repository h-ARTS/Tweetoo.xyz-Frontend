import React, { createContext } from 'react';

export const UserContext = createContext({});

export default function UserContextProvider({ children, user }) {
  // user.followers = user.followers.map(f => f.handle);
  // user.following = user.following.map(f => f.handle);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
