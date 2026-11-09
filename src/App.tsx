import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { PageId, ThemeMode, MediaItem } from './types';
import { Navbar } from './components/Navbar';
import { FloatingHearts } from './components/FloatingHearts';
import { MusicPlayer } from './components/MusicPlayer';
import { PhotoModal } from './components/PhotoModal';
import { MediaUploadModal } from './components/MediaUploadModal';
import { PageIntroduction } from './pages/PageIntroduction';
import { PageBabyGirl } from './pages/PageBabyGirl';
import { PagePromises } from './pages/PagePromises';
import { PageMemories } from './pages/PageMemories';
import { PageSpecials } from './pages/PageSpecials';
import { Heart } from 'lucide-react';

const THEMES: ThemeMode[] = ['pink', 'blue', 'peach'];
const BASE = import.meta.env.BASE_URL || '/';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('page1');
  const [theme, setTheme] = useState<ThemeMode>('pink');
  const [autoRotateTheme, setAutoRotateTheme] = useState(true);

  // Modal states
  const [activePhotoModal, setActivePhotoModal] = useState<MediaItem | null>(null);
  const [uploadModalState, setUploadModalState] = useState<{
    isOpen: boolean;
    slotTitle: string;
    defaultType: 'photo' | 'video' | 'screenshot';
  }>({
    isOpen: false,
    slotTitle: '',
    defaultType: 'photo',
  });

  // Apply theme data attribute globally to <html> and <body>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Bug 3 Fix: Single continuous 15-second automatic theme rotation timer
  // Does NOT depend on currentPage, so page navigation NEVER resets the timer.
  useEffect(() => {
    if (!autoRotateTheme) return;

    const intervalId = setInterval(() => {
      setTheme((prevTheme) => {
        const currentIndex = THEMES.indexOf(prevTheme);
        const nextIndex = (currentIndex + 1) % THEMES.length;
        return THEMES[nextIndex];
      });
    }, 15000); // Rotates every 15 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, [autoRotateTheme]);

  // Master scroll reset function for mobile and desktop
  const resetScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTop = 0;
    }
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.scrollTop = 0;
    }
  }, []);

  // Bug 1 Fix: Absolute top scroll reset on every page change
  // Ensures scroll resets both immediately and AFTER the new page has rendered in DOM
  useLayoutEffect(() => {
    // Immediate reset
    resetScrollToTop();

    // Rendered frame reset
    const rafId = requestAnimationFrame(() => {
      resetScrollToTop();
      requestAnimationFrame(() => {
        resetScrollToTop();
      });
    });

    // Small timeout fallback to guarantee execution after any asynchronous layout paint
    const timerId = setTimeout(() => {
      resetScrollToTop();
    }, 20);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
    };
  }, [currentPage, resetScrollToTop]);

  const handleNavigatePage = (targetPage: PageId) => {
    setCurrentPage(targetPage);
    resetScrollToTop();
  };

  const handleOpenPhotoFromUrl = (filePath: string, title: string) => {
    setActivePhotoModal({
      id: 999,
      numberPrefix: '❤️',
      type: 'photo',
      title,
      filePath,
    });
  };

  const handleOpenUploadModal = (slotTitle: string, defaultType: 'photo' | 'video' | 'screenshot') => {
    setUploadModalState({
      isOpen: true,
      slotTitle,
      defaultType,
    });
  };

  return (
    <div className="min-h-screen flex flex-col relative transition-colors duration-700">
      {/* Ambient Floating Hearts background */}
      <FloatingHearts count={16} />

      {/* Top Bar Navigation */}
      <Navbar
        currentPage={currentPage}
        onPageChange={handleNavigatePage}
        theme={theme}
        onThemeChange={(newTheme) => setTheme(newTheme)}
        autoRotateTheme={autoRotateTheme}
        onToggleAutoRotate={() => setAutoRotateTheme((prev) => !prev)}
      />

      {/* Main Page Content */}
      <main className="flex-1 relative z-10">
        {currentPage === 'page1' && (
          <PageIntroduction
            onNextPage={() => handleNavigatePage('page2')}
            onOpenPhotoModal={handleOpenPhotoFromUrl}
          />
        )}

        {currentPage === 'page2' && (
          <PageBabyGirl
            onNextPage={() => handleNavigatePage('page3')}
            onPrevPage={() => handleNavigatePage('page1')}
            onOpenPhotoModal={handleOpenPhotoFromUrl}
          />
        )}

        {currentPage === 'page3' && (
          <PagePromises
            onNextPage={() => handleNavigatePage('page4')}
            onPrevPage={() => handleNavigatePage('page2')}
            onOpenPhotoModal={handleOpenPhotoFromUrl}
          />
        )}

        {currentPage === 'page4' && (
          <PageMemories
            onOpenPhotoModal={(item) => setActivePhotoModal(item)}
            onOpenUploadModal={handleOpenUploadModal}
            onGoToSpecials={() => handleNavigatePage('special')}
            onPrevPage={() => handleNavigatePage('page3')}
          />
        )}

        {currentPage === 'special' && (
          <PageSpecials onBackToMemories={() => handleNavigatePage('page4')} />
        )}
      </main>

      {/* Full-Screen Clickable Photo Modal */}
      <PhotoModal media={activePhotoModal} onClose={() => setActivePhotoModal(null)} />

      {/* Interactive Media Upload Modal */}
      <MediaUploadModal
        isOpen={uploadModalState.isOpen}
        slotTitle={uploadModalState.slotTitle}
        defaultType={uploadModalState.defaultType}
        onClose={() => setUploadModalState((prev) => ({ ...prev, isOpen: false }))}
        onUploadSuccess={(fileUrl, type, title) => {
          setActivePhotoModal({
            id: 888,
            numberPrefix: 'NEW',
            type,
            title: title || 'Personal Upload',
            filePath: fileUrl,
          });
        }}
      />

      {/* Dedicated Romantic Background Music Player (Persistent, loops, no random music) */}
      <MusicPlayer defaultAudioSrc={`${BASE}assets/aistudio/Ve_Haaniyaan_-_Official_Video_Ravi_Dubey_Sargun_Mehta_Danny_Avvy_Sra_Dreamiyata_Music__1__1dd54d88.mp3`} />

      {/* Footer */}
      <footer className="w-full py-8 border-t border-rose-100 bg-white/70 backdrop-blur-xs text-center relative z-10 mt-12">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 font-romantic text-lg font-bold text-rose-950">
            <span>ISHIKA</span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
            <span>PRIYANSH</span>
          </div>
          <p className="font-handwritten text-xl text-rose-600">
            Made with pure, endless love by Priyansh for his baby girl Ishika ❤️
          </p>
          <p className="text-xs text-rose-400">
            Forever and Always · Oxygen of My Life · No 1 Priority
          </p>
        </div>
      </footer>
    </div>
  );
}
