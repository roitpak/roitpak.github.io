import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  // useColorScheme,
} from 'react-native';
import {PostContent} from '../../constants/Types';
import NewPostComponent from '../../components/post/NewPostComponent';
import {TEXT_POST_TYPE} from '../../constants/Constants';
import postService from '../../appwrite/posts';
import {useModal} from '../../context/modal/useModal';
import PostComponent from '../../components/post/PostComponent';

function PostContentScreen({route}: any): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? 'grey' : 'white',
  // };
  const [post, setPost] = useState(route.params);
  const [newPostData, setNewPostData] = useState<PostContent | null>(null);

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
    <SafeAreaView style={[styles.container]}>
      <StatusBar
      // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      // backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text style={styles.highlight}>{post.title}</Text>
      {post.contents.length === 0 && !newPostData && (
        <Text>Looks empty here, start by adding by clicking button below</Text>
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
      {!newPostData && (
        <TouchableOpacity style={styles.buttonStyle} onPress={onAdd}>
          <Text>+</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  highlight: {
    fontWeight: '700',
  },
  buttonStyle: {
    fontSize: 20,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 20,
    marginVertical: 10,
  },
});

export default PostContentScreen;
