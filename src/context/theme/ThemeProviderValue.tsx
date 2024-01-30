import {Theme} from '../../constants/Types';

export interface ThemeProviderValue {
  theme: Theme;
  isDark?: boolean;
  changeTheme?: () => void;
  isDarkMode: boolean;
}
