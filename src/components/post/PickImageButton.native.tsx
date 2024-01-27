import React from 'react';
import {Button} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

interface PickImageButtonProps {
  imagePicked: (file: string | undefined) => void;
}

function PickImageButton({imagePicked}: PickImageButtonProps): JSX.Element {
  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    result && result?.assets && imagePicked(result?.assets[0]?.uri);
  };
  return <Button title={'Pick image'} onPress={pickImage} />;
}

export default PickImageButton;
