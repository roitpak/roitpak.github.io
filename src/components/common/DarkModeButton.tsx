import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from '../../context/theme/useTheme';
import Icon from '../../assets/Icon';

const DarkModeButton = () => {
  const {isDarkMode, changeTheme, theme} = useTheme();
  return (
    <TouchableOpacity onPress={changeTheme}>
      <Icon
        onPress={changeTheme}
        icon={isDarkMode ? 'sun' : 'contrast'}
        size={theme.sizes.large}
        color={theme.colors.text_color}
      />
    </TouchableOpacity>
  );
};

export default DarkModeButton;
