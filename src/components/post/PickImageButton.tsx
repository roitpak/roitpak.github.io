import React, {ChangeEvent} from 'react';
import {StyleSheet, View} from 'react-native';
import {Asset} from 'react-native-image-picker';

interface PickImageButtonProps {
  imagePicked: (uri: Asset | null | undefined | File) => void;
}

function PickImageButton({imagePicked}: PickImageButtonProps): JSX.Element {
  const onImagePicked = (event: ChangeEvent<HTMLInputElement>) => {
    imagePicked(event?.target?.files?.[0]);
  };

  return (
    <View style={styles.container}>
      <input type="file" accept="image/*" onChange={onImagePicked} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default PickImageButton;
