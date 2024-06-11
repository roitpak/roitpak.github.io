import React, {useEffect, useState} from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
import {PostContent, Theme} from '../../constants/Types';
import {
  CODE_POST_TYPE,
  POST_CONTENT_KEYS,
  TEXT_POST_TYPE,
} from '../../constants/Constants';
import PickImageButton from './PickImageButton';
import CustomTextInput from '../common/CustomTextInput';
import CustomText from '../common/CustomText';
import Button from '../common/Button';
import TextOrCodeSwitch from './TextOrCodeSwitch';
import {useTheme} from '../../context/theme/useTheme';
import postService from '../../appwrite/posts';
import {Dimensions} from '../../helpers/Dimensions';
import Icon from '../../assets/Icon';
import strings from '../../constants/strings.json';

interface NewPostComponentProps {
  newPost: PostContent;
  onChange: (post: PostContent) => void;
  onSave: () => void;
  loading?: boolean;
  onPressRemoveImage?: () => void;
}

function NewPostComponent({
  newPost,
  onSave,
  onChange,
  loading,
}: NewPostComponentProps): JSX.Element {
  const onChangeValue = (value: any, key: string) => {
    onChange({...newPost, [key]: value});
  };
  const [imageUri, setImageURl] = useState<any>(null);

  const {theme} = useTheme();
  useEffect(() => {
    if (newPost?.image_id) {
      setImageURl(postService.getFilePreview(newPost?.image_id));
    }
  }, [newPost]);

  const onPressCross = () => {
    setImageURl(null);
    onChange({...newPost, image_id: undefined});
  };

  return (
    <View style={styles(theme).container}>
      <CustomText title={'Title:'} type="h2" />
      <CustomTextInput
        placeholder="title"
        value={newPost.title}
        onChangeText={value => onChangeValue(value, POST_CONTENT_KEYS.title)}
      />
      <View style={styles(theme).contentContainer}>
        <CustomText title={'Subtitle:'} type="h2" />
        <CustomTextInput
          placeholder="subtitle"
          value={newPost.subtitle}
          onChangeText={value =>
            onChangeValue(value, POST_CONTENT_KEYS.subtitle)
          }
        />
      </View>
      {!imageUri && (
        <PickImageButton
          imagePicked={image => onChangeValue(image, POST_CONTENT_KEYS.image)}
        />
      )}
      {imageUri && (
        <View style={styles(theme).imageContainer}>
          <Icon
            color={theme.colors.negative}
            style={styles(theme).crossIcon}
            size={theme.sizes.large}
            icon="cross"
            onPress={() => onPressCross()}
          />

          <Image
            style={styles(theme).image}
            source={{
              uri: imageUri,
            }}
          />
        </View>
      )}
      <View style={styles(theme).selectOne}>
        <CustomText title={strings.whatTypePost} type={'p1'} />
        <TextOrCodeSwitch
          onPressText={() =>
            onChangeValue(TEXT_POST_TYPE, POST_CONTENT_KEYS.content_type)
          }
          onPressCode={() =>
            onChangeValue(CODE_POST_TYPE, POST_CONTENT_KEYS.content_type)
          }
          textSelected={newPost.content_type === TEXT_POST_TYPE}
        />
      </View>
      <CustomText title={'Content:'} type="h2" />
      <CustomTextInput
        multiline
        placeholder="Content"
        style={styles(theme).contentInput}
        value={newPost.content}
        onChangeText={value => onChangeValue(value, POST_CONTENT_KEYS.content)}
      />
      <View style={styles(theme).saveButton}>
        <Button
          disabled={
            newPost?.title?.length === 0 &&
            newPost?.subtitle?.length === 0 &&
            newPost?.content?.length === 0
          }
          loading={loading}
          title={strings.savePost}
          onPress={onSave}
        />
      </View>
    </View>
  );
}

export default NewPostComponent;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginVertical: theme.sizes.large,
      borderTopWidth: 2,
      borderBottomWidth: 2,
      paddingVertical: theme.sizes.large,
      borderColor: theme.colors.button_border,
    },
    selectOne: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
    },
    contentInput: {
      marginVertical: theme.sizes.large,
      height: Platform.OS === 'web' ? 100 : null,
      maxHeight: 300,
    },
    contentContainer: {
      marginTop: theme.sizes.large,
    },
    image: {
      height: 300,
      width: Dimensions.windowWidth * 0.8,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    crossIcon: {
      top: 0,
      right: 0,
      position: 'absolute',
    },
    imageContainer: {
      marginVertical: theme.sizes.large,
    },
    saveButton: {
      alignItems: 'center',
    },
  });
