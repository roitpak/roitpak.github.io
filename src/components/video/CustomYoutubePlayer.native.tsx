import React, {useCallback, useState} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Dimensions} from '../../helpers/Dimensions';

interface CustomYoutubePlayerProps {
  url: string;
}

function CustomYoutubePlayer({url}: CustomYoutubePlayerProps): JSX.Element {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);
  return (
    <YoutubePlayer
      height={Dimensions.windowHeight * 0.8 * 0.3}
      play={playing}
      videoId={url}
      onChangeState={onStateChange}
    />
  );
}

export default CustomYoutubePlayer;
