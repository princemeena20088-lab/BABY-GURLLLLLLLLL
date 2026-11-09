import React, { useState } from 'react';
import { Heart, Sparkles, ArrowRight, ArrowLeft, Camera, Upload, CheckCircle2 } from 'lucide-react';

interface PageBabyGirlProps {
  onNextPage: () => void;
  onPrevPage: () => void;
  onOpenPhotoModal?: (src: string, title: string) => void;
}

const BASE = import.meta.env.BASE_URL || '/';

export const PageBabyGirl: React.FC<PageBabyGirlProps> = ({ onNextPage, onPrevPage, onOpenPhotoModal }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(`${BASE}assets/aistudio/2_743c4e43.jpg`);

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
          <span>Page 2 — My Baby Girl 💗</span>
          <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
        </div>

        <h1 className="font-romantic text-3xl sm:text-5xl font-bold text-rose-950 tracking-tight">
          To My Sweetest Baby Girl Ishika
        </h1>
        <p className="font-handwritten text-xl sm:text-2xl text-rose-600">
          From the depths of Priyansh's heart ❤️
        </p>
      </div>

      {/* Main Content Card with EXACT required text */}
      <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-rose-200 shadow-xl space-y-8">
        {/* Paragraph 1: Exact words */}
        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-rose-50/80 via-pink-50/50 to-white border border-rose-100">
          <span className="text-3xl absolute -top-4 -left-2">💌</span>
          <p className="text-base sm:text-lg text-rose-950 font-medium leading-relaxed font-sans">
            Ishika, you are my sweetest, cutest little baby. I love you soooo sooooo sooooooooo much, more than words could ever express. My love for you has no limits at all. I LOVEEEEEEEE YOUUUUU SOOO SOOO SOOOOO MUCHHHH, MY BABY GIRLLLLL! Mwaaaaaaahhhh 😘💋💋
          </p>
        </div>

        {/* Priority Highlight: Exact words */}
        <div className="text-center py-4 px-6 rounded-2xl bg-rose-500 text-white shadow-md">
          <p className="text-lg sm:text-xl font-bold tracking-wide">
            You are at the very top of my priority list. You are my number one priority. ❤️
          </p>
        </div>

        {/* 3 Goals Section: Exact words */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-romantic text-2xl font-bold text-rose-900 text-center">
              I have only 3 goals in my life:
            </h3>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Goal 1 */}
            <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5 text-center flex flex-col items-center justify-center hover:scale-102 transition shadow-xs">
              <span className="text-3xl mb-2">💍</span>
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">Goal 1</span>
              <p className="font-semibold text-rose-950 text-base">
                To marry Ishika. 💍
              </p>
            </div>

            {/* Goal 2 */}
            <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5 text-center flex flex-col items-center justify-center hover:scale-102 transition shadow-xs">
              <span className="text-3xl mb-2">🩺</span>
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">Goal 2</span>
              <p className="font-semibold text-rose-950 text-base">
                To become a doctor. 🩺
              </p>
            </div>

            {/* Goal 3 */}
            <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5 text-center flex flex-col items-center justify-center hover:scale-102 transition shadow-xs">
              <span className="text-3xl mb-2">❤️🥹</span>
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-1">Goal 3</span>
              <p className="font-semibold text-rose-950 text-base">
                To always keep Ishika happy and have her by my side forever. ❤️🥹
              </p>
            </div>
          </div>
        </div>

        {/* Paragraph 3: Exact words */}
        <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200/70 text-center">
          <p className="text-base sm:text-lg text-rose-950 font-medium leading-relaxed font-sans">
            I would go to any lengths for Ishika. She is the oxygen of my life, and I can't imagine my life without her, not even for a moment. ❤️🥹
          </p>
        </div>

        {/* Empty OUR PHOTO placeholder with upload functionality */}
        <div className="border-2 border-dashed border-rose-300 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center bg-rose-50/30">
          <div className="flex items-center justify-between w-full mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-100/70 px-3 py-1 rounded-full border border-rose-200">
              OUR PHOTO PLACEHOLDER
            </span>

            <label className="text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-rose-200 shadow-xs hover:bg-rose-50 transition">
              <Upload className="w-3.5 h-3.5" />
              <span>{photoUrl ? 'Replace Photo' : 'Upload Our Photo'}</span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
          </div>

          {photoUrl ? (
            <div
              className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer border-2 border-rose-200 w-full max-w-md"
              onClick={() => onOpenPhotoModal?.(photoUrl, 'My Sweetest Baby')}
            >
              <img
                src={photoUrl}
                alt="My Sweetest Baby"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-medium flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5" /> Click for full-screen view
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 px-4">
              <Camera className="w-12 h-12 text-rose-400 mx-auto mb-2" />
              <h4 className="font-bold text-rose-900 text-base">OUR PHOTO</h4>
              <p className="text-xs text-rose-500 mt-1 max-w-sm">
                This empty placeholder is reserved for our special photo. Click the upload button above to add our moment!
              </p>
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
          <span>Page 1 — Intro</span>
        </button>

        <button
          onClick={onNextPage}
          className="flex items-center gap-2 px-7 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/25 hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          <span>Page 3 — My Promises</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
