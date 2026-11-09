import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  Camera,
  Play,
  Upload,
  Video,
  MessageSquare,
  Calendar,
  Maximize2,
  ArrowLeft,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { MediaItem } from '../types';
import { INITIAL_MEDIA_SEQUENCE, CHAT_SCREENSHOTS } from '../constants/mediaData';

interface PageMemoriesProps {
  onOpenPhotoModal: (media: MediaItem) => void;
  onOpenUploadModal: (slotTitle: string, defaultType: 'photo' | 'video' | 'screenshot') => void;
  onGoToSpecials: () => void;
  onPrevPage: () => void;
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


export const PageMemories: React.FC<PageMemoriesProps> = ({
  onOpenPhotoModal,
  onOpenUploadModal,
  onGoToSpecials,
  onPrevPage,
}) => {
  const [mediaList, setMediaList] = useState<MediaItem[]>(INITIAL_MEDIA_SEQUENCE);
  const [activeVideoSlot, setActiveVideoSlot] = useState<string>(`${BASE}assets/aistudio/11_68c36dc9.mp4`);
  const [customScreenshots, setCustomScreenshots] = useState<string[]>([]);

  const handleMediaUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, customUploadedUrl: url } : item))
      );
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setActiveVideoSlot(url);
    }
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomScreenshots((prev) => [...prev, url]);
    }
  };

  const timelineEvents = [
    {
      period: 'The First Spark',
      title: 'When Our Eyes Met',
      desc: 'The beautiful day Priyansh fell hopelessly in love with Ishika.',
      icon: '✨',
    },
    {
      period: 'Sweet Togetherness',
      title: 'Our First Kisses & Laughs',
      desc: 'Unforgettable moments full of giggles, cheek pulling, and endless love.',
      icon: '💋',
    },
    {
      period: 'Unbreakable Bond',
      title: 'Standing By You Forever',
      desc: 'Walking hand in hand through thick and thin, choosing you every single day.',
      icon: '💍',
    },
    {
      period: 'Our Beautiful Future',
      title: 'Dr. Priyansh & Mrs. Ishika',
      desc: 'Building a dream life together, keeping Ishika smiling forever & always.',
      icon: '🩺',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-rose-500 text-sm font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-rose-50/80 border border-rose-200">
          <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
          <span>Page 4 — Our Memories 🥹❤️</span>
          <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
        </div>

        <h1 className="font-romantic text-3xl sm:text-5xl md:text-6xl font-bold text-rose-950 tracking-tight">
          Our Precious Memories Together
        </h1>
        <p className="font-handwritten text-2xl sm:text-3xl text-rose-600">
          Strictly ordered memories of Priyansh & Ishika ❤️
        </p>
      </div>

      {/* Memories Timeline */}
      <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-rose-200 shadow-xl space-y-6">
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5 text-rose-500" />
            <h2 className="font-romantic text-2xl sm:text-3xl font-bold text-rose-950">
              Our Love Story Timeline
            </h2>
          </div>
          <p className="font-handwritten text-xl text-rose-600">
            From every first memory to our forever future ✨
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {timelineEvents.map((event, idx) => (
            <div
              key={idx}
              className="relative p-5 rounded-2xl bg-gradient-to-b from-rose-50/70 to-white border border-rose-200/80 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:scale-102 transition"
            >
              <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center text-xl shadow-md mb-3">
                {event.icon}
              </div>
              <span className="text-[11px] font-bold text-rose-500 tracking-wider uppercase mb-1">
                {event.period}
              </span>
              <h4 className="font-bold text-rose-950 text-base mb-1.5">{event.title}</h4>
              <p className="text-xs text-rose-800/80 leading-relaxed">{event.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strict Media Sequence (01 to 14) */}
      <div className="w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-romantic text-2xl sm:text-4xl font-bold text-rose-950">
            Personal Media Gallery — Exact Order (01–14)
          </h2>
          <p className="text-xs sm:text-sm text-rose-500 font-medium">
            Strict numerical sequence preserved · Uncropped original frames · Click any photo for full screen
          </p>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {mediaList.map((item) => {
            const currentSrc = item.customUploadedUrl || item.filePath;

            // Slot 11: Dedicated Personal Video
            if (item.id === 11) {
              return (
                <div
                  key={item.id}
                  className="col-span-1 md:col-span-2 lg:col-span-3 bg-white/95 rounded-3xl p-6 sm:p-8 border-2 border-rose-300 shadow-xl flex flex-col space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        {item.numberPrefix}
                      </span>
                      <div>
                        <h3 className="font-bold text-rose-950 text-lg flex items-center gap-1.5">
                          {item.title}
                        </h3>
                        <p className="text-xs text-rose-500 font-medium">
                          {item.subtitle} (Strictly Reserved for Video)
                        </p>
                      </div>
                    </div>

                    <label className="text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer flex items-center gap-1 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200 hover:bg-rose-100 transition">
                      <Video className="w-3.5 h-3.5" />
                      <span>Upload New Video</span>
                      <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                    </label>
                  </div>

                  {/* Video Player */}
                  <div className="relative rounded-2xl overflow-hidden bg-black/90 shadow-2xl max-w-2xl mx-auto w-full aspect-video flex items-center justify-center">
                    <video
                      src={activeVideoSlot}
                      controls
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="text-center font-handwritten text-xl text-rose-700 pt-1">
                    Every second of this video reminds me why I want you forever ❤️
                  </div>
                </div>
              );
            }

            // Slot 14: Chat Screenshots Gallery
            if (item.id === 14) {
              return (
                <div
                  key={item.id}
                  className="col-span-1 md:col-span-2 lg:col-span-3 bg-white/95 rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-xl space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        14
                      </span>
                      <div>
                        <h3 className="font-bold text-rose-950 text-lg flex items-center gap-1.5">
                          {item.title}
                        </h3>
                        <p className="text-xs text-rose-500 font-medium">
                          Exactly 2 Screenshots of Our Cute Conversations Gallery
                        </p>
                      </div>
                    </div>

                    <label className="text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer flex items-center gap-1 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200 hover:bg-rose-100 transition">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Extra Screenshot</span>
                      <input type="file" accept="image/*" onChange={handleScreenshotUpload} className="hidden" />
                    </label>
                  </div>

                  {/* 2 Chat Screenshots Gallery */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {CHAT_SCREENSHOTS.map((chat, cIdx) => (
                      <div
                        key={cIdx}
                        className="bg-rose-50/50 rounded-2xl p-4 border border-rose-200 flex flex-col items-center space-y-3 shadow-xs hover:shadow-md transition"
                      >
                        <div className="flex items-center justify-between w-full text-xs font-bold text-rose-900">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
                            {chat.title}
                          </span>
                          <span className="text-rose-500 text-[11px]">Screenshot {cIdx + 1}</span>
                        </div>

                        <div
                          className="relative group rounded-xl overflow-hidden cursor-pointer border border-rose-200 bg-white max-h-[500px] w-full flex items-center justify-center"
                          onClick={() =>
                            onOpenPhotoModal({
                              id: 14,
                              numberPrefix: `14-${cIdx + 1}`,
                              type: 'screenshot',
                              title: chat.title,
                              subtitle: chat.caption,
                              filePath: chat.filePath,
                            })
                          }
                        >
                          <img
                            src={chat.filePath}
                    onError={handleAssetImageError}
                            alt={chat.title}
                            referrerPolicy="no-referrer"
                            className="max-h-[480px] w-auto object-contain group-hover:scale-102 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium gap-1">
                            <Maximize2 className="w-4 h-4" /> Click to view full screenshot
                          </div>
                        </div>

                        <p className="text-xs text-rose-600 font-handwritten text-lg text-center">
                          {chat.caption}
                        </p>
                      </div>
                    ))}

                    {/* Any additional uploaded screenshots */}
                    {customScreenshots.map((shot, sIdx) => (
                      <div
                        key={`custom-${sIdx}`}
                        className="bg-rose-50/50 rounded-2xl p-4 border border-rose-200 flex flex-col items-center space-y-3 shadow-xs"
                      >
                        <div className="flex items-center justify-between w-full text-xs font-bold text-rose-900">
                          <span>Personal Screenshot {sIdx + 3}</span>
                        </div>
                        <div
                          className="relative group rounded-xl overflow-hidden cursor-pointer border border-rose-200 bg-white max-h-[500px] w-full flex items-center justify-center"
                          onClick={() =>
                            onOpenPhotoModal({
                              id: 14,
                              numberPrefix: `14-extra`,
                              type: 'screenshot',
                              title: 'Personal Chat Screenshot',
                              filePath: shot,
                            })
                          }
                        >
                          <img
                            src={shot}
                            alt="Custom Screenshot"
                            referrerPolicy="no-referrer"
                            className="max-h-[480px] w-auto object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            // Standard Photo Slots: 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 12, 13
            return (
              <div
                key={item.id}
                className="bg-white/95 rounded-3xl p-5 border border-rose-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Header of Photo Card */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center">
                      {item.numberPrefix}
                    </span>
                    <h3 className="font-bold text-rose-950 text-sm truncate max-w-[180px]">
                      {item.title}
                    </h3>
                  </div>

                  <label className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 cursor-pointer flex items-center gap-1 bg-rose-50 px-2 py-1 rounded-full border border-rose-200 hover:bg-rose-100 transition">
                    <Upload className="w-3 h-3" />
                    <span>Replace</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleMediaUpload(item.id, e)}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Photo Display - Clickable for Full Screen Viewing */}
                <div
                  className="relative rounded-2xl overflow-hidden cursor-pointer border border-rose-100 bg-rose-50/30 flex items-center justify-center"
                  style={{ height: '320px' }}
                  onClick={() => onOpenPhotoModal(item)}
                >
                  <img
                    src={currentSrc}
                    onError={handleAssetImageError}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                    <span className="text-white text-xs font-medium flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5" /> Full screen
                    </span>
                    <span className="text-xs text-rose-200 font-handwritten text-lg">
                      Ishika & Priyansh
                    </span>
                  </div>
                </div>

                {/* Subtitle / Note */}
                <div className="mt-3 text-center">
                  <p className="text-xs text-rose-500 font-medium">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ending Text: EXACT REQUIRED WORDS */}
      <div className="w-full max-w-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-3 relative overflow-hidden">
        <div className="text-3xl mb-1">💍💖✨</div>
        <h3 className="font-romantic text-2xl sm:text-4xl font-extrabold tracking-wide">
          alwas remember u r mine(emojies) 💖💋❤️🥰💍🫶
        </h3>
        <p className="font-handwritten text-xl sm:text-2xl text-rose-100">
          Forever and ever, my sweetest Ishika. Yours, Priyansh.
        </p>
      </div>

      {/* Bottom Navigation */}
      <div className="w-full flex items-center justify-between pt-6 gap-4">
        <button
          onClick={onPrevPage}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-rose-50 text-rose-700 font-semibold text-sm border border-rose-200 shadow-sm transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Page 3 — Promises</span>
        </button>

        <button
          onClick={onGoToSpecials}
          className="flex items-center gap-2 px-7 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/25 hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          <span>Explore Cute Specials 💗</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
