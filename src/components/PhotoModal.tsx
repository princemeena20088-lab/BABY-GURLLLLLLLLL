import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Download, Heart } from 'lucide-react';
import { MediaItem } from '../types';

interface PhotoModalProps {
  media: MediaItem | null;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ media, onClose }) => {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!media) return null;

  const imgSrc = media.customUploadedUrl || media.filePath;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl p-3 sm:p-5 shadow-2xl flex flex-col items-center border border-rose-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar inside modal */}
        <div className="w-full flex items-center justify-between pb-3 px-2 border-b border-rose-100">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
              {media.numberPrefix}
            </span>
            <div className="leading-tight">
              <h3 className="font-bold text-rose-950 text-sm sm:text-base flex items-center gap-1">
                {media.title}
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline" />
              </h3>
              {media.subtitle && (
                <p className="text-xs text-rose-500 font-medium">{media.subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomed(!zoomed)}
              title={zoomed ? 'Zoom Out' : 'Zoom In'}
              className="p-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 transition"
            >
              {zoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>
            <a
              href={imgSrc}
              download={`Ishika-Priyansh-${media.numberPrefix}.jpg`}
              title="Download Photo"
              className="p-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 transition"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              title="Close"
              className="p-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image Display */}
        <div className="relative mt-3 flex-1 flex items-center justify-center overflow-auto max-h-[72vh] w-full rounded-2xl bg-rose-50/50">
          <img
            src={imgSrc}
            alt={media.title}
            referrerPolicy="no-referrer"
            className={`max-w-full max-h-[70vh] object-contain rounded-xl transition-transform duration-300 ${
              zoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
            }`}
            onClick={() => setZoomed(!zoomed)}
          />
        </div>

        <div className="mt-2 text-center text-xs text-rose-400 font-handwritten text-lg">
          Ishika ❤️ Priyansh · Forever & Always
        </div>
      </div>
    </div>
  );
};
