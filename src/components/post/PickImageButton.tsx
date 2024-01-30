import React, {ChangeEvent} from 'react';
import {Asset} from 'react-native-image-picker';

interface PickImageButtonProps {
  imagePicked: (uri: Asset | null | undefined | File) => void;
}

function PickImageButton({imagePicked}: PickImageButtonProps): JSX.Element {
  const onImagePicked = (event: ChangeEvent<HTMLInputElement>) => {
    imagePicked(event?.target?.files?.[0]);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={onImagePicked} />
    </div>
  );
}

export default PickImageButton;
