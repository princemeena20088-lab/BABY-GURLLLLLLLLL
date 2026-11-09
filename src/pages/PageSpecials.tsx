import React, { useState, useRef } from 'react';
import { Heart, Sparkles, MessageCircleHeart, Flame, Puzzle, Ribbon, ArrowLeft } from 'lucide-react';
import { DailyRemember } from '../components/DailyRemember';
import { LoveCounter } from '../components/LoveCounter';
import { KissPuzzle } from '../components/KissPuzzle';
import { CutieTasks } from '../components/CutieTasks';

interface PageSpecialsProps {
  onBackToMemories: () => void;
}

export const PageSpecials: React.FC<PageSpecialsProps> = ({ onBackToMemories }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'remember' | 'counter' | 'puzzle' | 'tasks'>('all');
  const puzzleRef = useRef<HTMLDivElement | null>(null);

  const scrollToPuzzle = () => {
    setActiveTab('puzzle');
    puzzleRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-rose-500 text-sm font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-rose-50/80 border border-rose-200">
          <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
          <span>Special Features 💗</span>
          <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
        </div>

        <h1 className="font-romantic text-3xl sm:text-5xl font-bold text-rose-950 tracking-tight">
          Our Special Romantic Playground
        </h1>
        <p className="font-handwritten text-2xl sm:text-3xl text-rose-600">
          Daily reminders, love counters, kiss puzzle &amp; cutie tasks!
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/80 backdrop-blur-xs rounded-2xl border border-rose-200 shadow-sm">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition ${
            activeTab === 'all'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50'
          }`}
        >
          View All Specials ✨
        </button>
        <button
          onClick={() => setActiveTab('remember')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition ${
            activeTab === 'remember'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50'
          }`}
        >
          <MessageCircleHeart className="w-3.5 h-3.5" />
          <span>1. Daily Remember</span>
        </button>
        <button
          onClick={() => setActiveTab('counter')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition ${
            activeTab === 'counter'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50'
          }`}
        >
          <span>💋</span>
          <span>2. Love Counter</span>
        </button>
        <button
          onClick={() => setActiveTab('puzzle')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition ${
            activeTab === 'puzzle'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50'
          }`}
        >
          <Puzzle className="w-3.5 h-3.5" />
          <span>3. Kiss Puzzle</span>
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition ${
            activeTab === 'tasks'
              ? 'bg-rose-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50'
          }`}
        >
          <Ribbon className="w-3.5 h-3.5" />
          <span>4. Cutie Tasks</span>
        </button>
      </div>

      {/* Sections Container */}
      <div className="w-full space-y-10">
        {(activeTab === 'all' || activeTab === 'remember') && (
          <section id="daily-remember">
            <DailyRemember />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'counter') && (
          <section id="love-counter">
            <LoveCounter />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'puzzle') && (
          <section id="kiss-puzzle" ref={puzzleRef}>
            <KissPuzzle />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'tasks') && (
          <section id="cutie-tasks">
            <CutieTasks onNavigateToPuzzle={scrollToPuzzle} />
          </section>
        )}
      </div>

      {/* Back to Memories CTA */}
      <div className="pt-6">
        <button
          onClick={onBackToMemories}
          className="flex items-center gap-2 px-7 py-3 rounded-full bg-white hover:bg-rose-50 text-rose-700 font-semibold text-sm border border-rose-200 shadow-sm transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Page 4 — Memories</span>
        </button>
      </div>
    </div>
  );
};
