import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {PostContent, Theme} from '../../constants/Types';
import NewPostComponent from '../../components/post/NewPostComponent';
import {BUTTON_TYPES, TEXT_POST_TYPE} from '../../constants/Constants';
import postService from '../../appwrite/posts';
import {useModal} from '../../context/modal/useModal';
import PostComponent from '../../components/post/PostComponent';
import CustomText from '../../components/common/CustomText';
import Button from '../../components/common/Button';
import Wrapper from '../../components/common/Wrapper';
import {useTheme} from '../../context/theme/useTheme';
import {useUser} from '../../context/user/useUser';

function PostContentScreen({route}: any): JSX.Element {
  const [post, setPost] = useState(route.params);
  const [newPostData, setNewPostData] = useState<PostContent | null>(null);
  const {isAdmin} = useUser();

  const {theme} = useTheme();
  useEffect(() => {
    setPost(route.params);
  }, [route]);

  const onChange = (value: PostContent) => {
    setNewPostData(value);
  };

  const {openModal} = useModal();

  const onAdd = () => {
    setNewPostData({
      title: '',
      subtitle: '',
      content_type: TEXT_POST_TYPE,
      content: '',
      postID: post.$id,
    });
  };

  const onSave = async () => {
    if (newPostData) {
      await postService
        .createPostContent(newPostData, post)
        .then(() => {
          getPost();
          setNewPostData(null);
        })
        .catch(err => {
          if (err instanceof Error) {
            openModal({title: err.message});
          } else {
            openModal({title: 'Unknown error occurred'});
          }
        });
    }
  };

  const getPost = async () => {
    await postService
      .getPost(post.$id)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        if (err instanceof Error) {
          openModal({title: err.message});
        } else {
          openModal({title: 'Unknown error occurred'});
        }
      });
  };

  return (
    <Wrapper style={styles(theme).container}>
      <View style={styles(theme).headerContainer}>
        <CustomText title={post.title} type={'h1'} />
      </View>
      {post.contents.length === 0 && !newPostData && (
        <CustomText
          title={'Looks empty here, start by adding by clicking button below'}
          type={'p1'}
        />
      )}
      <FlatList
        data={post.contents}
        renderItem={({item}) => <PostComponent id={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
      {newPostData && (
        <NewPostComponent
          newPost={newPostData}
          onChange={onChange}
          onSave={onSave}
        />
      )}
      {!newPostData && isAdmin && (
        <Button
          buttonStyle={styles(theme).buttonStyle}
          title="Add Content"
          type={BUTTON_TYPES.filled}
          onPress={onAdd}
        />
      )}
    </Wrapper>
  );
}
const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: theme.sizes.extra_extra_large * 2,
    },
    headerContainer: {
      marginBottom: theme.sizes.extra_extra_large,
    },
    buttonStyle: {
      alignSelf: 'center',
    },
  });

export default PostContentScreen;
