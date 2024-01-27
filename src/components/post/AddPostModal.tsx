import React, {useEffect, useState} from 'react';
import {Button, Modal, StyleSheet, TextInput, View} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {addPostScreen} from '../../constants/Screens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import PickImageButton from './PickImageButton';

interface AddPostModalProps {
  showAddPost: boolean;
}

function AddPostModal({showAddPost}: AddPostModalProps): JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [postTitle, setPostTitle] = useState('');
  const [category, setCategory] = useState('');
  const [featuredImage, setFeaturedImage] = useState<
    string | null | undefined | File
  >(null);

  const addPost = () => {
    navigation.navigate(addPostScreen);
  };

  useEffect(() => {
    console.log(featuredImage);
  }, [featuredImage]);

  // const pickImage = async () => {
  //   const result = await launchImageLibrary({ mediaType: 'photo' });
  //   setFeaturedImage(result);
  // };

  return (
    <Modal transparent animationType="fade" visible={showAddPost}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(52, 52, 52, 0.8)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{width: 300, backgroundColor: 'white'}}>
          <TextInput
            style={styles.input}
            value={postTitle}
            onChangeText={value => setPostTitle(value)}
          />
          <TextInput
            style={styles.input}
            value={postTitle}
            onChangeText={value => setPostTitle(value)}
          />
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={value => setCategory(value)}
          />
          <PickImageButton imagePicked={file => setFeaturedImage(file)} />
          {/* <Button title={'Pick image'} onPress={pickImage} /> */}
          <Button title={'Add post'} onPress={addPost} />
        </View>
      </View>
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
  },
});

export default AddPostModal;
