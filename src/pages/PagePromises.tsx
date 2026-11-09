import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight, ArrowLeft, ShieldCheck, Upload, Camera } from 'lucide-react';

interface PagePromisesProps {
  onNextPage: () => void;
  onPrevPage: () => void;
  onOpenPhotoModal?: (src: string, title: string) => void;
}

export const PagePromises: React.FC<PagePromisesProps> = ({ onNextPage, onPrevPage, onOpenPhotoModal }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>('/assets/aistudio/4_5d74e873.jpg');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
      {/* Page Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 text-rose-500 text-sm font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-rose-50/80 border border-rose-200">
          <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
          <span>Page 3 — My Promises ❤️</span>
          <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
        </div>

        <h1 className="font-romantic text-3xl sm:text-5xl font-bold text-rose-950 tracking-tight">
          Forever Promises to Ishika
        </h1>
        <p className="font-handwritten text-xl sm:text-2xl text-rose-600">
          Pure loyalty, eternal love &amp; respect ❤️✨
        </p>
      </div>

      {/* Main Promises Card with EXACT required text */}
      <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-rose-200 shadow-xl space-y-8">
        {/* Decorative emojis around top */}
        <div className="flex items-center justify-center gap-3 text-2xl">
          <span>💖</span>
          <span>🌸</span>
          <span>💍</span>
          <span>✨</span>
          <span>🌹</span>
          <span>💕</span>
        </div>

        {/* Promise 1: EXACT TEXT */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 border border-rose-200 shadow-xs relative">
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-1">❤️</span>
            <p className="text-base sm:text-lg text-rose-950 font-medium leading-relaxed font-sans">
              Ishika, I&apos;m saying this with all my heart and with the most genuine feelings. I truly want only you. I don&apos;t need anyone else because you are the one I choose, every single day. ❤️
            </p>
          </div>
        </div>

        {/* Promise 2: EXACT TEXT */}
        <div className="p-6 rounded-2xl bg-white border border-rose-200 shadow-xs relative">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-rose-500 shrink-0 mt-1" />
            <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed font-sans">
              I&apos;m not the kind of guy who has a girlfriend but still seeks attention from other girls. I believe in loyalty, honesty and giving my girl the love and respect she deserves. I know every person is different, but I want to show you through my actions that you can trust me.
            </p>
          </div>
        </div>

        {/* Promise 3: EXACT TEXT */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-100/70 via-pink-100/70 to-rose-100/70 border border-rose-200/90 shadow-xs relative">
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-1">🥹</span>
            <p className="text-base sm:text-lg text-rose-950 font-semibold leading-relaxed font-sans">
              After all, I&apos;m your sweet little baby, and I just want to be yours, make you happy and build a beautiful future together. 🥹❤️💋
            </p>
          </div>
        </div>

        {/* Sweet message replacement with cutie emojis */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 border border-rose-200 text-center shadow-xs">
          <p className="font-handwritten text-3xl sm:text-4xl text-rose-600 font-bold tracking-wide">
            i lovee u sooo muchh ishika 🥹❤️💋✨🎀🥰
          </p>
        </div>

        {/* Bottom decorative emojis */}
        <div className="flex items-center justify-center gap-3 text-2xl pt-2">
          <span>💋</span>
          <span>🤍</span>
          <span>🫶</span>
          <span>✨</span>
          <span>🧸</span>
          <span>💋</span>
        </div>

        {/* Photo slot for Promises page */}
        <div className="border-2 border-dashed border-rose-200 rounded-3xl p-6 flex flex-col items-center justify-center bg-rose-50/20">
          <div className="flex items-center justify-between w-full mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Together Forever Memory
            </span>
            <label className="text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-rose-200 hover:bg-rose-50 transition">
              <Upload className="w-3.5 h-3.5" />
              <span>Change Photo</span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
          </div>

          {photoUrl && (
            <div
              className="relative group rounded-2xl overflow-hidden shadow-md cursor-pointer border border-rose-200 w-full max-w-sm"
              onClick={() => onOpenPhotoModal?.(photoUrl, 'I Will Always Stand Beside You')}
            >
              <img
                src={photoUrl}
                alt="Together Forever"
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-medium flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5" /> Click to view full size
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full flex items-center justify-between pt-8 gap-4">
        <button
          onClick={onPrevPage}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-rose-50 text-rose-700 font-semibold text-sm border border-rose-200 shadow-sm transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Page 2 — Baby Girl</span>
        </button>

        <button
          onClick={onNextPage}
          className="flex items-center gap-2 px-7 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/25 hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          <span>Page 4 — Our Memories</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
