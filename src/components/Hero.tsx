import React from 'react';
import { Star, MapPin, Clock, ArrowRight, Utensils, ShoppingBag, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onOpenReservation: () => void;
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onScrollToMenu }) => {
  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-stone-950 text-white">
      {/* Background Photography with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_restaurant_atmosphere_1792069079780.jpg"
          alt="Ambiente acogedor y elegante de Café - Ristorante Da Gianni"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105 duration-1000 ease-out"
        />
        {/* Measured Scrim for WCAG AA compliance */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/65" />
        <div className="absolute inset-0 bg-stone-950/30 backdrop-blur-[1px]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center flex flex-col items-center">
        {/* Clean Unboxed Metadata Rating */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-amber-300 mb-6 tracking-wide">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="font-bold text-white font-mono tabular-nums">{RESTAURANT_INFO.rating}</span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span className="text-stone-300">{RESTAURANT_INFO.reviewsCount} opiniones en Google Maps</span>
          <span aria-hidden="true" className="text-stone-500">·</span>
          <span className="text-stone-300">Santa Cruz, Aragua</span>
        </div>

        {/* Primary Title with text-wrap: balance */}
        <h1
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-50 max-w-4xl leading-[1.15] mb-6"
          style={{ textWrap: 'balance' }}
        >
          El Punto Gastronómico Obligado en Santa Cruz de Aragua
        </h1>

        {/* Subtitle / Description */}
        <p className="text-base sm:text-lg lg:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
          Pastas artesanales de autor, panadería europea recién horneada, café de especialidad y un selecto bodegón para comidas de negocios y momentos familiares.
        </p>

        {/* Direct Call-to-Action Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={onScrollToMenu}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg shadow-lg hover:shadow-amber-400/20 transition-all whitespace-nowrap"
          >
            <Utensils className="w-4 h-4" />
            <span>Ver Menú y Pedir Delivery</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onOpenReservation}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-stone-900/80 hover:bg-stone-800 border border-stone-700/80 rounded-lg backdrop-blur-sm transition-all whitespace-nowrap"
          >
            <span>Reservar una Mesa Online</span>
          </button>
        </div>

        {/* 3 Core Services Strip (No pills - clean architectural cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl text-left border-t border-stone-800/80 pt-8">
          <div className="flex items-start gap-3.5 p-3 rounded-lg bg-stone-900/40 border border-stone-800/50 backdrop-blur-xs">
            <div className="p-2 rounded-md bg-amber-500/10 text-amber-400 shrink-0">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-100">Consumo en el lugar</h3>
              <p className="text-xs text-stone-400 mt-0.5 leading-snug">Salón climatizado para comidas de negocios, reuniones o cenas familiares.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-lg bg-stone-900/40 border border-stone-800/50 backdrop-blur-xs">
            <div className="p-2 rounded-md bg-amber-500/10 text-amber-400 shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-100">Para llevar (Pick-up)</h3>
              <p className="text-xs text-stone-400 mt-0.5 leading-snug">Pasa retirando tu café, minipanes y pastas al momento sin esperas.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-lg bg-stone-900/40 border border-stone-800/50 backdrop-blur-xs">
            <div className="p-2 rounded-md bg-amber-500/10 text-amber-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-100">Entrega a domicilio</h3>
              <p className="text-xs text-stone-400 mt-0.5 leading-snug">Delivery ágil y seguro en Santa Cruz, Cagua y sectores cercanos de Aragua.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
