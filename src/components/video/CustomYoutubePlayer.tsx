import React from 'react';
import YouTube, {YouTubeProps} from 'react-youtube';
import {Dimensions} from '../../helpers/Dimensions';

interface CustomYoutubePlayerProps {
  url: string;
}

function CustomYoutubePlayer({url}: CustomYoutubePlayerProps): JSX.Element {
  const onPlayerReady: YouTubeProps['onReady'] = event => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  const opts: YouTubeProps['opts'] = {
    // checking if on mobile device
    height:
      Dimensions.windowHeight > Dimensions.windowWidth
        ? Dimensions.windowWidth * 0.45
        : 450,
    width:
      Dimensions.windowHeight > Dimensions.windowWidth
        ? Dimensions.windowWidth * 0.85
        : 700,
    playerVars: {
      autoplay: 1,
    },
  };
  return <YouTube videoId={url} opts={opts} onReady={onPlayerReady} />;
}

export default CustomYoutubePlayer;
