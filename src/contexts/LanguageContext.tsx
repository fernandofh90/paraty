import React, { createContext, useContext, useState } from 'react';

export type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  pt: {
    welcome: 'Bem-vindo!',
    start: 'Toque para iniciar',
    searchPlaceholder: 'Buscar lugares, restaurantes...',
    backToMap: 'Voltar ao Mapa',
    about: 'Sobre',
    gallery: 'Galeria',
    go: 'Ir',
    site: 'Site',
    all: 'Todos',
    subtitle: 'Guia Turístico Digital',
    tapToStart: 'Toque para iniciar',
    // Categories
    'Hospedagem': 'Hospedagem',
    'Restaurante': 'Restaurante',
    'Bar': 'Bar',
    'Passeio': 'Passeio',
    'Ponto Turístico': 'Ponto Turístico',
    'Loja': 'Loja',
    'Serviço': 'Serviço',
    'Outro': 'Outro'
  },
  en: {
    welcome: 'Welcome!',
    start: 'Tap to start',
    searchPlaceholder: 'Search places, restaurants...',
    backToMap: 'Back to Map',
    about: 'About',
    gallery: 'Gallery',
    go: 'Go',
    site: 'Website',
    all: 'All',
    subtitle: 'Digital Tourist Guide',
    tapToStart: 'Tap to start',
    // Categories
    'Hospedagem': 'Accommodation',
    'Restaurante': 'Restaurant',
    'Bar': 'Bar',
    'Passeio': 'Tour',
    'Ponto Turístico': 'Sightseeing',
    'Loja': 'Shop',
    'Serviço': 'Service',
    'Outro': 'Other'
  },
  es: {
    welcome: '¡Bienvenido!',
    start: 'Toque para iniciar',
    searchPlaceholder: 'Buscar lugares, restaurantes...',
    backToMap: 'Volver al Mapa',
    about: 'Sobre',
    gallery: 'Galería',
    go: 'Ir',
    site: 'Sitio Web',
    all: 'Todos',
    subtitle: 'Guía Turística Digital',
    tapToStart: 'Toca para empezar',
    // Categories
    'Hospedagem': 'Alojamiento',
    'Restaurante': 'Restaurante',
    'Bar': 'Bar',
    'Passeio': 'Paseo',
    'Ponto Turístico': 'Punto Turístico',
    'Loja': 'Tienda',
    'Serviço': 'Servicio',
    'Outro': 'Otro'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
