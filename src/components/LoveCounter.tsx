import React, { useState, useEffect } from 'react';
import { Heart, RotateCcw, Sparkles, Flame, Save } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LoveCounters } from '../types';

const STORAGE_KEY = 'ishika_priyansh_love_counters';

export const LoveCounter: React.FC = () => {
  const [counters, setCounters] = useState<LoveCounters>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return {
      kisses: 100, // Starts at the 100 kiss target!
      hugs: 48,
      hearts: 999,
      lastUpdatedDate: new Date().toLocaleDateString(),
    };
  });

  const [flyingHearts, setFlyingHearts] = useState<{ id: number; char: string; x: number; y: number }[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
    } catch {
      // ignore
    }
  }, [counters]);

  const triggerFlyEffect = (char: string, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    const id = Date.now() + Math.random();
    setFlyingHearts((prev) => [...prev.slice(-10), { id, char, x, y }]);

    setTimeout(() => {
      setFlyingHearts((prev) => prev.filter((item) => item.id !== id));
    }, 1200);
  };

  const incrementKiss = (e: React.MouseEvent) => {
    setCounters((prev) => ({ ...prev, kisses: prev.kisses + 1 }));
    triggerFlyEffect('💋', e);
    confetti({
      particleCount: 15,
      spread: 40,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
      colors: ['#f43f5e', '#fb7185'],
    });
  };

  const incrementHug = (e: React.MouseEvent) => {
    setCounters((prev) => ({ ...prev, hugs: prev.hugs + 1 }));
    triggerFlyEffect('🫂', e);
  };

  const incrementHeart = (e: React.MouseEvent) => {
    setCounters((prev) => ({ ...prev, hearts: prev.hearts + 1 }));
    triggerFlyEffect('💖', e);
  };

  const resetDaily = () => {
    if (window.confirm('Reset the daily love counter back to fresh target values?')) {
      const resetState = {
        kisses: 0,
        hugs: 0,
        hearts: 0,
        lastUpdatedDate: new Date().toLocaleDateString(),
      };
      setCounters(resetState);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resetState));
    }
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xl space-y-6 relative overflow-hidden">
      {/* Flying emoji animations */}
      {flyingHearts.map((item) => (
        <span
          key={item.id}
          className="fixed z-50 text-3xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
            transform: 'translate(-50%, -100px) scale(1.6)',
            opacity: 0,
            animation: 'kissPop 0.8s ease-out forwards',
          }}
        >
          {item.char}
        </span>
      ))}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-rose-500 font-bold text-xs uppercase tracking-wider mb-1">
            <span>💋</span>
            <span>Feature 2: Cute Love Counter</span>
          </div>
          <h3 className="font-romantic text-2xl sm:text-3xl font-bold text-rose-950">
            Interactive Love &amp; Kiss Counter
          </h3>
          <p className="text-xs text-rose-500">
            Tap the animated buttons to shower Ishika with love! Progress saves automatically.
          </p>
        </div>

        <button
          onClick={resetDaily}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-full border border-rose-200 transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Daily Counter</span>
        </button>
      </div>

      {/* Counters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Kiss Counter */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-300 flex flex-col items-center text-center shadow-sm hover:shadow-md transition">
          <div className="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center text-3xl shadow-md mb-2">
            💋
          </div>
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
            Daily Kiss Counter
          </span>
          <div className="font-romantic text-4xl sm:text-5xl font-black text-rose-950 my-2 tabular-nums">
            {counters.kisses}
          </div>
          <p className="text-[11px] text-rose-400 mb-4">
            Goal: 100 kisses daily compulsory!
          </p>
          <button
            onClick={incrementKiss}
            className="w-full py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Send Kiss 💋</span>
          </button>
        </div>

        {/* Hug Counter */}
        <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-6 border-2 border-sky-300 flex flex-col items-center text-center shadow-sm hover:shadow-md transition">
          <div className="w-14 h-14 rounded-full bg-sky-500 text-white flex items-center justify-center text-3xl shadow-md mb-2">
            🫂
          </div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Warm Hug Counter
          </span>
          <div className="font-romantic text-4xl sm:text-5xl font-black text-sky-950 my-2 tabular-nums">
            {counters.hugs}
          </div>
          <p className="text-[11px] text-sky-400 mb-4">
            Tight cuddles &amp; cozy embraces
          </p>
          <button
            onClick={incrementHug}
            className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Give Hug 🫂</span>
          </button>
        </div>

        {/* Heart Counter */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-orange-300 flex flex-col items-center text-center shadow-sm hover:shadow-md transition">
          <div className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center text-3xl shadow-md mb-2">
            💖
          </div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
            Eternal Heart Counter
          </span>
          <div className="font-romantic text-4xl sm:text-5xl font-black text-orange-950 my-2 tabular-nums">
            {counters.hearts}
          </div>
          <p className="text-[11px] text-orange-400 mb-4">
            Priyansh&apos;s heartbeat rate for Ishika
          </p>
          <button
            onClick={incrementHeart}
            className="w-full py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Beat Heart 💖</span>
          </button>
        </div>
      </div>

      <div className="text-center pt-2 text-xs text-rose-500 flex items-center justify-center gap-2">
        <Save className="w-3.5 h-3.5" />
        <span>Counters automatically preserved in browser storage for Ishika &amp; Priyansh</span>
      </div>
    </div>
  );
};
