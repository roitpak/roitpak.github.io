import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
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
import PostStatusButton from '../../components/post/PostStatusButton';
import Status from '../../components/post/enum/PostStatusEnum';
import VideoUrlComponent from '../../components/post/VideoUrlComponent';
import TLDRComponent from '../../components/post/TLDRComponent';
import strings from '../../constants/strings.json';

function PostContentScreen({route}: any): JSX.Element {
  const [post, setPost] = useState(route.params);
  const [newPostData, setNewPostData] = useState<PostContent | null>(null);
  const {isAdmin} = useUser();

  const [loading, setLoading] = useState(false);

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
        setPost(response);
      })
      .catch(err => {
        if (err instanceof Error) {
          openModal({title: err.message});
        } else {
          openModal({title: 'Unknown error occurred'});
        }
      });
  };

  const onPostStatusChange = async (status: Status) => {
    setLoading(true);
    await postService
      .updatePost(post?.$id ?? '', {...post, status: status})
      .then(response => {
        setPost(response);
      })
      .catch(err => openModal({title: err?.message}));
    setLoading(false);
  };

  const onPostVideoUrlChange = async (url: string) => {
    setLoading(true);
    await postService
      .updatePost(post?.$id ?? '', {...post, videoUrl: url})
      .then(response => {
        setPost(response);
      })
      .catch(err => openModal({title: err?.message}));
    setLoading(false);
  };

  const onPostTLDRUpdate = async (value: string) => {
    setLoading(true);
    await postService
      .updatePost(post?.$id ?? '', {...post, tldr: value})
      .then(response => {
        console.log(response);
        setPost(response);
      })
      .catch(err => openModal({title: err?.message}));
    setLoading(false);
  };

  return (
    <Wrapper style={styles(theme).container}>
      <CustomText title={post.title} type={'h1'} />
      {loading && (
        <ActivityIndicator
          style={styles(theme).indicator}
          size={'small'}
          color={theme.colors.text_color}
        />
      )}
      {isAdmin && (
        <PostStatusButton
          loading={loading}
          onChange={(status: Status) => onPostStatusChange(status)}
          status={post.status ? post.status : Status.pending}
        />
      )}
      <VideoUrlComponent
        loading={loading}
        url={post?.videoUrl}
        onUrlChange={(url: string) => onPostVideoUrlChange(url)}
      />
      {post.contents.length === 0 && !newPostData && (
        <CustomText title={strings.startByAdding} type={'p1'} />
      )}
      <View style={styles(theme).headerContainer}>
        <FlatList
          data={post.contents}
          renderItem={({item}) => <PostComponent id={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
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
      <TLDRComponent
        loading={loading}
        onChange={value => onPostTLDRUpdate(value)}
        content={post?.tldr}
      />
    </Wrapper>
  );
}
const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: theme.sizes.extra_extra_large * 2,
    },
    headerContainer: {
      marginBottom: theme.sizes.medium,
    },
    buttonStyle: {
      alignSelf: 'center',
    },
    indicator: {
      marginTop: theme.sizes.medium,
    },
  });

export default PostContentScreen;
