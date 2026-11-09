import React, { useMemo } from 'react';

interface FloatingHeartsProps {
  count?: number;
}

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({ count = 18 }) => {
  const hearts = useMemo(() => {
    const emojis = ['❤️', '💖', '💕', '💗', '💓', '✨', '🌸', '💋'];
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: Math.random() * 96 + 2,
      duration: Math.random() * 8 + 9, // 9s to 17s
      delay: Math.random() * 8,
      size: Math.random() * 1.2 + 0.9, // rem
      opacity: Math.random() * 0.35 + 0.25,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-[-50px] select-none"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}rem`,
            opacity: h.opacity,
            animation: `floatHeart ${h.duration}s infinite linear`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
};
