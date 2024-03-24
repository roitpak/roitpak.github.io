import React from 'react';
import YouTube, {YouTubeProps} from 'react-youtube';

interface CustomYoutubePlayerProps {
  url: string;
}

function CustomYoutubePlayer({url}: CustomYoutubePlayerProps): JSX.Element {
  const onPlayerReady: YouTubeProps['onReady'] = event => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  const opts: YouTubeProps['opts'] = {
    height: 450,
    width: 700,
    playerVars: {
      autoplay: 1,
    },
  };
  return <YouTube videoId={url} opts={opts} onReady={onPlayerReady} />;
}

export default CustomYoutubePlayer;
