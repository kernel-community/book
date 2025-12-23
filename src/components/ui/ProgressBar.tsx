'use client';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onTimeUpdate: (time: number) => void;
  playerId: string;
}

const ProgressBar = ({
  currentTime,
  duration,
  onTimeUpdate,
  playerId,
}: ProgressBarProps) => {
  const percentProgress = (currentTime / duration || 0) * 100;

  const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressBarId = `progressBar-${playerId}`;

  const getTimeAtPosition = (e: MouseEvent | React.MouseEvent) => {
    const bar = document.getElementById(progressBarId);
    if (!bar) return 0;
    const barStart = bar.getBoundingClientRect().left;
    const barWidth = bar.offsetWidth;
    const clickPositionInPage = e.pageX;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = (duration || 0) / barWidth;
    return timePerPixel * clickPositionInBar;
  };

  const handleBarInteraction = (e: React.MouseEvent) => {
    onTimeUpdate(getTimeAtPosition(e));

    const updateTimeOnMove = (eMove: MouseEvent) => {
      onTimeUpdate(getTimeAtPosition(eMove));
    };

    document.addEventListener('mousemove', updateTimeOnMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', updateTimeOnMove);
    });
  };

  const barStyle: React.CSSProperties = {
    background: `linear-gradient(to right, #FFD500 ${percentProgress}%, white 0)`,
  };

  const knobStyle: React.CSSProperties = {
    left: `${percentProgress - 2}%`,
  };

  return (
    <div className="flex items-center select-none w-full">
      <span className="text-xs md:text-2xl w-[10%]">{formatDuration(currentTime)}</span>
      <div
        id={progressBarId}
        style={barStyle}
        onMouseDown={handleBarInteraction}
        className="flex items-center flex-1 h-2.5 mx-5 border border-solid border-gray-300 rounded cursor-pointer">
        <span
          style={knobStyle}
          className="relative w-4 h-4 bg-[#FFD500] border-[1.5px] border-white rounded-full"
        />
      </div>
      <span className="text-xs md:text-2xl w-[10%]">{formatDuration(duration)}</span>
    </div>
  );
};

export default ProgressBar;

