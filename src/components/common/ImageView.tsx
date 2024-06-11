import React, {PropsWithChildren, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  Modal,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Theme} from '../../constants/Types';
import {useTheme} from '../../context/theme/useTheme';
import {Dimensions} from '../../helpers/Dimensions';

interface BaseCustomTextProps extends PropsWithChildren {
  style?: ImageStyle;
  source: {uri: string};
  contentContainerImage?: ViewStyle;
}

function ImageView({
  style,
  source,
  contentContainerImage,
}: BaseCustomTextProps): JSX.Element {
  const {theme} = useTheme();
  const [imagePreview, setImagePreview] = useState(false);

  return (
    <Pressable
      onPress={() => setImagePreview(true)}
      style={[styles(theme).imageContainer, contentContainerImage]}>
      <View style={[styles(theme).indicatorContainer]}>
        <ActivityIndicator
          size={'large'}
          color={theme.colors.text_color}
          style={styles(theme).indicator}
        />
      </View>
      <Image style={[styles(theme).image, style]} source={source} />
      {source?.uri && (
        <Modal visible={imagePreview}>
          <Pressable
            style={styles(theme).imagePreviewContainer}
            onPress={() => setImagePreview(false)}>
            <Image style={[styles(theme).imagePreview]} source={source} />
          </Pressable>
        </Modal>
      )}
    </Pressable>
  );
}

export default ImageView;

const styles = (theme: Theme) =>
  StyleSheet.create({
    image: {
      flex: 1,
      resizeMode: 'contain',
      alignSelf: 'center',
      zIndex: 1000,
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background_color,
      borderRadius: theme.sizes.border_radius,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    indicator: {
      alignSelf: 'center',
    },
    indicatorContainer: {
      position: 'absolute',
      top: 0,
      left: theme.sizes.small,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
    },
    imagePreviewContainer: {
      height: Dimensions.windowHeight,
      width: Dimensions.windowWidth,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background_color,
    },
    imagePreview: {
      backgroundColor: theme.colors.white,
      height: Dimensions.windowHeight * 0.9,
      width: Dimensions.windowWidth * 0.9,
      resizeMode: 'contain',
      borderRadius: theme.sizes.border_radius,
      shadowColor: '#fff',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 20,
    },
  });
