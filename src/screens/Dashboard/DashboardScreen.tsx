import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {useUser} from '../../context/user/useUser';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {addPostScreen, loginScreen} from '../../constants/Screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ADMIN_LABEL} from '../../constants/Constants';
import {Post} from '../../appwrite/types/posts';
import {useModal} from '../../context/modal/useModal';
import postService from '../../appwrite/posts';
import AddPostModal from '../../components/post/AddPostModal';

function DashboardScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'grey' : 'white',
  };

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

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <AddPostModal
        showAddPost={showAddPost}
        close={() => setShowAddPost(false)}
      />
      {user && (
        <Text style={styles.highlight}>
          Hi {isAdmin && ADMIN_LABEL} {user.name}
        </Text>
      )}
      {isAdmin && <Button title={'Add Post'} onPress={addPost} />}
      <FlatList
        data={posts}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => onPressItem(item)}
            style={{marginVertical: 20, flexDirection: 'row'}}>
            <Text>{index + 1}.</Text>
            <Text>{item?.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        title={user ? 'Log Out' : 'Sign in'}
        onPress={user ? logUserOut : goToSign}
      />
      <Text style={styles.highlight}>DashboardScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default DashboardScreen;
