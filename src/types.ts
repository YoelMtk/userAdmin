export interface MenuItem {
  id: string;
  name: string;
  category: 'cafe' | 'pastas' | 'canastas' | 'panaderia' | 'bodegon' | 'ejecutivo';
  categoryLabel: string;
  description: string;
  price: number;
  highlight?: string;
  image: string;
  isPopular?: boolean;
  dietary?: string[];
  preparationTime?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface ReservationFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  occasion: string;
  areaPreference: 'salon-principal' | 'terraza' | 'bodegon-privado' | 'cafe';
  notes?: string;
}

export interface ConfirmedReservation extends ReservationFormData {
  id: string;
  createdAt: string;
  status: 'confirmada' | 'pendiente';
}

export interface ReviewItem {
  author: string;
  role: string;
  reviewCount: string;
  rating: number;
  relativeTime: string;
  text: string;
  highlightQuote: string;
  avatarLetter: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'ambiente' | 'comidas' | 'cafe' | 'bodegon';
  categoryLabel: string;
  description: string;
  image: string;
}
