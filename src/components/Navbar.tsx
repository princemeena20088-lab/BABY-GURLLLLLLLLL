import React, { useState } from 'react';
import { Heart, Sparkles, Palette, ChevronDown, Check } from 'lucide-react';
import { PageId, ThemeMode } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  autoRotateTheme: boolean;
  onToggleAutoRotate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onPageChange,
  theme,
  onThemeChange,
  autoRotateTheme,
  onToggleAutoRotate,
}) => {
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string; icon: string }[] = [
    { id: 'page1', label: 'Intro', icon: '🎁' },
    { id: 'page2', label: 'Baby Girl', icon: '🎀' },
    { id: 'page3', label: 'Promises', icon: '💍' },
    { id: 'page4', label: 'Memories', icon: '📸' },
    { id: 'special', label: 'Specials', icon: '💋' },
  ];

  const themes: { id: ThemeMode; label: string; dotColor: string }[] = [
    { id: 'pink', label: 'Pink Love Theme', dotColor: 'bg-rose-400' },
    { id: 'blue', label: 'Baby Blue Theme', dotColor: 'bg-sky-400' },
    { id: 'peach', label: 'Peach Orange Theme', dotColor: 'bg-orange-400' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-rose-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Zone */}
        <button
          onClick={() => onPageChange('page1')}
          className="flex items-center gap-2 group whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
          </div>
          <span className="font-romantic text-lg sm:text-xl font-bold tracking-tight text-rose-950 flex items-center gap-1.5">
            ISHIKA
            <span className="text-rose-500 inline-block animate-ping" style={{ animationDuration: '3s' }}>
              ❤️
            </span>
            PRIYANSH
          </span>
        </button>

        {/* Zone 2: Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onPageChange(link.id)}
                className={`flex items-center gap-1.5 py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-rose-600 font-semibold border-b-2 border-rose-500'
                    : 'text-slate-600 hover:text-rose-600'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action (Theme & Mode Control) */}
        <div className="relative flex items-center gap-2 shrink-0">
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            >
              <Palette className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden sm:inline">Theme:</span>
              <span className="capitalize">{theme}</span>
              <ChevronDown className="w-3 h-3 text-rose-400" />
            </button>

            {themeDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-rose-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-3 py-2 text-[11px] font-bold text-rose-400 uppercase tracking-wider border-b border-rose-50">
                  Select Theme
                </div>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onThemeChange(t.id);
                      setThemeDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                      theme === t.id ? 'bg-rose-50 text-rose-700' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${t.dotColor}`} />
                      <span>{t.label}</span>
                    </div>
                    {theme === t.id && <Check className="w-3.5 h-3.5 text-rose-600" />}
                  </button>
                ))}

                <div className="mt-2 pt-2 border-t border-rose-50 px-2">
                  <label className="flex items-center justify-between text-xs text-slate-600 cursor-pointer p-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Auto-Rotate (Every 15s)
                    </span>
                    <input
                      type="checkbox"
                      checked={autoRotateTheme}
                      onChange={onToggleAutoRotate}
                      className="accent-rose-500 rounded cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-rose-700 hover:bg-rose-50"
            aria-label="Toggle navigation menu"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-b border-rose-100 px-4 py-3 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onPageChange(link.id);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-left ${
                currentPage === link.id
                  ? 'bg-rose-50 text-rose-600 font-semibold'
                  : 'text-slate-700 hover:bg-rose-50/50'
              }`}
            >
              <span className="text-base">{link.icon}</span>
              <span>{link.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
