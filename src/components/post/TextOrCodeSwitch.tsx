import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../../context/theme/useTheme';
import Icon from '../../assets/Icon';
import {Theme} from '../../constants/Types';

interface TextOrCodeSwitchProps {
  onPressText: () => void;
  onPressCode: () => void;
  textSelected: boolean;
}

const TextOrCodeSwitch = ({
  onPressText,
  onPressCode,
  textSelected,
}: TextOrCodeSwitchProps) => {
  const {theme} = useTheme();
  return (
    <View style={styles(theme).row}>
      <Icon
        color={
          textSelected ? theme.colors.button_text : theme.colors.text_color
        }
        onPress={onPressText}
        icon={'spell-check'}
        size={theme.sizes.large}
      />
      <Icon
        color={
          textSelected ? theme.colors.text_color : theme.colors.button_text
        }
        onPress={onPressCode}
        icon={'embed2'}
        size={theme.sizes.large}
      />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: 100,
      padding: theme.sizes.extra_small,
      backgroundColor: theme.colors.background_color,
      marginTop: theme.sizes.small,
      borderRadius: theme.sizes.border_radius,
    },
  });

export default TextOrCodeSwitch;
