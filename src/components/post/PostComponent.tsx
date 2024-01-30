import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import postService from '../../appwrite/posts';

interface NewPostComponentProps {
  id: string;
}

function PostComponent({id}: NewPostComponentProps): JSX.Element {
  const [postData, setPostData] = useState<any>(null);
  const [image, setImageURl] = useState<any>(null);

  useEffect(() => {
    postService
      .getPostContentData(id)
      .then(data => {
        setPostData(data);
      })
      .catch(error => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(image);
    if (postData?.image_id) {
      setImageURl(postService.getFilePreview(postData?.image_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postData]);

  return (
    <View style={styles.container}>
      <Text>{postData?.title}</Text>
      <Text>{postData?.subtitle}</Text>
      {console.log(image)}
      {image && (
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      )}
      <Text>{postData?.content}</Text>
    </View>
  );
}

export default PostComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
});
