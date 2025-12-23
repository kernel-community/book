'use client';

interface PlayControlProps {
  isPlaying: boolean;
  handleOnClickPlay: () => void;
  handleOnClickPause: () => void;
}

const PlayControl = ({
  isPlaying,
  handleOnClickPlay,
  handleOnClickPause,
}: PlayControlProps) => {
  return (
    <div
      onClick={isPlaying ? handleOnClickPause : handleOnClickPlay}
      className="flex items-center justify-center flex-grow cursor-pointer">
      {isPlaying ? (
        <PauseIcon height={40} width={40} />
      ) : (
        <PlayIcon height={40} width={40} />
      )}
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

// Pause Icon SVG Component
const PauseIcon = ({ height, width }: { height: number; width: number }) => (
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
    className="feather feather-pause">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

export default PlayControl;

