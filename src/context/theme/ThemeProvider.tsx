import React, {FC, PropsWithChildren, useState} from 'react';
import {ThemeContext} from './ThemeContext';
import {DarkTheme, LightTheme} from '../../constants/ThemeValue';
import {useColorScheme} from 'react-native';
import {DARK_MODE} from '../../constants/Constants';

export const ThemeProvider: FC<PropsWithChildren> = ({children}) => {
  const isDarkMode = useColorScheme() === DARK_MODE;
  const [darkMode, setDarkMode] = useState(isDarkMode);

  const changeTheme = () => {
    setDarkMode(!darkMode);
  };

  const getTheme = () => {
    if (darkMode) {
      return DarkTheme;
    } else {
      return LightTheme;
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: getTheme(),
        changeTheme,
        isDarkMode: darkMode,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
