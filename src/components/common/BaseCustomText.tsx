import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {TextTypes, Theme} from '../../constants/Types';
import {useTheme} from '../../context/theme/useTheme';

interface BaseCustomTextProps extends PropsWithChildren {
  title: string;
  type: TextTypes;
  style?: TextStyle;
  onPress?: () => void;
  bold?: boolean;
  numberOfLines?: number;
}

function BaseCustomText({
  title,
  type,
  style,
  onPress,
  bold,
  numberOfLines,
}: BaseCustomTextProps): JSX.Element {
  const {theme} = useTheme();

  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={[
        styles(theme)[type],
        bold && styles(theme).bold,
        styles(theme).text,
        style,
      ]}>
      {title}
    </Text>
  );
}

export default BaseCustomText;

const styles = (theme: Theme) =>
  StyleSheet.create({
    h1: {
      fontSize: theme.sizes.text.h1,
      color: theme.colors.text_color,
    },
    h2: {
      fontSize: theme.sizes.text.h2,
      color: theme.colors.text_color,
    },
    p1: {
      fontSize: theme.sizes.text.p1,
      color: theme.colors.text_color,
    },
    p2: {
      fontSize: theme.sizes.text.p2,
      color: theme.colors.text_color,
    },
    p3: {
      fontSize: theme.sizes.text.p3,
      color: theme.colors.text_color,
    },
    p4: {
      fontSize: theme.sizes.text.p4,
      color: theme.colors.text_color,
    },
    error: {
      fontSize: theme.sizes.text.p1,
      color: theme.colors.negative,
    },
    bold: {
      fontWeight: 'bold',
    },
    text: {
      lineHeight: 24,
      fontWeight: '200',
      textAlign: 'justify',
    },
  });
