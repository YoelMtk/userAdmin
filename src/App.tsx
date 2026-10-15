import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { MenuItem, CartItem } from './types';
import { Utensils, Calendar, ShoppingBag } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const handleAddToCart = (item: MenuItem, specialInstructions?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.item.id === item.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
          specialInstructions: specialInstructions || next[existingIndex].specialInstructions,
        };
        return next;
      } else {
        return [...prev, { item, quantity: 1, specialInstructions }];
      }
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === id) {
            const nextQty = ci.quantity + delta;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const cartItemIds = cartItems.reduce((acc, curr) => {
    acc[curr.item.id] = curr.quantity;
    return acc;
  }, {} as Record<string, number>);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenReservation={() => setIsReservationOpen(true)}
          onScrollToMenu={scrollToMenu}
        />

        {/* Interactive Menu & Order Section */}
        <MenuSection
          onAddToCart={handleAddToCart}
          cartItemIds={cartItemIds}
        />

        {/* High-Resolution Photo Gallery */}
        <GallerySection />

        {/* Authentic Customer Reviews & Social Proof */}
        <ReviewsSection />

        {/* Location, Contact, Schedule & FAQs */}
        <LocationHoursSection
          onOpenReservation={() => setIsReservationOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer onOpenReservation={() => setIsReservationOpen(true)} />

      {/* Cart & WhatsApp Checkout Slide-over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Online Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Mobile Sticky Quick Action Bar (Under 15% mobile viewport cap) */}
      <div className="sm:hidden fixed bottom-3 left-3 right-3 z-30 bg-stone-900/95 backdrop-blur-md border border-stone-800 text-white rounded-xl shadow-2xl p-2 flex items-center justify-between gap-2">
        <button
          onClick={() => setIsReservationOpen(true)}
          type="button"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-stone-950 bg-amber-400 active:bg-amber-500 rounded-lg whitespace-nowrap"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Reservar Mesa</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          type="button"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-stone-800 active:bg-stone-700 border border-stone-700 rounded-lg whitespace-nowrap"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
          <span>Pedido {totalCartCount > 0 && `(${totalCartCount})`}</span>
        </button>
      </div>
    </div>
  );
}
