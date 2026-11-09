import React, { useState, useEffect } from 'react';
import { Puzzle, Sparkles, RotateCcw, Trophy, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Tile {
  id: number;
  currentPos: number;
}

export const KissPuzzle: React.FC = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [selectedTile, setSelectedTile] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [puzzleImage, setPuzzleImage] = useState(`${import.meta.env.BASE_URL}assets/aistudio/1_70a35d3a.jpg`);

  // Initialize and shuffle
  const initPuzzle = () => {
    // 3x3 grid: 9 tiles
    const initialTiles: Tile[] = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      currentPos: i,
    }));

    // Shuffle by swapping random pairs
    const shuffled = [...initialTiles];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i].currentPos;
      shuffled[i].currentPos = shuffled[j].currentPos;
      shuffled[j].currentPos = temp;
    }

    setTiles(shuffled);
    setMoves(0);
    setIsCompleted(false);
    setSelectedTile(null);
  };

  useEffect(() => {
    initPuzzle();
  }, [puzzleImage]);

  const handleTileClick = (index: number) => {
    if (isCompleted) return;

    if (selectedTile === null) {
      setSelectedTile(index);
    } else {
      if (selectedTile !== index) {
        // Swap positions
        setTiles((prev) => {
          const newTiles = [...prev];
          const tileA = newTiles.find((t) => t.currentPos === selectedTile);
          const tileB = newTiles.find((t) => t.currentPos === index);
          if (tileA && tileB) {
            const temp = tileA.currentPos;
            tileA.currentPos = tileB.currentPos;
            tileB.currentPos = temp;
          }

          // Check if solved
          const solved = newTiles.every((t) => t.id === t.currentPos);
          if (solved) {
            setIsCompleted(true);
            confetti({
              particleCount: 100,
              spread: 90,
              origin: { y: 0.6 },
              colors: ['#f43f5e', '#ec4899', '#f59e0b', '#3b82f6'],
            });
          }

          return newTiles;
        });

        setMoves((m) => m + 1);
      }
      setSelectedTile(null);
    }
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-rose-500 font-bold text-xs uppercase tracking-wider mb-1">
            <Puzzle className="w-4 h-4" />
            <span>Feature 3: Kiss Puzzle Game</span>
          </div>
          <h3 className="font-romantic text-2xl sm:text-3xl font-bold text-rose-950">
            Kiss-Themed Photo Puzzle 🧩💋
          </h3>
          <p className="text-xs text-rose-500">
            Click any two pieces to swap them and reconstruct our sweet kiss photo!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold px-3 py-1.5 bg-rose-50 text-rose-700 rounded-full border border-rose-200">
            Moves: <span className="tabular-nums font-bold">{moves}</span>
          </div>
          <button
            onClick={initPuzzle}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-800 bg-white hover:bg-rose-50 rounded-full border border-rose-200 transition shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Shuffle / Reset</span>
          </button>
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white text-center shadow-lg animate-in zoom-in-95 duration-300">
          <Trophy className="w-8 h-8 mx-auto mb-1 animate-bounce" />
          <h4 className="font-romantic text-2xl font-bold">
            You Solved Our Sweet Kiss Puzzle! 🎉💋
          </h4>
          <p className="text-xs text-rose-100 mt-1 font-medium">
            Completed in {moves} moves! Priyansh sends you 1,000 extra kisses right now! ❤️
          </p>
          <button
            onClick={initPuzzle}
            className="mt-3 px-5 py-2 bg-white text-rose-600 font-bold text-xs rounded-full shadow-md hover:bg-rose-50 transition"
          >
            Play Again 🧩
          </button>
        </div>
      )}

      {/* Puzzle Board */}
      <div className="flex flex-col items-center">
        <div
          className="relative grid grid-cols-3 gap-1.5 p-2 bg-rose-100/60 rounded-3xl border-2 border-rose-300 shadow-inner max-w-sm w-full aspect-square"
          style={{ width: '100%', maxWidth: '360px' }}
        >
          {Array.from({ length: 9 }).map((_, boardIndex) => {
            const tile = tiles.find((t) => t.currentPos === boardIndex);
            if (!tile) return null;

            const isSelected = selectedTile === boardIndex;
            const originalCol = tile.id % 3;
            const originalRow = Math.floor(tile.id / 3);

            return (
              <div
                key={tile.id}
                onClick={() => handleTileClick(boardIndex)}
                className={`relative rounded-xl overflow-hidden cursor-pointer select-none border-2 transition-all duration-200 shadow-xs flex items-center justify-center ${
                  isSelected
                    ? 'border-rose-500 ring-4 ring-rose-400/50 scale-95 z-20'
                    : 'border-white hover:border-rose-300 hover:scale-[1.02]'
                }`}
                style={{
                  backgroundImage: `url(${puzzleImage})`,
                  backgroundSize: '300% 300%',
                  backgroundPosition: `${(originalCol * 100) / 2}% ${(originalRow * 100) / 2}%`,
                }}
              >
                {/* Heart overlay watermark */}
                <div className="absolute top-1 left-1.5 text-[10px] bg-black/40 text-white font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <Heart className="w-2.5 h-2.5 fill-rose-400 text-rose-400" />
                  <span>{tile.id + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-rose-400 mt-3 font-handwritten text-lg text-center">
          Tap two puzzle tiles to swap their positions ❤️
        </p>
      </div>
    </div>
  );
};
