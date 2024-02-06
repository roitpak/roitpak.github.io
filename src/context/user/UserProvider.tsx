import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {UserContext} from './UserContext';
import authService from '../../appwrite/auth';
import {Models} from 'appwrite';
import {ADMIN_LABEL} from '../../constants/Constants';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useTheme} from '../theme/useTheme';
import {Theme} from '../../constants/Types';

export const UserPrvider: FC<PropsWithChildren> = ({children}) => {
  const [userInfo, setUserInfo] = useState<Models.User<Object>>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const {theme} = useTheme();

  const getUser = async () => {
    await authService
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
    setLoading(false);
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
      {loading ? (
        <View style={styles(theme).container}>
          <ActivityIndicator
            size={'large'}
            color={theme.colors.background_color}
          />
        </View>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.sizes.extra_extra_large,
    },
  });
