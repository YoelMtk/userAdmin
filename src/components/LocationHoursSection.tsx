import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, ExternalLink, HelpCircle, ChevronDown, ChevronUp, Check, Car } from 'lucide-react';
import { RESTAURANT_INFO, FAQS } from '../data/restaurantData';

interface LocationHoursProps {
  onOpenReservation: () => void;
}

export const LocationHoursSection: React.FC<LocationHoursProps> = ({ onOpenReservation }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="ubicacion" className="py-20 lg:py-28 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest font-semibold text-amber-700 mb-2">
            Visítanos en Aragua
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900">
            Horarios, Ubicación & Contacto
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Fácil acceso desde la Carretera Nacional, Cagua, Turmero y Maracay. Contamos con estacionamiento y vigilancia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Hours & Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            {/* Opening Hours Card */}
            <div id="horarios" className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center gap-2.5 text-stone-900 font-semibold mb-4">
                <Clock className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif text-xl">Horarios de Apertura</h3>
              </div>

              <div className="space-y-4">
                {RESTAURANT_INFO.hours.map((item, idx) => (
                  <div key={idx} className="pb-3 border-b border-stone-100 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-stone-900">{item.day}</span>
                      <span className="font-mono tabular-nums font-bold text-amber-800">{item.hours}</span>
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">{item.desc}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="text-xs text-stone-500">
                  Estado actual: <span className="text-emerald-700 font-semibold">Abierto hoy al público</span>
                </div>
                <button
                  onClick={onOpenReservation}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-800 hover:underline"
                >
                  Apartar mesa &rarr;
                </button>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-semibold text-stone-900">
                Atención Directa & Pedidos
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-stone-600">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 border border-transparent hover:border-stone-200 transition-colors text-stone-800"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-stone-400 text-[11px]">Teléfono Principal</span>
                    <span className="font-mono font-semibold">{RESTAURANT_INFO.phone}</span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent(
                    '¡Hola Da Gianni! Quisiera consultar sobre el menú y reservas.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 border border-transparent hover:border-stone-200 transition-colors text-stone-800"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-stone-400 text-[11px]">WhatsApp Oficial</span>
                    <span className="font-mono font-semibold">+58 412 889 4220</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl border border-transparent text-stone-800">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-stone-400 text-[11px]">Correo Electrónico</span>
                    <span className="font-medium">{RESTAURANT_INFO.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stylized Interactive Location Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col">
            {/* Interactive Location Visualizer */}
            <div className="relative h-64 sm:h-80 bg-stone-900 text-white overflow-hidden p-6 sm:p-8 flex flex-col justify-between">
              {/* Background Map Graphic Styling */}
              <div className="absolute inset-0 opacity-25">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                  {/* Road lines simulation */}
                  <line x1="0" y1="50" x2="100%" y2="280" stroke="#f59e0b" strokeWidth="4" strokeOpacity="0.8" />
                  <line x1="20%" y1="0" x2="80%" y2="100%" stroke="#e5e7eb" strokeWidth="2" strokeOpacity="0.5" />
                  <circle cx="58%" cy="52%" r="28" fill="#d97706" fillOpacity="0.3" />
                  <circle cx="58%" cy="52%" r="12" fill="#f59e0b" />
                </svg>
              </div>

              {/* Pin indicator overlay */}
              <div className="relative z-10 flex items-start justify-between">
                <div className="bg-stone-900/90 backdrop-blur-xs border border-stone-700/80 p-3 rounded-xl max-w-xs shadow-lg">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <MapPin className="w-4 h-4" />
                    <span>Da Gianni Ristorante</span>
                  </div>
                  <p className="text-xs text-stone-200 mt-1 font-mono">
                    Plus Code: {RESTAURANT_INFO.plusCode}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Santa Cruz 2123, Estado Aragua
                  </p>
                </div>

                <a
                  href={RESTAURANT_INFO.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Cómo llegar</span>
                </a>
              </div>

              {/* Bottom quick orientation badges */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-stone-300">
                <div className="p-2.5 rounded-lg bg-stone-950/80 border border-stone-800 backdrop-blur-xs">
                  <span className="text-[10px] text-stone-400 block uppercase">Desde Cagua</span>
                  <span className="font-semibold text-stone-100">8 - 12 minutos</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-950/80 border border-stone-800 backdrop-blur-xs">
                  <span className="text-[10px] text-stone-400 block uppercase">Desde Turmero</span>
                  <span className="font-semibold text-stone-100">15 minutos</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-950/80 border border-stone-800 backdrop-blur-xs col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-stone-400 block uppercase">Desde Maracay</span>
                  <span className="font-semibold text-stone-100">20 - 25 minutos</span>
                </div>
              </div>
            </div>

            {/* Address text and details */}
            <div className="p-6 sm:p-7 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-stone-900">Dirección exacta en Google Maps</h4>
                <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">
                  {RESTAURANT_INFO.address}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600 pt-3 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-amber-600" />
                  <span>Estacionamiento cómodo y seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Salón totalmente climatizado</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={RESTAURANT_INFO.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Ver ubicación completa en Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Preguntas Frecuentes
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Todo lo que necesitas saber antes de ordenar o visitarnos
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-stone-900 hover:text-amber-800 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                    <p className="mt-2">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
