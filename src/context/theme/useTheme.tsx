import {useContext} from 'react';
import {ThemeContext} from './ThemeContext';
import {ThemeProviderValue} from './ThemeProviderValue';

export const useTheme = (): ThemeProviderValue => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('Missing theme context');
  }
  return themeContext;
};
