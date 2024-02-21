import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import postService from '../../appwrite/posts';
import CustomText from '../common/CustomText';
import {Theme} from '../../constants/Types';
import {useTheme} from '../../context/theme/useTheme';
import {Dimensions} from '../../helpers/Dimensions';
import Icon from '../../assets/Icon';
import NewPostComponent from './NewPostComponent';
import {useUser} from '../../context/user/useUser';
interface NewPostComponentProps {
  id: string;
}

function PostComponent({id}: NewPostComponentProps): JSX.Element {
  const [postData, setPostData] = useState<any>(null);
  const [image, setImageURl] = useState<any>(null);

  const {theme} = useTheme();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [gettingPost, setGettingPost] = useState<boolean>(false);

  const {isAdmin} = useUser();
  const getPostContent = async () => {
    setGettingPost(true);
    await postService
      .getPostContentData(id)
      .then(data => {
        setPostData(data);
      })
      .catch(error => {
        console.log(error);
      });
    setGettingPost(false);
  };

  useEffect(() => {
    getPostContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (postData?.image_id) {
      setImageURl(postService.getFilePreview(postData?.image_id));
    } else {
      setImageURl(null);
    }
  }, [postData]);

  const onPressEdit = () => setEditMode(true);
  const onFinishEdit = async () => {
    setLoading(true);
    await postService
      .updatePostContent(id, postData)
      .then(response => {
        getPostContent();
        console.log('Update post Content--->', response);
      })
      .catch(error => console.log(error));
    setLoading(false);
    setEditMode(false);
  };
  if (gettingPost) {
    return (
      <View style={styles(theme).activityContainer}>
        <ActivityIndicator size={'large'} color={theme.colors.button_text} />
      </View>
    );
  }
  if (editMode) {
    return (
      <NewPostComponent
        onChange={value => {
          setPostData(value);
        }}
        onSave={onFinishEdit}
        newPost={postData}
        loading={loading}
      />
    );
  }
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).contentContainerTitle}>
        <CustomText title={postData?.title} type={'h1'} />
        {!editMode && isAdmin && (
          <Icon
            color={theme.colors.text_color}
            onPress={onPressEdit}
            icon={'pencil'}
            size={theme.sizes.large}
          />
        )}
      </View>
      <View style={styles(theme).contentContainer}>
        <CustomText title={postData?.subtitle} type={'h2'} />
      </View>
      <View style={styles(theme).contentContainerImage}>
        {image && (
          <Image
            style={styles(theme).image}
            source={{
              uri: image,
            }}
          />
        )}
      </View>
      <View style={styles(theme).contentContainer}>
        <CustomText title={postData?.content} type={'p1'} />
      </View>
    </View>
  );
}

export default PostComponent;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: theme.sizes.small,
    },
    image: {
      height: 300,
      width: Dimensions.windowWidth * 0.8,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    contentContainerTitle: {
      marginBottom: theme.sizes.extra_small,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    contentContainerImage: {
      marginTop: theme.sizes.extra_small,
    },
    contentContainer: {
      marginTop: theme.sizes.extra_small,
    },
    switchContainer: {
      alignContent: 'center',
      alignSelf: 'center',
    },
    crossImage: {
      top: 0,
      right: 0,
      position: 'absolute',
    },
    activityContainer: {
      flex: 1,
      alignItems: 'center',
      marginVertical: theme.sizes.large,
    },
  });
