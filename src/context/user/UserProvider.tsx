import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {UserContext} from './UserContext';
import authService from '../../appwrite/auth';
import {Models} from 'appwrite';
import {ADMIN_LABEL} from '../../constants/Constants';

export const UserPrvider: FC<PropsWithChildren> = ({children}) => {
  const [userInfo, setUserInfo] = useState<Models.User<Object>>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const getUser = () => {
    authService
      .getCurrentUser()
      .then(user => {
        if (user?.labels.includes(ADMIN_LABEL)) {
          setIsAdmin(true);
        }
        setUserInfo(user);
      })
      .catch(err => {
        console.log(err);
        // openModal({title: err.message});
      });
  };
  const setLogin = () => {
    getUser();
  };

  const logout = () => {
    setUserInfo(undefined);
    authService.logout();
    setIsAdmin(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: userInfo,
        isAdmin,
        setLogin,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
};
