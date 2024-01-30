import {Theme, ThemeMode} from '../../constants/Types';

export interface ThemeProviderValue {
  theme: Theme;
  isDark?: boolean;
  setTheme?: (value: ThemeMode) => void;
}
