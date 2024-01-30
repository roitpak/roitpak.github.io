import React from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {BottomTypes, Theme} from '../../constants/Types';
import {useTheme} from '../../context/theme/useTheme';
import {BUTTON_TYPES} from '../../constants/Constants';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  iconRight?: string;
  buttonStyle?: ViewStyle;
  textStyle?: ViewStyle;
  type?: BottomTypes;
}

function Button({
  title,
  onPress,
  loading, //is not shown when disabled
  iconRight,
  buttonStyle,
  textStyle,
  type,
  disabled,
}: ButtonProps): JSX.Element {
  const {theme} = useTheme();

  const returnStyle = () => {
    switch (type) {
      case BUTTON_TYPES.filled:
        return {
          container: {...styles(theme, disabled).filledStyleContainer},
          text: styles(theme, disabled).filledStyleText,
        };
      case BUTTON_TYPES.outlined:
        return {
          container: styles(theme, disabled).outlinedStyleContainer,
          text: styles(theme, disabled).outlinedStyleText,
        };
      case BUTTON_TYPES.text:
        return {
          container: styles(theme, disabled).textStyleContainer,
          text: styles(theme, disabled).textStyleText,
        };
      default:
        return {
          container: styles(theme, disabled).filledStyleContainer,
          text: styles(theme, disabled).filledStyleText,
        };
    }
  };

  return (
    <TouchableOpacity
      style={[
        returnStyle().container,
        // disabled && {backgroundColor: theme.colors.button_disabled},
        buttonStyle,
      ]}
      onPress={onPress}>
      <>
        {loading && !disabled ? (
          <ActivityIndicator
            size={'small'}
            color={
              type === BUTTON_TYPES.filled
                ? theme.colors.button_text_filled
                : theme.colors.button_text
            }
          />
        ) : (
          <View>
            {title && (
              <Text style={[returnStyle().text, textStyle]}>{title}</Text>
            )}
            {iconRight && <Text>{iconRight}</Text>}
          </View>
        )}
      </>
    </TouchableOpacity>
  );
}

export default Button;

const styles = (theme: Theme, disabled?: boolean) =>
  StyleSheet.create({
    filledStyleContainer: {
      borderRadius: theme.sizes.border_radius,
      width: theme.sizes.button_width as DimensionValue,
      padding: theme.sizes.small,
      margin: theme.sizes.medium,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: disabled
        ? theme.colors.button_text_filled
        : theme.colors.button_background,
    },
    outlinedStyleContainer: {
      borderWidth: 1,
      borderRadius: theme.sizes.border_radius,
      borderColor: disabled
        ? theme.colors.button_disabled
        : theme.colors.button_border,
      width: theme.sizes.button_width as DimensionValue,
      padding: theme.sizes.small,
      margin: theme.sizes.medium,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyleContainer: {
      borderRadius: theme.sizes.border_radius,
      width: theme.sizes.button_width as DimensionValue,
      padding: theme.sizes.small,
      margin: theme.sizes.medium,
      alignItems: 'center',
      justifyContent: 'center',
    },
    filledStyleText: {
      fontSize: 13,
      color: disabled
        ? theme.colors.button_disabled_text
        : theme.colors.button_text_filled,
    },
    outlinedStyleText: {
      fontSize: 13,
      color: disabled
        ? theme.colors.button_disabled_text
        : theme.colors.button_text,
    },
    textStyleText: {
      fontSize: 13,
      color: disabled
        ? theme.colors.button_disabled_text
        : theme.colors.button_text,
    },
  });
