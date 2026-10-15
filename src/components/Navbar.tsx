import React, { useState } from 'react';
import { ShoppingBag, UtensilsCrossed, Calendar, Menu as MenuIcon, X, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Menú', href: '#menu' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Opiniones', href: '#opiniones' },
    { label: 'Horarios', href: '#horarios' },
    { label: 'Ubicación', href: '#ubicacion' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <a
            href="#"
            className="flex items-center gap-3 group text-stone-100 hover:text-amber-400 transition-colors shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-500 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                {RESTAURANT_INFO.name}
              </span>
              <span className="text-[11px] font-medium tracking-wider uppercase text-amber-500/90 mt-1">
                Café · Ristorante · Bodegón
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Single-line text links) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-amber-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions (Cart & Reservation) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              type="button"
              className="relative p-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors flex items-center justify-center"
              aria-label="Abrir carrito de pedidos"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white font-mono text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Action Button: Reservar */}
            <button
              onClick={onOpenReservation}
              type="button"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Mesa</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Alternar menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2 text-base font-medium text-stone-200 hover:text-amber-400 hover:bg-stone-800 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-stone-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar una Mesa en Da Gianni</span>
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-stone-300 border border-stone-700 hover:bg-stone-800 rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>Llamar al restaurante</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
