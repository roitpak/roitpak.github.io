import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {PostContent} from '../../constants/Types';
import {
  CODE_POST_TYPE,
  POST_CONTENT_KEYS,
  TEXT_POST_TYPE,
} from '../../constants/Constants';
import PickImageButton from './PickImageButton';

interface NewPostComponentProps {
  newPost: PostContent;
  onChange: (post: PostContent) => void;
  onSave: () => void;
}

function NewPostComponent({
  newPost,
  onSave,
  onChange,
}: NewPostComponentProps): JSX.Element {
  const onChangeValue = (value: any, key: string) => {
    onChange({...newPost, [key]: value});
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="title"
        style={styles.input}
        value={newPost.title}
        onChangeText={value => onChangeValue(value, POST_CONTENT_KEYS.title)}
      />
      <TextInput
        placeholder="subtitle"
        style={styles.input}
        value={newPost.subtitle}
        onChangeText={value => onChangeValue(value, POST_CONTENT_KEYS.subtitle)}
      />
      <View style={styles.selectOne}>
        <Text>What is the type of this post?</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.typeSelection,
              newPost.content_type === TEXT_POST_TYPE && {
                backgroundColor: 'blue',
              },
            ]}
            onPress={() => onChangeValue(TEXT_POST_TYPE, 'type')}>
            <Text>Text</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeSelection,
              newPost.content_type === CODE_POST_TYPE && {
                backgroundColor: 'blue',
              },
            ]}
            onPress={() =>
              onChangeValue(CODE_POST_TYPE, POST_CONTENT_KEYS.type)
            }>
            <Text>Code</Text>
          </TouchableOpacity>
        </View>
      </View>
      <PickImageButton
        imagePicked={image => onChangeValue(image, POST_CONTENT_KEYS.image)}
      />
      <TextInput
        multiline
        placeholder="Content"
        style={styles.contentInput}
        value={newPost.content}
        onChangeText={value => onChangeValue(value, POST_CONTENT_KEYS.content)}
      />
      <Button title={'Add Post'} onPress={onSave} />
    </View>
  );
}

export default NewPostComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  input: {
    height: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    marginVertical: 5,
  },
  selectOne: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  typeSelection: {
    height: 20,
    width: 50,
    backgroundColor: 'grey',
  },
  contentInput: {
    height: 300,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    marginVertical: 10,
  },
});
