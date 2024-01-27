import React, {ChangeEvent} from 'react';

interface PickImageButtonProps {
  imagePicked: (uri: string | null | undefined | File) => void;
}

function PickImageButton({imagePicked}: PickImageButtonProps): JSX.Element {
  const onImagePicked = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('File--->', event.target.files);
    imagePicked(event?.target?.files?.[0]);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={onImagePicked} />
    </div>
  );
}

export default PickImageButton;
