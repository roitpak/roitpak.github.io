import React, {useState} from 'react';
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {addPostScreen} from '../../constants/Screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import PickImageButton from './PickImageButton';
import {useUser} from '../../context/user/useUser';
import postService from '../../appwrite/posts';
import {useModal} from '../../context/modal/useModal';
import {Post} from '../../appwrite/types/posts';
// import {Asset} from 'react-native-image-picker';

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

  const addPost = async () => {
    const data: Post = {
      title: postTitle.toString(),
      slug: postTitle
        .replace(/[^a-zA-Z ]/g, '')
        .toLowerCase()
        .replace(/ /g, '_')
        .toString()
        .slice(0, 30),
      category: category,
      uploadedBy: user?.$id.toString(),
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

  // const onImagePicked = (file: File | Asset | undefined | null) => {
  //   postService
  //     .uploadFile(file)
  //     .then(response => {
  //       console.log('Upload file response--->', response);
  //     })
  //     .catch(error => {
  //       console.log('Upload file error response--->', error);
  //     });
  // };

  return (
    <Modal transparent animationType="fade" visible={showAddPost}>
      <TouchableOpacity
        onPress={close}
        style={{
          flex: 1,
          backgroundColor: 'rgba(52, 52, 52, 0.8)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableWithoutFeedback>
          <View style={{width: 300, backgroundColor: 'white'}}>
            <TextInput
              placeholder={'Title'}
              style={styles.input}
              value={postTitle}
              onChangeText={value => setPostTitle(value)}
            />
            <View style={{flexDirection: 'column'}}>
              <Text>Category</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  style={styles.input}
                  value={tempCategory}
                  onChangeText={value => setTempCategory(value)}
                />
                <TouchableOpacity onPress={addCategory}>
                  <Text>Add</Text>
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
                    <Text>{item}</Text>
                    <TouchableOpacity
                      onPress={() => onPressCategoryItem(index)}>
                      <Text>*</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => item}
              />
            </View>

            {/* <PickImageButton imagePicked={onImagePicked} /> */}
            {/* <Button title={'Pick image'} onPress={pickImage} /> */}
            <Button title={'Add post'} onPress={addPost} />
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}
const styles = StyleSheet.create({
  input: {
    padding: 5,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    margin: 10,
    width: 200,
  },
});

export default AddPostModal;
