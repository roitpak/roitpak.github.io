import React, {useState} from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

interface PickImageButtonProps {
  imagePicked: (file: Asset | File | null | undefined) => void;
}

function PickImageButton({imagePicked}: PickImageButtonProps): JSX.Element {
  const [pickedImage, setPickedImage] = useState<string | undefined>();
  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    result && result?.assets && setPickedImage(result?.assets[0].uri);
    result && result?.assets && imagePicked(result?.assets[0]);
  };
  return (
    <View style={styles().container}>
      <Button title={'Pick image'} onPress={pickImage} />
      {pickedImage && (
        <Image style={styles().image} source={{uri: pickedImage}} />
      )}
    </View>
  );
}
const styles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    image: {
      height: 100,
      width: 100,
      resizeMode: 'contain',
    },
  });
export default PickImageButton;
