import { Category, Place, PlanType, VideoAd } from './types';

export const PARATY_CENTER = { lat: -23.2205, lng: -44.7126 };

export const MOCK_PLACES: Place[] = [
  {
    id: '1',
    name: 'Pousada do Ouro',
    category: Category.ACCOMMODATION,
    description: 'Charme e história no coração do Centro Histórico. Uma experiência única de hospedagem em um casarão colonial restaurado.',
    address: 'Rua da Praia, 123, Centro Histórico',
    location: { lat: -23.2190, lng: -44.7130 },
    phone: '(24) 3371-0000',
    whatsapp: '5524999999999',
    images: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=2'
    ],
    plan: PlanType.PREMIUM,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Restaurante Banana da Terra',
    category: Category.RESTAURANT,
    description: 'Alta gastronomia caiçara. O melhor sabor de Paraty com ingredientes frescos e locais.',
    address: 'Rua do Comércio, 45, Centro Histórico',
    location: { lat: -23.2210, lng: -44.7140 },
    phone: '(24) 3371-1111',
    images: [
      'https://picsum.photos/800/600?random=3',
      'https://picsum.photos/800/600?random=4'
    ],
    plan: PlanType.INTERMEDIATE,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Bar do Zé',
    category: Category.BAR,
    description: 'Música ao vivo e drinks especiais. O ponto de encontro noturno em Paraty.',
    address: 'Praça da Matriz, 10',
    location: { lat: -23.2200, lng: -44.7120 },
    phone: '(24) 3371-2222',
    images: [
      'https://picsum.photos/800/600?random=5'
    ],
    plan: PlanType.BASIC
  },
  {
    id: '4',
    name: 'Passeio de Escuna Feliz',
    category: Category.TOUR,
    description: 'Explore as ilhas paradisíacas da baía de Paraty. Roteiros exclusivos com almoço a bordo.',
    address: 'Cais de Turismo',
    location: { lat: -23.2180, lng: -44.7110 },
    phone: '(24) 99999-8888',
    whatsapp: '5524999998888',
    images: [
      'https://picsum.photos/800/600?random=6'
    ],
    plan: PlanType.PREMIUM,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' // Mock
  },
  {
    id: '5',
    name: 'Igreja de Santa Rita',
    category: Category.SIGHT,
    description: 'Cartão postal de Paraty, construída em 1722. Sede do Museu de Arte Sacra.',
    address: 'Largo de Santa Rita',
    location: { lat: -23.2185, lng: -44.7125 },
    phone: '',
    images: [
      'https://picsum.photos/800/600?random=7'
    ],
    plan: PlanType.BASIC
  }
];

export const MOCK_ADS: VideoAd[] = [
  {
    id: 'ad1',
    title: 'Festival da Cachaça',
    thumbnailUrl: 'https://picsum.photos/400/200?random=10',
    advertiserId: 'admin'
  },
  {
    id: 'ad2',
    title: 'Pousada do Ouro - Promoção',
    thumbnailUrl: 'https://picsum.photos/400/200?random=11',
    advertiserId: '1'
  },
  {
    id: 'ad3',
    title: 'Passeio de Jeep',
    thumbnailUrl: 'https://picsum.photos/400/200?random=12',
    advertiserId: 'admin'
  }
];

export const CATEGORY_ICONS: Record<Category, string> = {
  [Category.ACCOMMODATION]: '🛏️',
  [Category.RESTAURANT]: '🍽️',
  [Category.BAR]: '🍸',
  [Category.TOUR]: '⛵',
  [Category.SIGHT]: '🏛️',
  [Category.SHOP]: '🛍️',
  [Category.SERVICE]: '🔧',
  [Category.OTHER]: '📍'
};
