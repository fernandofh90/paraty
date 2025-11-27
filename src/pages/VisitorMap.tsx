import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { Search, Map as MapIcon, ChevronLeft, Phone, Globe, Navigation } from 'lucide-react';
import { PARATY_CENTER, CATEGORY_ICONS } from '../constants';
import { Category, Place } from '../types';
import { AdFooter } from '../components/AdFooter';
import { useLanguage } from '../contexts/LanguageContext';
import { usePlaces } from '../contexts/PlacesContext';

// Fix Leaflet Default Icon
const createCustomIcon = (category: Category, isSelected: boolean) => {
  const iconEmoji = CATEGORY_ICONS[category] || '📍';
  
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="
      background-color: ${isSelected ? '#ef4444' : '#2563eb'};
      width: ${isSelected ? '48px' : '40px'};
      height: ${isSelected ? '48px' : '40px'};
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${isSelected ? '24px' : '20px'};
      transition: all 0.3s ease;
    ">${iconEmoji}</div>`,
    iconSize: isSelected ? [48, 48] : [40, 40],
    iconAnchor: isSelected ? [24, 24] : [20, 20],
    popupAnchor: [0, -20]
  });
};

const MapController = ({ center }: { center: { lat: number, lng: number } }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([center.lat, center.lng], 16, { duration: 1.5 });
  }, [center, map]);
  return null;
};

export const VisitorMap: React.FC = () => {
  const { t } = useLanguage();
  const { places } = usePlaces();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [mapCenter, setMapCenter] = useState(PARATY_CENTER);

  const filteredPlaces = useMemo(() => {
    return places.filter(place => {
      const matchesCategory = selectedCategory === 'ALL' || place.category === selectedCategory;
      const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           place.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, places]);

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place);
    setMapCenter(place.location);
  };

  const categories = Object.values(Category) as Category[];

  return (
    <div className="flex flex-col h-full w-full bg-slate-100">
      
      {/* Top Bar / Search */}
      <div className="relative z-20 bg-white shadow-md p-4 flex items-center gap-4 shrink-0">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-none bg-gray-100 focus:ring-2 focus:ring-blue-500 text-lg shadow-inner outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
         <button 
           className="p-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 active:scale-95 transition"
           onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); setSelectedPlace(null); }}
         >
            <MapIcon className="w-6 h-6" />
         </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        
        {/* Map */}
        <MapContainer 
          center={[PARATY_CENTER.lat, PARATY_CENTER.lng]} 
          zoom={15} 
          zoomControl={false}
          className="w-full h-full"
          style={{ background: '#e5e7eb' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright" />
          <MapController center={mapCenter} />

          {filteredPlaces.map(place => (
            <Marker 
              key={place.id} 
              position={[place.location.lat, place.location.lng]}
              icon={createCustomIcon(place.category, selectedPlace?.id === place.id)}
              eventHandlers={{
                click: () => handlePlaceClick(place)
              }}
            />
          ))}
        </MapContainer>

        {/* Categories Floating Bar (Bottom) */}
        {!selectedPlace && (
          <div className="absolute bottom-4 left-0 right-0 z-[1000] px-4 overflow-x-auto no-scrollbar pb-2">
            <div className="flex gap-2 w-max mx-auto">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-5 py-3 rounded-full shadow-lg text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === 'ALL' ? 'bg-blue-600 text-white scale-105' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                {t('all')}
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-3 rounded-full shadow-lg text-sm font-bold whitespace-nowrap flex items-center gap-2 transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white scale-105' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <span>{CATEGORY_ICONS[cat]}</span>
                  {t(cat)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Place Detail Modal Overlay */}
        {selectedPlace && (
          <div className="absolute inset-0 z-[2000] bg-white animate-in slide-in-from-bottom duration-300 flex flex-col overflow-y-auto">
             <div className="relative h-64 shrink-0">
               <img 
                 src={selectedPlace.images[0]} 
                 alt={selectedPlace.name} 
                 className="w-full h-full object-cover"
               />
               <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent">
                  <button 
                    onClick={() => setSelectedPlace(null)}
                    className="p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/40 transition"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wide shadow-lg">
                    {t(selectedPlace.category)}
                  </span>
               </div>
             </div>

             <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-3xl font-bold text-gray-900 font-serif leading-tight">{selectedPlace.name}</h2>
                  {selectedPlace.rating && (
                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded text-yellow-700 font-bold text-sm">
                      ★ {selectedPlace.rating}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mb-6">
                  {selectedPlace.whatsapp && (
                    <a href={`https://wa.me/${selectedPlace.whatsapp}`} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2 font-bold shadow-md active:scale-95 transition">
                      <Phone className="w-5 h-5" /> WhatsApp
                    </a>
                  )}
                  {selectedPlace.website && (
                    <a href={selectedPlace.website} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center gap-2 font-bold border border-gray-200 active:scale-95 transition">
                      <Globe className="w-5 h-5" /> {t('site')}
                    </a>
                  )}
                  <button className="flex-1 py-3 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center gap-2 font-bold border border-blue-200 active:scale-95 transition">
                    <Navigation className="w-5 h-5" /> {t('go')}
                  </button>
                </div>

                <div className="prose prose-blue mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t('about')}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{selectedPlace.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                   <div className="flex items-start gap-3 text-gray-600">
                      <MapIcon className="w-5 h-5 mt-1 shrink-0 text-gray-400" />
                      <span className="text-lg">{selectedPlace.address}</span>
                   </div>
                   {selectedPlace.phone && (
                     <div className="flex items-center gap-3 text-gray-600">
                        <Phone className="w-5 h-5 shrink-0 text-gray-400" />
                        <span className="text-lg">{selectedPlace.phone}</span>
                     </div>
                   )}
                </div>

                {selectedPlace.images.length > 1 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{t('gallery')}</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                      {selectedPlace.images.slice(1).map((img, idx) => (
                        <img key={idx} src={img} className="w-48 h-32 object-cover rounded-lg shadow-sm shrink-0" alt="Gallery" />
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-auto pt-6 border-t">
                  <button 
                    onClick={() => setSelectedPlace(null)}
                    className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 transition"
                  >
                    {t('backToMap')}
                  </button>
                </div>
             </div>
          </div>
        )}

      </div>

      {/* Footer Ads */}
      <AdFooter />
    </div>
  );
};