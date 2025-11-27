import React, { createContext, useContext, useState, useEffect } from 'react';
import { Place, Category, PlanType } from '../types';
import { MOCK_PLACES, PARATY_CENTER } from '../constants';

interface PlacesContextType {
  places: Place[];
  addPlace: (placeData: Omit<Place, 'id' | 'location' | 'images' | 'plan' | 'rating'>) => void;
  updatePlace: (place: Place) => void;
  currentPlaceId: string | null;
  setCurrentPlaceId: (id: string | null) => void;
  getCurrentPlace: () => Place | undefined;
}

const PlacesContext = createContext<PlacesContextType | undefined>(undefined);

export const PlacesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [places, setPlaces] = useState<Place[]>(() => {
    const saved = localStorage.getItem('explore_paraty_places');
    return saved ? JSON.parse(saved) : MOCK_PLACES;
  });

  const [currentPlaceId, setCurrentPlaceId] = useState<string | null>(() => {
    return localStorage.getItem('explore_paraty_current_id');
  });

  useEffect(() => {
    localStorage.setItem('explore_paraty_places', JSON.stringify(places));
  }, [places]);

  useEffect(() => {
    if (currentPlaceId) {
      localStorage.setItem('explore_paraty_current_id', currentPlaceId);
    } else {
      localStorage.removeItem('explore_paraty_current_id');
    }
  }, [currentPlaceId]);

  const addPlace = (placeData: Omit<Place, 'id' | 'location' | 'images' | 'plan' | 'rating'>) => {
    const newId = Date.now().toString();
    
    // Simulate a location near Paraty Center for demo purposes
    // Add small random offset to avoid stacking
    const latOffset = (Math.random() - 0.5) * 0.005;
    const lngOffset = (Math.random() - 0.5) * 0.005;

    const newPlace: Place = {
      ...placeData,
      id: newId,
      location: {
        lat: PARATY_CENTER.lat + latOffset,
        lng: PARATY_CENTER.lng + lngOffset
      },
      images: ['https://picsum.photos/800/600?random=' + newId], // Placeholder image
      plan: PlanType.BASIC, // Default plan
      rating: 5.0 // New places start with 5 stars :)
    };

    setPlaces(prev => [...prev, newPlace]);
    setCurrentPlaceId(newId);
  };

  const updatePlace = (updatedPlace: Place) => {
    setPlaces(prev => prev.map(p => p.id === updatedPlace.id ? updatedPlace : p));
  };

  const getCurrentPlace = () => {
    return places.find(p => p.id === currentPlaceId);
  };

  return (
    <PlacesContext.Provider value={{ 
      places, 
      addPlace, 
      updatePlace, 
      currentPlaceId, 
      setCurrentPlaceId,
      getCurrentPlace 
    }}>
      {children}
    </PlacesContext.Provider>
  );
};

export const usePlaces = () => {
  const context = useContext(PlacesContext);
  if (!context) throw new Error('usePlaces must be used within a PlacesProvider');
  return context;
};