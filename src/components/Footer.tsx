import React from 'react';
import { UtensilsCrossed, Phone, MapPin, ArrowUp, Instagram, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                {RESTAURANT_INFO.name}
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-sans">
              Café de especialidad, panadería artesanal, pastas tradicionales italianas y bodegón de vinos en Santa Cruz de Aragua. El destino de encuentro para familias y negocios.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400/90 font-mono">
              <span>Google Maps 4.6 ⭐</span>
              <span aria-hidden="true">·</span>
              <span>290 opiniones</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Explorar
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  Menú y Especialidades
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-amber-400 transition-colors">
                  Galería de Fotos
                </a>
              </li>
              <li>
                <a href="#opiniones" className="hover:text-amber-400 transition-colors">
                  Opiniones de Clientes
                </a>
              </li>
              <li>
                <a href="#horarios" className="hover:text-amber-400 transition-colors">
                  Horarios de Atención
                </a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-amber-400 transition-colors">
                  Ubicación & Cómo Llegar
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Action */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Servicios
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Consumo en salón climatizado</li>
              <li>Almuerzos ejecutivos de negocios</li>
              <li>Desayunos con café & minipanes</li>
              <li>Pedidos para llevar (Pick-up)</li>
              <li>Delivery a domicilio en Aragua</li>
            </ul>
            <div className="pt-2">
              <button
                onClick={onOpenReservation}
                type="button"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
              >
                Reservar mesa en línea
              </button>
            </div>
          </div>

          {/* Col 4: Contact & Address */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Contacto Directo
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400 font-sans">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="font-mono">{RESTAURANT_INFO.phone}</span>
              </p>
              <p className="text-[11px] text-stone-500">
                Horario: Lun - Sáb desde 7:00 AM / Dom desde 8:00 AM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Da Gianni · Santa Cruz de Aragua. Todos los derechos reservados.</p>

          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
