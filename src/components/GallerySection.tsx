import React, { useState } from 'react';
import { Maximize2, X, Image as ImageIcon, Camera, ChevronRight } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/restaurantData';
import { GalleryPhoto } from '../types';

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<'todo' | 'ambiente' | 'comidas' | 'cafe' | 'bodegon'>('todo');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (filter === 'todo') return true;
    return photo.category === filter;
  });

  return (
    <section id="galeria" className="py-20 lg:py-28 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-amber-400 mb-2">
              Experiencia Visual
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Galería Da Gianni
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
              Cada plato y rincón refleja nuestra devoción por los sabores tradicionales, la hospitalidad cálida y los mejores momentos en mesa.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-800 rounded-lg self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setFilter('todo')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                filter === 'todo' ? 'bg-amber-400 text-stone-950 font-semibold' : 'text-stone-400 hover:text-white'
              }`}
            >
              Todo
            </button>
            <button
              onClick={() => setFilter('ambiente')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                filter === 'ambiente' ? 'bg-amber-400 text-stone-950 font-semibold' : 'text-stone-400 hover:text-white'
              }`}
            >
              Ambiente
            </button>
            <button
              onClick={() => setFilter('comidas')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                filter === 'comidas' ? 'bg-amber-400 text-stone-950 font-semibold' : 'text-stone-400 hover:text-white'
              }`}
            >
              Pastas & Platos
            </button>
            <button
              onClick={() => setFilter('cafe')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                filter === 'cafe' ? 'bg-amber-400 text-stone-950 font-semibold' : 'text-stone-400 hover:text-white'
              }`}
            >
              Café & Panadería
            </button>
            <button
              onClick={() => setFilter('bodegon')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                filter === 'bodegon' ? 'bg-amber-400 text-stone-950 font-semibold' : 'text-stone-400 hover:text-white'
              }`}
            >
              Bodegón
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative h-72 sm:h-80 rounded-xl overflow-hidden cursor-pointer bg-stone-800 border border-stone-800 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={photo.image}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Scrim Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                <span className="text-[11px] font-medium tracking-wide uppercase text-amber-400">
                  {photo.categoryLabel}
                </span>
                <h3 className="font-serif text-lg font-bold text-white mt-1 leading-snug">
                  {photo.title}
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-amber-300">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Ver en alta resolución</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-stone-950/80 text-white hover:bg-stone-800 transition-colors"
              aria-label="Cerrar visor"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] w-full overflow-hidden flex items-center justify-center bg-stone-950">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </div>

            <div className="p-6 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                  {activePhoto.categoryLabel}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {activePhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
                  {activePhoto.description}
                </p>
              </div>

              <button
                onClick={() => setActivePhoto(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Cerrar Imagen
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
