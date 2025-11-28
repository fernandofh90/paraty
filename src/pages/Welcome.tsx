import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Store } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const handleStart = () => {
    navigate('/map');
  };

  const handlePartnerAccess = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/advertiser/login');
  };

  const handleLanguageSelect = (e: React.MouseEvent, lang: Language) => {
    e.stopPropagation(); // Prevent triggering the background click
    setLanguage(lang);
  };

  return (
    <div 
      className="flex-1 relative flex flex-col items-center justify-between p-8 text-white cursor-pointer select-none"
      onClick={handleStart}
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(https://picsum.photos/1080/1920?random=100)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Header */}
      <div className="mt-12 text-center animate-fade-in-down">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-6 shadow-lg">
          <MapPin className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-2 drop-shadow-lg font-serif">Explore Paraty</h1>
        <p className="text-xl font-light opacity-90 tracking-wide">{t('subtitle')}</p>
      </div>

      {/* Language Selection */}
      <div className="flex gap-4 mb-8 z-10">
        <button 
          onClick={(e) => handleLanguageSelect(e, 'pt')}
          className={`px-4 py-2 rounded-full backdrop-blur-md transition border font-semibold text-sm ${language === 'pt' ? 'bg-blue-600 text-white border-blue-500 shadow-lg scale-105' : 'bg-white/20 text-white border-white/30 hover:bg-white/40'}`}
        >
          🇧🇷 PT
        </button>
        <button 
          onClick={(e) => handleLanguageSelect(e, 'en')}
          className={`px-4 py-2 rounded-full backdrop-blur-md transition border font-semibold text-sm ${language === 'en' ? 'bg-blue-600 text-white border-blue-500 shadow-lg scale-105' : 'bg-white/20 text-white border-white/30 hover:bg-white/40'}`}
        >
          🇺🇸 EN
        </button>
        <button 
          onClick={(e) => handleLanguageSelect(e, 'es')}
          className={`px-4 py-2 rounded-full backdrop-blur-md transition border font-semibold text-sm ${language === 'es' ? 'bg-blue-600 text-white border-blue-500 shadow-lg scale-105' : 'bg-white/20 text-white border-white/30 hover:bg-white/40'}`}
        >
          🇪🇸 ES
        </button>
      </div>

      {/* Call to Action */}
      <div className="mb-20 text-center animate-pulse">
        <h2 className="text-3xl font-semibold mb-4">{t('welcome')}</h2>
        <div className="inline-flex items-center gap-2 bg-blue-600 px-8 py-4 rounded-full shadow-xl text-lg font-bold hover:bg-blue-500 transition-transform transform hover:scale-105 active:scale-95">
          <span>{t('tapToStart')}</span>
          <ArrowRight className="w-6 h-6" />
        </div>
      </div>

      {/* Footer / Partner Link */}
      <div className="absolute bottom-6 w-full flex justify-between items-end px-8 text-xs opacity-80 z-20">
        <span>exploreparaty.com.br</span>
        <button 
          onClick={handlePartnerAccess}
          className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/30 transition backdrop-blur-sm border border-white/20"
        >
          <Store className="w-3 h-3" />
          <span>Área do Parceiro</span>
        </button>
      </div>
    </div>
  );
};
