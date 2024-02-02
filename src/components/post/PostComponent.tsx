import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import postService from '../../appwrite/posts';
import CustomText from '../common/CustomText';

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
    if (postData?.image_id) {
      setImageURl(postService.getFilePreview(postData?.image_id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postData]);

  return (
    <View style={styles.container}>
      <CustomText title={postData?.title} type={'h1'} />
      <CustomText title={postData?.subtitle} type={'h2'} />
      {image && (
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      )}
      <CustomText title={postData?.content} type={'p1'} />
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
