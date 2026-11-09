import React, { useState } from 'react';
import { X, Upload, Image, Video, Check } from 'lucide-react';

interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (fileUrl: string, type: 'photo' | 'video' | 'screenshot', title?: string) => void;
  defaultType?: 'photo' | 'video' | 'screenshot';
  slotTitle?: string;
}

export const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
  defaultType = 'photo',
  slotTitle = 'Personal Media',
}) => {
  const [selectedType, setSelectedType] = useState<'photo' | 'video' | 'screenshot'>(defaultType);
  const [title, setTitle] = useState(slotTitle);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFileName(file.name);
      if (!title || title === slotTitle) {
        setTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSave = () => {
    if (previewUrl) {
      onUploadSuccess(previewUrl, selectedType, title);
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-rose-100 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-rose-100">
          <div className="flex items-center gap-2 text-rose-600 font-bold">
            <Upload className="w-5 h-5" />
            <span>Upload for: {slotTitle}</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-rose-50 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 p-1 bg-rose-50 rounded-xl">
          <button
            type="button"
            onClick={() => setSelectedType('photo')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
              selectedType === 'photo' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600'
            }`}
          >
            Photo
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('video')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
              selectedType === 'video' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600'
            }`}
          >
            Video
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('screenshot')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
              selectedType === 'screenshot' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600'
            }`}
          >
            Screenshot
          </button>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Title / Caption</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-xl border border-rose-200 focus:outline-rose-500 bg-rose-50/30"
            placeholder="Enter a sweet title..."
          />
        </div>

        <div className="border-2 border-dashed border-rose-200 hover:border-rose-400 rounded-2xl p-6 text-center transition cursor-pointer relative bg-rose-50/20">
          <input
            type="file"
            accept={selectedType === 'video' ? 'video/*' : 'image/*'}
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />

          {previewUrl ? (
            <div className="flex flex-col items-center gap-2">
              {selectedType === 'video' ? (
                <video src={previewUrl} className="max-h-36 rounded-lg object-contain shadow-xs" controls />
              ) : (
                <img src={previewUrl} alt="Preview" className="max-h-36 rounded-lg object-contain shadow-xs" />
              )}
              <span className="text-xs text-rose-600 font-medium truncate max-w-[200px]">{fileName}</span>
              <span className="text-[11px] text-slate-400">Click to change file</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-rose-400">
              {selectedType === 'video' ? <Video className="w-8 h-8" /> : <Image className="w-8 h-8" />}
              <span className="text-xs font-medium text-slate-600">Choose {selectedType} from your device</span>
              <span className="text-[11px] text-slate-400">PNG, JPG, MP4 or WEBM</span>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            disabled={!previewUrl}
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white rounded-xl transition shadow-md ${
              previewUrl ? 'bg-rose-500 hover:bg-rose-600 cursor-pointer' : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            <Check className="w-4 h-4" />
            Place Media
          </button>
        </div>
      </div>
    </div>
  );
};
