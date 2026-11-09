import React, { useState } from 'react';
import { Heart, Check, Sparkles, Smile, MessageCircleHeart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DailyRemember: React.FC = () => {
  const [completed, setCompleted] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  const reminders = [
    {
      id: 0,
      text: 'daily kissi or pyari deni he',
      emoji: '💋',
      category: 'Kiss & Cuddle Duty',
      tip: 'Affectionate daily reminder to shower each other with sweet kisses!',
    },
    {
      id: 1,
      text: 'gussa hogi toh bhi pyari chahiye me toh Chhota sa baccha hu',
      emoji: '🥺',
      category: 'Even When Grumpy Rule',
      tip: 'No matter what happens, hugs and love come first!',
    },
    {
      id: 2,
      text: 'din me 100 kiss compulsory he',
      emoji: '💯',
      category: 'The 100-Kiss Target',
      tip: 'Playful couple target — tap below to collect virtual kisses!',
    },
    {
      id: 3,
      text: 'yaad rakhna meri life me bas tu hi hai dont worry',
      emoji: '❤️',
      category: 'Eternal Security Promise',
      tip: 'You are the only one in Priyansh’s universe, today and forever.',
    },
  ];

  const handleToggle = (id: number, e: React.MouseEvent) => {
    const newState = !completed[id];
    setCompleted((prev) => ({ ...prev, [id]: newState }));

    if (newState) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      confetti({
        particleCount: 25,
        spread: 60,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#f472b6'],
      });
    }
  };

  const completedCount = Object.values(completed).filter(Boolean).length;

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 font-bold text-xs uppercase tracking-wider border border-rose-200">
          <MessageCircleHeart className="w-4 h-4" />
          <span>Feature 1: Daily Remember Section</span>
        </div>
        <h3 className="font-romantic text-2xl sm:text-3xl font-bold text-rose-950">
          Our Daily Affectionate Reminders
        </h3>
        <p className="text-xs sm:text-sm text-rose-500 max-w-lg mx-auto">
          Playful &amp; cute reminders from Priyansh to Ishika — not strict rules, but sweet affectionate couple challenges!
        </p>

        {/* Progress pill */}
        <div className="inline-block mt-2">
          <span className="text-xs font-semibold px-3 py-1 bg-rose-100 text-rose-700 rounded-full">
            Today&apos;s Love Progress: {completedCount} / 4 Reminders Checked
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reminders.map((rem) => {
          const isDone = !!completed[rem.id];
          return (
            <div
              key={rem.id}
              onClick={(e) => handleToggle(rem.id, e)}
              className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                isDone
                  ? 'bg-rose-50/90 border-rose-400 shadow-md scale-[1.01]'
                  : 'bg-white hover:bg-rose-50/40 border-rose-200 hover:border-rose-300 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{rem.emoji}</span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isDone ? 'bg-rose-500 text-white' : 'border-2 border-rose-300 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500 block mb-1">
                  {rem.category}
                </span>

                {/* EXACT REQUIRED MESSAGE */}
                <h4 className="font-handwritten text-2xl sm:text-3xl font-bold text-rose-950 group-hover:text-rose-600 transition-colors">
                  &ldquo;{rem.text}&rdquo;
                </h4>
              </div>

              <div className="mt-3 pt-3 border-t border-rose-100 flex items-center justify-between text-xs text-rose-400">
                <span>{rem.tip}</span>
                <span className="font-semibold text-rose-600 text-[11px]">
                  {isDone ? 'Checked! ❤️' : 'Tap to complete'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
