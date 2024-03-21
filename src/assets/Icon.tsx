import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import IcoMoon, {IconProps} from 'react-icomoon';
import iconSet from './selection.json';
import {Svg, Path} from 'react-native-svg';

const Icon = (props: IconProps & {onPress?: () => void}) => {
  const {onPress, ...iconProps} = props;

  return onPress ? (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <IcoMoon
        native
        SvgComponent={Svg}
        PathComponent={Path}
        iconSet={iconSet}
        {...iconProps}
      />
    </TouchableOpacity>
  ) : (
    <View style={styles.container}>
      <IcoMoon
        native
        SvgComponent={Svg}
        PathComponent={Path}
        iconSet={iconSet}
        {...iconProps}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Icon;
