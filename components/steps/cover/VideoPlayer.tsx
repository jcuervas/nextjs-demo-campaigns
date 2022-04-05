import YouTube, {Options} from 'react-youtube';
import React, {useEffect, useState} from 'react';
import {ControlBar, Player, PlayToggle} from 'video-react';

interface VideoPlayerProps {
  src: string;
  poster: string
}

export default function VideoPlayer(props: VideoPlayerProps) {
  const {src, poster} = props
  const [videoOpts, setVideoOpts] = useState<Options>({
    width: '640',
    height: '360'
  })
  const isYoutubeVideo = /(youtu\.?be)/gu.test(src);
  const match = isYoutubeVideo ? /https:\/\/(www.)?(youtu\.?be.com)\/(watch\?v=)?(.+)/.exec(src) : []
  const videoId = match.pop()
  useEffect(() => {
    const cardContent = document.querySelector('.MuiCardContent-root') as HTMLElement
    const cardContentRects = cardContent.getClientRects()[0]
    const cardPadding = window.getComputedStyle(cardContent).getPropertyValue('padding-left').replace('px', '')
    setVideoOpts({
      width: (cardContentRects.width - Number(cardPadding) * 2).toString(),
      height: ((cardContentRects.width - Number(cardPadding) * 2) * 0.5625).toFixed()
    })
  }, [])

  return (
    <>
      {isYoutubeVideo
        ? <YouTube videoId={videoId} opts={videoOpts}/>
        : <Player
          playsInline
          poster={poster}>
          <source src={src}/>
          <ControlBar autoHide={true} disableDefaultControls={false}>
            <PlayToggle/>
          </ControlBar>
        </Player>
      }
    </>

        )
}
