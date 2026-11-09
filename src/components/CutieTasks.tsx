import React, { useState, useEffect } from 'react';
import {
  Check,
  Heart,
  Sparkles,
  Send,
  Smile,
  HeartHandshake,
  Volume2,
  Trophy,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CutieTaskItem } from '../types';

const STORAGE_KEY = 'ishika_priyansh_cutie_tasks';

export const CutieTasks: React.FC<{ onNavigateToPuzzle?: () => void }> = ({ onNavigateToPuzzle }) => {
  const [tasks, setTasks] = useState<CutieTaskItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'task-1',
        title: 'Send a cute message',
        description: 'Send a sweet WhatsApp or note saying "I love you Priyansh"',
        completed: false,
        actionType: 'message',
      },
      {
        id: 'task-2',
        title: 'Share a favourite memory',
        description: 'Reminisce about our funniest or most romantic date together',
        completed: false,
        actionType: 'memory',
      },
      {
        id: 'task-3',
        title: 'Give a virtual hug',
        description: 'Tap to send a warm, tight virtual cuddle',
        completed: false,
        actionType: 'hug',
      },
      {
        id: 'task-4',
        title: 'Send a virtual kiss',
        description: 'Shower the screen with romantic kiss reactions',
        completed: false,
        actionType: 'kiss',
      },
      {
        id: 'task-5',
        title: 'Say something sweet',
        description: 'Tell Priyansh one thing that always makes you smile',
        completed: false,
        actionType: 'sweet',
      },
      {
        id: 'task-6',
        title: 'Complete a cute puzzle',
        description: 'Solve the 3x3 photo tile kiss puzzle above',
        completed: false,
        actionType: 'puzzle',
      },
    ];
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [userNote, setUserNote] = useState('');
  const [sweetQuote, setSweetQuote] = useState('');

  const sweetCompliments = [
    'Ishika, your smile lights up my whole world 🌟',
    'You are the best thing that ever happened to Priyansh ❤️',
    'Nobody has eyes as mesmerizing and warm as yours ✨',
    'I choose you, in every lifetime, without a second thought 💍',
    'You are my cutest, sweetest baby girl forever 🌸',
  ];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // ignore
    }
  }, [tasks]);

  const toggleTask = (id: string, e?: React.MouseEvent) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.completed;
          if (nextState) {
            confetti({
              particleCount: 30,
              spread: 60,
              origin: e
                ? { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
                : { y: 0.7 },
              colors: ['#f43f5e', '#fb7185', '#ec4899'],
            });
          }
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  const handleAction = (task: CutieTaskItem, e: React.MouseEvent) => {
    if (task.actionType === 'hug') {
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#38bdf8', '#0284c7', '#f43f5e'],
      });
      toggleTask(task.id, e);
    } else if (task.actionType === 'kiss') {
      confetti({
        particleCount: 50,
        spread: 90,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#f43f5e', '#fb7185', '#fda4af'],
      });
      toggleTask(task.id, e);
    } else if (task.actionType === 'sweet') {
      const rand = sweetCompliments[Math.floor(Math.random() * sweetCompliments.length)];
      setSweetQuote(rand);
      setActiveModal('sweet');
      toggleTask(task.id, e);
    } else if (task.actionType === 'puzzle') {
      onNavigateToPuzzle?.();
      toggleTask(task.id, e);
    } else {
      setActiveModal(task.id);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-rose-500 font-bold text-xs uppercase tracking-wider mb-1">
            <span>🎀</span>
            <span>Feature 4: Cutie Tasks</span>
          </div>
          <h3 className="font-romantic text-2xl sm:text-3xl font-bold text-rose-950">
            Interactive Cutie Couple Tasks 🎀❤️
          </h3>
          <p className="text-xs text-rose-500">
            Small loving actions to brighten each other&apos;s day. Check them off together!
          </p>
        </div>

        <button
          onClick={() => {
            const reset = tasks.map((t) => ({ ...t, completed: false }));
            setTasks(reset);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
          }}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-full border border-rose-200 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Tasks</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 bg-rose-50/60 p-4 rounded-2xl border border-rose-100">
        <div className="flex justify-between items-center text-xs font-bold text-rose-800">
          <span>Couple Tasks Progress</span>
          <span className="tabular-nums">
            {completedCount} / {tasks.length} Completed
          </span>
        </div>
        <div className="w-full h-2.5 bg-rose-200/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500 rounded-full"
            style={{ width: `${(completedCount / tasks.length) * 100}%` }}
          />
        </div>
        {completedCount === tasks.length && (
          <p className="text-xs text-rose-600 font-semibold text-center pt-1 animate-pulse">
            All cutie tasks finished! Priyansh and Ishika couple goals unlocked! 🏆💖
          </p>
        )}
      </div>

      {/* Tasks List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-2xl border-2 transition-all duration-200 flex items-start gap-3 justify-between ${
              task.completed
                ? 'bg-rose-50/80 border-rose-300 shadow-xs'
                : 'bg-white border-rose-200/80 hover:border-rose-300 shadow-xs'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={(e) => toggleTask(task.id, e)}
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors cursor-pointer ${
                  task.completed
                    ? 'bg-rose-500 text-white'
                    : 'border-2 border-rose-300 hover:border-rose-500 text-transparent'
                }`}
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </button>

              <div>
                <h4
                  className={`text-sm font-bold transition-all ${
                    task.completed ? 'line-through text-rose-400' : 'text-rose-950'
                  }`}
                >
                  {task.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">{task.description}</p>
              </div>
            </div>

            <button
              onClick={(e) => handleAction(task, e)}
              className="px-3 py-1 text-xs font-semibold rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 shrink-0 transition cursor-pointer"
            >
              Action ✨
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Modal for Sweet message / note */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-rose-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-rose-100">
              <h4 className="font-romantic text-xl font-bold text-rose-950 flex items-center gap-1.5">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                {activeModal === 'sweet' ? 'Sweet Words for You' : 'Write Love Message'}
              </h4>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            {activeModal === 'sweet' ? (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-3">
                <p className="font-handwritten text-2xl text-rose-900 font-bold leading-relaxed">
                  &ldquo;{sweetQuote}&rdquo;
                </p>
                <button
                  onClick={() => {
                    const rand = sweetCompliments[Math.floor(Math.random() * sweetCompliments.length)];
                    setSweetQuote(rand);
                  }}
                  className="px-4 py-1.5 text-xs font-semibold rounded-full bg-rose-500 text-white shadow-xs"
                >
                  Another sweet quote 💕
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  placeholder="Write your cute message or favorite memory..."
                  rows={4}
                  className="w-full p-3 rounded-xl border border-rose-200 text-sm focus:outline-rose-500 bg-rose-50/20"
                />
                <button
                  onClick={() => {
                    setActiveModal(null);
                    setUserNote('');
                    confetti({ particleCount: 30, spread: 50 });
                  }}
                  className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition"
                >
                  Send &amp; Complete Task ❤️
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
