import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {UserContext} from './UserContext';
import authService from '../../appwrite/auth';
import {useModal} from '../modal/useModal';
import {Models} from 'appwrite';

export const UserPrvider: FC<PropsWithChildren> = ({children}) => {
  const [userInfo, setUserInfo] = useState<Models.User<Object>>();
  const {openModal} = useModal();

  const getUser = () => {
    authService
      .getCurrentUser()
      .then(user => {
        console.log('setting user');
        setUserInfo(user);
      })
      .catch(err => {
        openModal({title: err.message});
      });
  };
  const setLogin = () => {
    getUser();
  };

  const logout = () => {
    setUserInfo(undefined);
    authService.logout();
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: userInfo,
        setLogin,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
};
