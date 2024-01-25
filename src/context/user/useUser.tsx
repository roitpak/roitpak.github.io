import {useContext} from 'react';
import {UserProviderValue} from './UserProviderValue';
import {UserContext} from './UserContext';

export const useUser = (): UserProviderValue => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('Missing user context, user may be not logged');
  }
  return userContext;
};
