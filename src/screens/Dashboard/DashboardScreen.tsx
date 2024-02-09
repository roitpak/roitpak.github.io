import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useUser} from '../../context/user/useUser';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {addPostScreen, homeScreen, loginScreen} from '../../constants/Screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ADMIN_LABEL, BUTTON_TYPES} from '../../constants/Constants';
import {Post} from '../../appwrite/types/posts';
import {useModal} from '../../context/modal/useModal';
import postService from '../../appwrite/posts';
import AddPostModal from '../../components/post/AddPostModal';
import Wrapper from '../../components/common/Wrapper';
import CustomText from '../../components/common/CustomText';
import Button from '../../components/common/Button';

function DashboardScreen(): JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {user, isAdmin, logout} = useUser();
  const logUserOut = () => logout();
  const [posts, setPosts] = useState<Post[]>([]);
  const {openModal} = useModal();

  const [showAddPost, setShowAddPost] = useState(false);

  const goToSign = () => navigation.navigate(loginScreen);

  const addPost = () => setShowAddPost(true);

  useEffect(() => {
    postService
      .getPosts(isAdmin)
      .then(data => {
        if (data) {
          setPosts(data);
        }
      })
      .catch(err => {
        if (err instanceof Error) {
          openModal({title: err.message});
        } else {
          openModal({title: 'Unknown error occurred'});
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const onPressItem = (item: Post) => {
    navigation.navigate(addPostScreen, item);
  };

  const goToHomeScreen = () => {
    navigation.navigate(homeScreen);
  };

  return (
    <Wrapper>
      <AddPostModal
        showAddPost={showAddPost}
        close={() => setShowAddPost(false)}
      />
      <CustomText title={'DashboardScreen'} type={'h1'} />
      {user && (
        <CustomText
          title={`Hi ${isAdmin && ADMIN_LABEL} ${user.name}`}
          type={'h1'}
        />
      )}
      {isAdmin && <Button title={'Add Post'} onPress={addPost} />}
      <FlatList
        style={styles.flatList}
        data={posts}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => onPressItem(item)}
            style={{marginVertical: 20, flexDirection: 'row'}}>
            <CustomText title={item?.title} type={'h1'} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        title={user ? 'Log Out' : 'Sign in'}
        onPress={user ? logUserOut : goToSign}
      />
      <Button
        type={BUTTON_TYPES.filled}
        title="Go to HomeScreen"
        onPress={goToHomeScreen}
      />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
});

export default DashboardScreen;
