import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {addPostScreen} from '../../constants/Screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useUser} from '../../context/user/useUser';
import postService from '../../appwrite/posts';
import {useModal} from '../../context/modal/useModal';
import {Post} from '../../appwrite/types/posts';
import CustomTextInput from '../common/CustomTextInput';
import CustomText from '../common/CustomText';
import Button from '../common/Button';
import {Theme} from '../../constants/Types';
import {useTheme} from '../../context/theme/useTheme';
// import Wrapper from '../common/Wrapper';

interface AddPostModalProps {
  showAddPost: boolean;
  close: () => void;
}

function AddPostModal({showAddPost, close}: AddPostModalProps): JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [postTitle, setPostTitle] = useState('');
  const [category, setCategory] = useState<string[]>([]);
  const [tempCategory, setTempCategory] = useState('');

  const {user} = useUser();
  const {openModal} = useModal();
  const {theme} = useTheme();
  const addPost = async () => {
    const data: Post = {
      title: postTitle.toString(),
      category: category,
      uploadedBy: user?.$id.toString(),
      contents: [],
    };
    await postService
      .createPost(data)
      .then(response => {
        close();
        if (response) {
          navigation.navigate(addPostScreen, response);
        }
      })
      .catch(err => {
        close();
        console.log('error--->');
        console.log(err.message);
        if (err instanceof Error) {
          openModal({title: err.message});
        } else {
          openModal({title: 'Unknown error occurred'});
        }
      });
  };

  const onPressCategoryItem = (i: number) => {
    setCategory(prevCategory => {
      return prevCategory.filter((_, index) => index !== i);
    });
  };

  const addCategory = () => {
    setCategory(prevCategory => [...prevCategory, tempCategory]);
    setTempCategory('');
  };

  return (
    <Modal transparent animationType="fade" visible={showAddPost}>
      <TouchableOpacity onPress={close} style={styles(theme).touchable}>
        <TouchableWithoutFeedback>
          <View style={styles(theme).content}>
            <CustomText title={'New Post'} type={'h1'} />
            <CustomTextInput
              placeholder={'Title'}
              value={postTitle}
              onChangeText={value => setPostTitle(value)}
            />
            <View style={{flexDirection: 'column'}}>
              <CustomText title={'Category'} type={'p2'} />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomTextInput
                  value={tempCategory}
                  onChangeText={value => setTempCategory(value)}
                  placeholder="eg: NodeJS"
                />
                <TouchableOpacity onPress={addCategory}>
                  <CustomText title={'Add'} type={'p2'} />
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal={true}
                data={category}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 5,
                      marginVertical: 10,
                    }}>
                    <CustomText title={item} type={'p2'} />
                    <TouchableOpacity
                      onPress={() => onPressCategoryItem(index)}>
                      <Text>*</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => item}
              />
            </View>
            <Button title={'Add post'} onPress={addPost} />
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}
const styles = (theme: Theme) =>
  StyleSheet.create({
    touchable: {
      flex: 1,
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      backgroundColor: theme.colors.background_color,
    },
  });

export default AddPostModal;
