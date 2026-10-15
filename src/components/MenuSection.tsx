import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, Clock, Utensils, Sparkles, X, Info } from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem } from '../types';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, specialNotes?: string) => void;
  cartItemIds: Record<string, number>;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, cartItemIds }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [modalSpecialNotes, setModalSpecialNotes] = useState<string>('');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'todos', label: 'Todo el Menú' },
    { id: 'cafe', label: 'Café & Desayunos' },
    { id: 'pastas', label: 'Pastas & Ristorante' },
    { id: 'canastas', label: 'Canastas & Piqueos' },
    { id: 'panaderia', label: 'Panadería & Dulces' },
    { id: 'Bebidas', label: 'Bodegón & Bebidas' },
    { id: 'ejecutivo', label: 'Almuerzos Ejecutivos' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleQuickAdd = (item: MenuItem) => {
    onAddToCart(item);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1200);
  };

  const handleModalAdd = () => {
    if (selectedItemForModal) {
      onAddToCart(selectedItemForModal, modalSpecialNotes.trim() ? modalSpecialNotes : undefined);
      setModalSpecialNotes('');
      setSelectedItemForModal(null);
    }
  };

  return (
    <section id="menu" className="py-20 lg:py-28 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-amber-700 mb-2">
              Carta Gastronómica & Pedidos
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900">
              Nuestro Menú de Tradición
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
              Platos elaborados al momento con ingredientes frescos, recetas italianas y nuestra panadería de la casa.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar plato, café, pasta..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                type="button"
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-950 border border-stone-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200 p-8">
            <Utensils className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-stone-900">No encontramos platos con esa búsqueda</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Intenta con otra palabra clave como "café", "pasta", "pollo" o restablece los filtros.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
              }}
              type="button"
              className="mt-4 px-4 py-2 text-xs font-medium text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
            >
              Ver menú completo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const inCartCount = cartItemIds[item.id] || 0;
              const isJustAdded = justAddedId === item.id;

              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Area */}
                    <div
                      onClick={() => setSelectedItemForModal(item)}
                      className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-xs text-white font-medium flex items-center gap-1">
                          <Info className="w-3.5 h-3.5 text-amber-300" />
                          Ver detalle e ingredientes
                        </span>
                      </div>

                      {item.highlight && (
                        <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-xs text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs">
                          {item.highlight}
                        </div>
                      )}
                    </div>

                    {/* Content Details */}
                    <div className="p-5">
                      {/* Quiet Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                        <span>{item.categoryLabel}</span>
                        {item.preparationTime && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-stone-400" />
                              {item.preparationTime}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Product Name */}
                      <h3
                        onClick={() => setSelectedItemForModal(item)}
                        className="text-base sm:text-lg font-semibold text-stone-900 group-hover:text-amber-800 transition-colors cursor-pointer leading-snug line-clamp-1"
                      >
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Dietary notes if any */}
                      {item.dietary && item.dietary.length > 0 && (
                        <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-3">
                          {item.dietary.map((d, idx) => (
                            <React.Fragment key={d}>
                              {idx > 0 && <span aria-hidden="true">/</span>}
                              <span>{d}</span>
                            </React.Fragment>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Price & Add to Cart */}
                  <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-stone-100 mt-auto">
                    <div>
                      <span className="text-xs text-stone-400 block">Precio</span>
                      <span className="font-mono tabular-nums text-lg font-bold text-stone-900">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleQuickAdd(item)}
                      type="button"
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : inCartCount > 0
                          ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                          : 'bg-stone-900 text-white hover:bg-stone-800 active:bg-stone-950'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>¡Agregado!</span>
                        </>
                      ) : inCartCount > 0 ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-amber-700" />
                          <span>En orden ({inCartCount}) +</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Agregar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]">
            <div className="relative h-56 sm:h-64 bg-stone-100 shrink-0">
              <img
                src={selectedItemForModal.image}
                alt={selectedItemForModal.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/70 text-white hover:bg-stone-900 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
              {selectedItemForModal.highlight && (
                <div className="absolute top-4 left-4 bg-stone-900/90 text-amber-300 text-xs font-semibold px-3 py-1 rounded-md">
                  {selectedItemForModal.highlight}
                </div>
              )}
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                <span>{selectedItemForModal.categoryLabel}</span>
                {selectedItemForModal.preparationTime && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Listo en aprox. {selectedItemForModal.preparationTime}</span>
                  </>
                )}
              </div>

              <h3 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
                {selectedItemForModal.name}
              </h3>

              <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                {selectedItemForModal.description}
              </p>

              {/* Special Instructions Input */}
              <div className="mt-5">
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Instrucciones o personalización para cocina (opcional):
                </label>
                <input
                  type="text"
                  placeholder="Ej: Sin cebolla, queso aparte, término medio..."
                  value={modalSpecialNotes}
                  onChange={(e) => setModalSpecialNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 block">Total del plato</span>
                  <span className="font-mono tabular-nums text-xl font-bold text-stone-900">
                    ${selectedItemForModal.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedItemForModal(null)}
                    type="button"
                    className="px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                  >
                    Volver
                  </button>
                  <button
                    onClick={handleModalAdd}
                    type="button"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar al Pedido</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
