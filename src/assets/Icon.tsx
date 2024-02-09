import React from 'react';
import {TouchableOpacity} from 'react-native';
import IcoMoon, {IconProps} from 'react-icomoon';
import iconSet from './selection.json';
import {Svg, Path} from 'react-native-svg';

const Icon = (props: IconProps & {onPress?: () => void}) => {
  const {onPress, ...iconProps} = props;

  return (
    <TouchableOpacity onPress={onPress}>
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

export default Icon;
