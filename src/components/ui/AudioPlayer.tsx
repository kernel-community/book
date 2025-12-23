'use client';

import { useState, useEffect } from 'react';

import ProgressBar from './ProgressBar';
import PlayControl from './PlayControl';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer = ({ src }: AudioPlayerProps) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState<number | null>(null);
  const [playerId, setPlayerId] = useState<string>('');

  let userAgent: string | undefined;
  let isIosAgent: boolean;
  let isWebkit: boolean;
  let isAutoplayForbidden: boolean;

  // During the build phase, Next.js doesn't have access to 'window' based objects.
  // Check if it's undefined allows us to build the project, but still access it
  // when the javascript is running in browser where navigator is available
  if (typeof navigator !== 'undefined') {
    userAgent = navigator.userAgent;
    isIosAgent = !!userAgent.match(/iPad/i) || !!userAgent.match(/iPhone/i);
    isWebkit = !!userAgent.match(/WebKit/i);
    isAutoplayForbidden = isIosAgent && isWebkit && !userAgent.match(/CriOS/i);
  } else {
    isIosAgent = false;
    isWebkit = false;
    isAutoplayForbidden = false;
  }

  const showiOSOverlay = isAutoplayForbidden && !audio;

  const loadAudio = () => {
    if (!audio) {
      const newAudio = new Audio(src);
      setAudio(newAudio);
    }
  };

  const handleOnClickPlay = () => {
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleOnClickPause = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Load audio automatically for browsers where autoplay is not being blocked
  useEffect(() => {
    if (!isAutoplayForbidden && !audio) {
      const newAudio = new Audio(src);
      setAudio(newAudio);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Generate a simple unique ID
    const uuid = `audio-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    setPlayerId(uuid);
  }, []);

  useEffect(() => {
    if (!audio) {
      return;
    }

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    if (clickedTime !== null && clickedTime !== currentTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [audio, isPlaying, playerId, clickedTime, currentTime]);

  return (
    <div className="flex flex-row mb-12 overflow-hidden px-0 py-4 md:px-12 relative">
      {showiOSOverlay && (
        <div
          onClick={loadAudio}
          className="absolute top-0 left-0 w-full h-full z-[2] flex items-center justify-center text-center text-base md:text-2xl px-0 py-4 md:px-12 bg-white">
          <div className="flex items-center justify-center flex-grow">
            <PlayIcon height={40} width={40} />
          </div>
          <p className="flex-grow-[10] m-auto">
            Click here to load the audio player
          </p>
        </div>
      )}
      <PlayControl
        isPlaying={isPlaying}
        handleOnClickPlay={handleOnClickPlay}
        handleOnClickPause={handleOnClickPause}
      />
      <div className="flex-grow-[10]">
        <div className="text-base md:text-2xl">Listen</div>
        <ProgressBar
          playerId={playerId}
          currentTime={currentTime}
          duration={duration}
          onTimeUpdate={setClickedTime}
        />
      </div>
    </div>
  );
};

// Play Icon SVG Component
const PlayIcon = ({ height, width }: { height: number; width: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-play">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

export default AudioPlayer;

