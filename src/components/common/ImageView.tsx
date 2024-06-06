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
import ImageViewer from 'react-native-image-zoom-viewer';

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
      <View style={[styles(theme).indicatorContainer, contentContainerImage]}>
        <ActivityIndicator
          size={'large'}
          color={theme.colors.text_color}
          style={styles(theme).indicator}
        />
      </View>
      <Image style={[styles(theme).image, style]} source={source} />
      {source?.uri && (
        <Modal visible={imagePreview}>
          <ImageViewer
            onClick={() => setImagePreview(false)}
            imageUrls={[{url: source?.uri}]}
          />
        </Modal>
      )}
    </Pressable>
  );
}

export default ImageView;

const styles = (theme: Theme) =>
  StyleSheet.create({
    image: {
      resizeMode: 'contain',
      alignSelf: 'center',
      zIndex: 1000,
    },
    imageContainer: {
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
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imagePreviewContainer: {
      height: Dimensions.windowHeight,
      width: Dimensions.windowWidth,
    },
  });
