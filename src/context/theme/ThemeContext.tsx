import React from 'react';
import {ThemeProviderValue} from './ThemeProviderValue';
export const ThemeContext = React.createContext<ThemeProviderValue | null>(
  null,
);
