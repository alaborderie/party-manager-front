import React from 'react';

export interface IUserContext {
  email?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  id?: string;
  signIn?: Function;
  signOut?: Function;
}

export const UserContext = React.createContext<IUserContext | null>(null);
