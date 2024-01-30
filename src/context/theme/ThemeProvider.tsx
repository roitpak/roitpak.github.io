import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {ThemeContext} from './ThemeContext';
import {DarkTheme, LightTheme} from '../../constants/DarkTheme';
import {useColorScheme} from 'react-native';
import {DARK_MODE, LIGHT_MODE} from '../../constants/Constants';
import {ThemeMode} from '../../constants/Types';

export const ThemeProvider: FC<PropsWithChildren> = ({children}) => {
  const [customDarkMode, setCustomDarkMode] = useState<ThemeMode>(LIGHT_MODE);
  const isDarkMode = useColorScheme() === DARK_MODE;
  const setTheme = (value: ThemeMode) => {
    setCustomDarkMode(value);
  };
  const getTheme = () => {
    if (customDarkMode === DARK_MODE) {
      return DarkTheme;
    } else {
      return isDarkMode ? DarkTheme : LightTheme;
    }
  };

  useEffect(() => {}, []);
  return (
    <ThemeContext.Provider
      value={{
        theme: getTheme(),
        setTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
