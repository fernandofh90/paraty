import React, { useState, useEffect } from 'react';
import { MOCK_ADS } from '../constants';

export const AdFooter: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_ADS.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const currentAd = MOCK_ADS[currentIndex];

  return (
    <div className="h-40 bg-gray-900 border-t-4 border-yellow-500 flex items-center justify-center relative overflow-hidden shrink-0">
      <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-xs text-white uppercase tracking-wider">
        Publicidade
      </div>
      
      {/* Simulated Video Container */}
      <div className="flex w-full h-full">
         <div className="w-1/2 h-full relative">
            <img 
              src={currentAd.thumbnailUrl} 
              alt={currentAd.title} 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
               </div>
            </div>
         </div>
         <div className="w-1/2 h-full flex flex-col justify-center p-4 text-white">
            <h3 className="text-lg font-bold text-yellow-400 mb-1">{currentAd.title}</h3>
            <p className="text-sm text-gray-300">Conheça o melhor de Paraty.</p>
            <button className="mt-2 text-xs border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition-colors self-start">
              Saiba Mais
            </button>
         </div>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {MOCK_ADS.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-yellow-500' : 'bg-gray-600'}`}
          />
        ))}
      </div>
    </div>
  );
};
