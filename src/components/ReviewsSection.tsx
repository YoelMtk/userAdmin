import React from 'react';
import { Star, MessageCircle, ExternalLink, ThumbsUp, CheckCircle2 } from 'lucide-react';
import { REVIEWS, RESTAURANT_INFO } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const ratingDistribution = [
    { stars: 5, pct: '78%' },
    { stars: 4, pct: '15%' },
    { stars: 3, pct: '4%' },
    { stars: 2, pct: '2%' },
    { stars: 1, pct: '1%' },
  ];

  const popularMentions = [
    { tag: 'ambiente', count: 10 },
    { tag: 'comidas de negocio', count: 5 },
    { tag: 'panadería', count: 4 },
    { tag: 'degustar', count: 4 },
    { tag: 'buen café', count: 8 },
    { tag: 'pastas', count: 6 },
  ];

  return (
    <section id="opiniones" className="py-20 lg:py-28 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest font-semibold text-amber-700 mb-2">
            La Voz de Nuestros Comensales
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900">
            Opiniones en Google Maps
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Más de 290 clientes avalan nuestra calidad, atención y calidez gastronómica en Santa Cruz de Aragua.
          </p>
        </div>

        {/* Rating Overview Scoreboard (Strictly authentic data without fake telemetry) */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Score */}
            <div className="md:col-span-4 text-center md:text-left md:border-r md:border-stone-200 md:pr-8">
              <div className="font-mono tabular-nums text-5xl sm:text-6xl font-extrabold text-stone-900 leading-none">
                {RESTAURANT_INFO.rating}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500 my-2.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs text-stone-500 font-medium">
                Basado en <span className="font-bold text-stone-800">{RESTAURANT_INFO.reviewsCount} opiniones</span> verificadas en Google Maps
              </div>
              <div className="mt-3 text-xs text-stone-500">
                Rango habitual: <span className="font-semibold text-stone-800">{RESTAURANT_INFO.priceRange}</span>
              </div>
            </div>

            {/* Middle: Rating Bars */}
            <div className="md:col-span-5 space-y-2">
              {ratingDistribution.map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-xs text-stone-600">
                  <span className="w-3 font-mono tabular-nums font-semibold">{row.stars}</span>
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400 shrink-0" />
                  <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: row.pct }}
                    />
                  </div>
                  <span className="w-8 font-mono tabular-nums text-right text-stone-400">{row.pct}</span>
                </div>
              ))}
            </div>

            {/* Right: CTA to Google Maps */}
            <div className="md:col-span-3 flex flex-col justify-center items-center md:items-start text-center md:text-left pt-4 md:pt-0 border-t md:border-t-0 border-stone-200">
              <span className="text-xs text-stone-500 mb-2">¿Ya nos visitaste en Santa Cruz?</span>
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Escribir Opinión en Google</span>
              </a>
            </div>
          </div>

          {/* Popular mention chips as unboxed text with separators */}
          <div className="mt-6 pt-6 border-t border-stone-100 flex flex-wrap items-center gap-2 text-xs text-stone-500">
            <span className="font-semibold text-stone-700">Términos más elogiados:</span>
            {popularMentions.map((item, idx) => (
              <React.Fragment key={item.tag}>
                {idx > 0 && <span aria-hidden="true" className="text-stone-300">·</span>}
                <span className="text-stone-700">
                  {item.tag} <span className="text-stone-400 font-mono text-[11px]">({item.count})</span>
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Real Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Author row */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center font-serif text-base border border-amber-300/40">
                      {review.avatarLetter}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 leading-tight">
                        {review.author}
                      </h4>
                      <p className="text-[11px] text-stone-500">{review.role} · {review.reviewCount}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-400 shrink-0">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Highlight Quote */}
                <blockquote className="font-serif text-sm sm:text-base font-semibold text-stone-900 italic mb-3 leading-snug">
                  "{review.highlightQuote}"
                </blockquote>

                {/* Full Review Text */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                  {review.text}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  {review.relativeTime}
                </span>
                <span>Google Maps</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
