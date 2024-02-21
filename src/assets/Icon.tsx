import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import IcoMoon, {IconProps} from 'react-icomoon';
import iconSet from './selection.json';
import {Svg, Path} from 'react-native-svg';

const Icon = (props: IconProps & {onPress?: () => void}) => {
  const {onPress, ...iconProps} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <IcoMoon
        native
        SvgComponent={Svg}
        PathComponent={Path}
        iconSet={iconSet}
        {...iconProps}
      />
    </TouchableOpacity>
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
