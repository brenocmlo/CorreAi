"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

export default function FavoriteButton() {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    
    if (!isFavorited) {
      // Simulate sending to AI
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 3000);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleFavorite}
        className={`p-3 rounded-full border shadow-sm transition-all flex items-center justify-center gap-2 ${
          isFavorited 
            ? "bg-rose-50 border-rose-200 text-rose-500 hover:bg-rose-100" 
            : "bg-white border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200"
        }`}
        title={isFavorited ? "Remover dos favoritos" : "Favoritar este imóvel"}
      >
        <Heart 
          className={`w-6 h-6 transition-all ${isFavorited ? "fill-rose-500 scale-110" : "scale-100"}`} 
        />
      </button>

      {/* AI Feedback Toast */}
      {showFeedback && (
        <div className="absolute top-full right-0 mt-3 w-64 bg-slate-800 text-white text-xs p-3 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start gap-2">
            <span className="text-lg">✨</span>
            <p><strong>Imóvel favoritado!</strong><br />A IA do CorreAi registrou sua preferência para melhorar suas recomendações.</p>
          </div>
        </div>
      )}
    </div>
  );
}
