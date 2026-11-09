import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Upload, Disc, Heart } from 'lucide-react';

interface MusicPlayerProps {
  defaultAudioSrc?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  defaultAudioSrc = '/assets/aistudio/Ve_Haaniyaan_-_Official_Video_Ravi_Dubey_Sargun_Mehta_Danny_Avvy_Sra_Dreamiyata_Music__1__1dd54d88.mp3',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songTitle, setSongTitle] = useState('Ve Haaniyaan · Ravi Dubey & Sargun Mehta');
  const [audioSrc, setAudioSrc] = useState(defaultAudioSrc);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync volume & mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const startPlayback = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.warn('Playback deferred until user interaction:', err);
      });
  }, []);

  // Autoplay attempt on mount & interaction listener
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 1. Attempt autoplay immediately when website loads
    startPlayback();

    // 2. Fallback: on first user interaction anywhere if browser blocked initial autoplay
    const handleFirstGesture = () => {
      if (audio.paused) {
        startPlayback();
      }
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('pointerdown', handleFirstGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true });
    window.addEventListener('click', handleFirstGesture, { passive: true });
    window.addEventListener('keydown', handleFirstGesture, { passive: true });

    // 3. Listen for direct 'start-romantic-music' event (e.g. from Open Box button click)
    const handleStartEvent = () => {
      startPlayback();
    };
    window.addEventListener('start-romantic-music', handleStartEvent);

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('start-romantic-music', handleStartEvent);
    };
  }, [startPlayback]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback prevented:', err);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const customUrl = URL.createObjectURL(file);
      setAudioSrc(customUrl);
      setSongTitle(file.name.replace(/\.[^/.]+$/, ''));
      setIsPlaying(false);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }, 200);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm w-[92vw] sm:w-88 transition-all duration-300">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          // Continuous loop
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
          }
        }}
        loop
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="audio/*"
        className="hidden"
      />

      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-rose-200/80 transition-all hover:shadow-2xl">
        {/* Header row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <div
              className={`w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '6s' }}
            >
              <Disc className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] tracking-wider uppercase font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">
                  Our Romantic Song
                </span>
                {isPlaying && (
                  <span className="flex items-center gap-0.5">
                    <span className="w-1 h-3 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-4 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                )}
              </div>
              <h4 className="text-xs font-semibold text-rose-950 truncate" title={songTitle}>
                {songTitle}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Upload your own song"
              className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition"
            >
              <Upload className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-xs text-rose-400 hover:text-rose-600 p-1 font-medium"
            >
              {isMinimized ? 'Expand' : 'Hide'}
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Progress bar */}
            <div className="space-y-1 mb-2">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[10px] text-rose-400 font-medium">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-16 h-1 bg-rose-100 rounded appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              <button
                onClick={togglePlay}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-md hover:scale-105 active:scale-95 transition"
                title={isPlaying ? 'Pause' : 'Play Song'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <div className="flex items-center text-xs text-rose-500 font-handwritten text-base pr-1">
                For Ishika <Heart className="w-3.5 h-3.5 ml-1 fill-rose-500 text-rose-500 inline" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
