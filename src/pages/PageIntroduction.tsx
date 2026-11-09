import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Gift, ArrowRight, Camera, Upload } from 'lucide-react';
import { PageId } from '../types';

interface PageIntroductionProps {
  onNextPage: () => void;
  onOpenPhotoModal?: (src: string, title: string) => void;
}

const BASE = import.meta.env.BASE_URL || '/';

const rawAssetFallback = (src: string) => {
  const filename = src.split('/').pop()?.split('?')[0];
  return filename ? `https://raw.githubusercontent.com/princemeena20088-lab/BABY-GURLLLLLLLLL/main/public/assets/aistudio/${filename}` : src;
};

const handleAssetImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const image = e.currentTarget;
  if (image.dataset.fallbackApplied || !image.src.includes('/assets/aistudio/')) return;
  image.dataset.fallbackApplied = 'true';
  image.src = rawAssetFallback(image.src);
};


export const PageIntroduction: React.FC<PageIntroductionProps> = ({ onNextPage, onOpenPhotoModal }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [kissCount, setKissCount] = useState(0);
  const [kisses, setKisses] = useState<{ id: number; x: number; y: number }[]>([]);
  const [customPhoto, setCustomPhoto] = useState<string | null>(`${BASE}assets/aistudio/1_70a35d3a.jpg`);

  const handleOpenBox = (e: React.MouseEvent) => {
    if (!isOpened) {
      setIsOpened(true);

      // Start music immediately if autoplay was blocked
      window.dispatchEvent(new CustomEvent('start-romantic-music'));

      // Fire confetti
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { x, y },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#f472b6', '#ec4899'],
        shapes: ['circle'],
      });
    }
  };

  const handleKissClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newKiss = { id: Date.now(), x, y };
    setKisses((prev) => [...prev.slice(-15), newKiss]);
    setKissCount((prev) => prev + 1);

    confetti({
      particleCount: 15,
      spread: 45,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
      colors: ['#f43f5e', '#fb7185', '#ff6b8b'],
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPhoto(url);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Page Header with EXACT required text */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 text-rose-500 text-sm font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-rose-50/80 border border-rose-200">
          <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
          <span>Page 1 — Introduction</span>
          <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
        </div>

        {/* Main Heading: Exact words */}
        <h1 className="font-romantic text-3xl sm:text-5xl md:text-6xl font-extrabold text-rose-950 tracking-tight leading-tight">
          special love not for ishika (cute kisses hugs)
        </h1>

        {/* Subheading: Exact words */}
        <p className="font-handwritten text-2xl sm:text-3xl text-rose-600 font-medium tracking-wide">
          please open if u love priyansh
        </p>
      </div>

      {/* Interactive Gift Box Section */}
      <div className="w-full flex flex-col items-center justify-center my-4">
        {!isOpened ? (
          <div
            onClick={handleOpenBox}
            className="group relative cursor-pointer flex flex-col items-center p-8 sm:p-12 transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            {/* Pulsing glow background */}
            <div className="absolute inset-0 bg-rose-200/50 rounded-full blur-2xl group-hover:bg-rose-300/60 transition-all duration-300 -z-10" />

            {/* Gift Box Graphics */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
              {/* Gift box body */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 bg-gradient-to-tr from-rose-500 via-rose-400 to-pink-400 rounded-3xl shadow-2xl border-4 border-rose-200 flex items-center justify-center relative overflow-hidden group-hover:rotate-1 transition-transform">
                {/* Ribbons */}
                <div className="absolute inset-x-0 h-7 bg-amber-200/90 shadow-sm" />
                <div className="absolute inset-y-0 w-7 bg-amber-200/90 shadow-sm" />

                <Gift className="w-16 h-16 sm:w-20 sm:h-20 text-white/90 relative z-10 animate-bounce" />
              </div>

              {/* Gift box bow / lid */}
              <div className="absolute -top-3 sm:-top-4 w-40 sm:w-48 h-10 bg-gradient-to-r from-rose-600 to-pink-500 rounded-2xl shadow-lg border-2 border-rose-100 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-amber-200 border-2 border-amber-300 shadow-md flex items-center justify-center -top-4 absolute">
                  <span className="text-rose-600 text-xs">🎀</span>
                </div>
              </div>

              {/* Floating cute heart badges around box */}
              <div className="absolute -top-6 -left-4 animate-bounce text-2xl" style={{ animationDuration: '2.5s' }}>
                💖
              </div>
              <div className="absolute -bottom-2 -right-4 animate-bounce text-2xl" style={{ animationDuration: '3s' }}>
                💋
              </div>
              <div className="absolute top-1/2 -right-6 animate-pulse text-xl">
                ✨
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-1">
              <span className="px-5 py-2.5 rounded-full bg-rose-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-500/25 group-hover:bg-rose-600 transition flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Click to Open the Gift Box!
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs text-rose-500 font-handwritten text-lg mt-1">
                A special surprise awaits you, Ishika ❤️
              </span>
            </div>
          </div>
        ) : (
          /* Box Opened Reveal */
          <div className="w-full flex flex-col items-center animate-in zoom-in-95 duration-500 space-y-6">
            {/* Revealed Message: Exact words */}
            <div className="text-center p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-rose-200 shadow-xl max-w-xl w-full">
              <div className="text-4xl sm:text-5xl mb-2">🎁✨</div>
              <h2 className="font-handwritten text-3xl sm:text-5xl font-bold text-rose-600 tracking-wide">
                mera pyaaraa cutu baccha
              </h2>
              <p className="text-xs sm:text-sm text-rose-400 mt-2 font-medium">
                You opened my heart's lock! You mean the absolute world to me. 💖
              </p>
            </div>

            {/* Clearly marked placeholder for OUR PHOTO */}
            <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl p-6 border-2 border-dashed border-rose-300 shadow-lg text-center flex flex-col items-center relative overflow-hidden">
              <div className="flex items-center justify-between w-full mb-3 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                  OUR PHOTO PLACEHOLDER
                </span>
                <label className="text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 hover:bg-rose-100 transition">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Change Photo</span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>

              {customPhoto ? (
                <div
                  className="relative group rounded-2xl overflow-hidden shadow-md cursor-pointer border-2 border-rose-200 w-full"
                  onClick={() => onOpenPhotoModal?.(customPhoto, 'Our Special Love Photo')}
                >
                  <img
                    src={customPhoto}
                    onError={handleAssetImageError}
                    alt="Our Photo"
                    referrerPolicy="no-referrer"
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-medium flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5" /> Click to view full size
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-72 border-2 border-dashed border-rose-200 rounded-2xl flex flex-col items-center justify-center gap-3 p-4 bg-rose-50/30">
                  <Camera className="w-12 h-12 text-rose-300" />
                  <span className="font-semibold text-sm text-rose-700">OUR PHOTO</span>
                  <p className="text-xs text-rose-400 max-w-xs">
                    Upload our favorite couple picture here to personalize this intro section!
                  </p>
                </div>
              )}

              <p className="font-handwritten text-xl text-rose-700 mt-4">
                Priyansh loves Ishika with every beat of his heart ❤️
              </p>
            </div>

            {/* Cute Kiss Interactive Box */}
            <div
              onClick={handleKissClick}
              className="relative w-full max-w-md bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-4 border border-rose-200 text-center cursor-pointer select-none overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="text-xs uppercase tracking-wider font-bold text-rose-500 mb-1">
                Tap anywhere inside this box to send kisses 💋
              </div>
              <div className="text-rose-700 font-handwritten text-2xl font-bold">
                Kisses sent: {kissCount} 💋
              </div>

              {/* Render dynamic kisses */}
              {kisses.map((k) => (
                <span
                  key={k.id}
                  className="absolute animate-kiss-pop text-2xl pointer-events-none"
                  style={{ left: `${k.x - 12}px`, top: `${k.y - 12}px` }}
                >
                  💋
                </span>
              ))}
            </div>

            {/* Next Page CTA Button */}
            <div className="pt-4">
              <button
                onClick={onNextPage}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-base shadow-xl shadow-rose-500/25 hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                <span>Proceed to Page 2 — My Baby Girl</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
