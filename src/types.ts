export enum Category {
  ACCOMMODATION = 'Hospedagem',
  RESTAURANT = 'Restaurante',
  BAR = 'Bar',
  TOUR = 'Passeio',
  SIGHT = 'Ponto Turístico',
  SHOP = 'Loja',
  SERVICE = 'Serviço',
  OTHER = 'Outro'
}

export enum PlanType {
  BASIC = 'Básico',
  INTERMEDIATE = 'Intermediário',
  PREMIUM = 'Premium'
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Place {
  id: string;
  name: string;
  category: Category;
  description: string; // Multilingual content would be an object in real app, simplified here
  address: string;
  location: Location;
  phone: string;
  whatsapp?: string;
  website?: string;
  images: string[];
  videoUrl?: string;
  plan: PlanType;
  rating?: number;
}

export interface Advertiser {
  id: string;
  name: string;
  email: string;
  places: Place[];
  plan: PlanType;
}

export interface VideoAd {
  id: string;
  thumbnailUrl: string;
  videoUrl?: string; // Optional for demo
  advertiserId: string;
  title: string;
}
