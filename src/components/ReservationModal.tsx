import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle, Sparkles, Phone, Mail, Building2, MapPin, Share2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ReservationFormData, ConfirmedReservation } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    phone: '',
    email: '',
    date: todayStr,
    time: '13:00',
    guests: 2,
    occasion: 'Comida de Negocios / Almuerzo Ejecutivo',
    areaPreference: 'salon-principal',
    notes: '',
  });

  const [confirmedReservation, setConfirmedReservation] = useState<ConfirmedReservation | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Por favor completa tu nombre y número de contacto.');
      return;
    }

    const randomId = 'DG-' + Math.floor(1000 + Math.random() * 9000);
    const confirmed: ConfirmedReservation = {
      ...formData,
      id: randomId,
      createdAt: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }),
      status: 'confirmada',
    };

    setConfirmedReservation(confirmed);
  };

  const handleSendWhatsAppConfirmation = () => {
    if (!confirmedReservation) return;

    let msg = `📅 *RESERVA DE MESA - DA GIANNI*\n\n`;
    msg += `🔖 *Código de Reserva:* ${confirmedReservation.id}\n`;
    msg += `👤 *Titular:* ${confirmedReservation.name}\n`;
    msg += `📞 *Teléfono:* ${confirmedReservation.phone}\n`;
    msg += `🗓️ *Fecha:* ${confirmedReservation.date}\n`;
    msg += `⏰ *Hora:* ${confirmedReservation.time}\n`;
    msg += `👥 *Personas:* ${confirmedReservation.guests} comensal(es)\n`;
    msg += `🥂 *Ocasión:* ${confirmedReservation.occasion}\n`;
    msg += `🏛️ *Área:* ${
      confirmedReservation.areaPreference === 'salon-principal'
        ? 'Salón Principal Climatizado'
        : confirmedReservation.areaPreference === 'bodegon-privado'
        ? 'Zona Bodegón & Vinos'
        : 'Área Café & Panadería'
    }\n`;
    if (confirmedReservation.notes?.trim()) {
      msg += `💬 *Notas:* ${confirmedReservation.notes.trim()}\n`;
    }
    msg += `\n_Agradezco confirmar la disponibilidad de la mesa en Da Gianni._`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encoded}`, '_blank');
  };

  const resetAndClose = () => {
    setConfirmedReservation(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200">
        {/* Modal Header */}
        <div className="bg-stone-900 text-white p-6 flex items-center justify-between border-b border-stone-800">
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-400">
              Sistema de Reservas en Línea
            </span>
            <h3 className="font-serif text-2xl font-bold mt-0.5">Reserva tu Mesa en Da Gianni</h3>
            <p className="text-xs text-stone-400 mt-1">
              Santa Cruz de Aragua · Salón climatizado y atención de primera
            </p>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {confirmedReservation ? (
          <div className="p-6 sm:p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9" />
            </div>

            <h4 className="font-serif text-2xl font-bold text-stone-900">
              ¡Reserva Registrada Exitosamente!
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
              Hemos apartado tu mesa. Presenta este código al llegar a Da Gianni o confírmalo por WhatsApp para atención prioritaria.
            </p>

            {/* Ticket Card */}
            <div className="my-6 p-5 bg-stone-50 border border-stone-200 rounded-xl text-left space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                <span className="text-xs font-semibold text-stone-500">CÓDIGO DE RESERVA</span>
                <span className="font-mono tabular-nums text-base font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {confirmedReservation.id}
                </span>
              </div>
              <div className="flex justify-between text-xs text-stone-700">
                <span className="text-stone-500">Titular:</span>
                <span className="font-semibold text-stone-900">{confirmedReservation.name}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-700">
                <span className="text-stone-500">Fecha y Hora:</span>
                <span className="font-semibold text-stone-900">
                  {confirmedReservation.date} a las {confirmedReservation.time}
                </span>
              </div>
              <div className="flex justify-between text-xs text-stone-700">
                <span className="text-stone-500">Invitados:</span>
                <span className="font-semibold text-stone-900">{confirmedReservation.guests} comensales</span>
              </div>
              <div className="flex justify-between text-xs text-stone-700">
                <span className="text-stone-500">Motivo:</span>
                <span className="font-semibold text-stone-900">{confirmedReservation.occasion}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-700">
                <span className="text-stone-500">Área:</span>
                <span className="font-semibold text-stone-900">
                  {confirmedReservation.areaPreference === 'salon-principal'
                    ? 'Salón Principal Climatizado'
                    : confirmedReservation.areaPreference === 'bodegon-privado'
                    ? 'Zona Bodegón & Vinos'
                    : 'Área Café'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                onClick={handleSendWhatsAppConfirmation}
                type="button"
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Confirmar por WhatsApp</span>
              </button>

              <button
                onClick={resetAndClose}
                type="button"
                className="w-full py-3 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                Listo, cerrar ventana
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Ing. Carlos Valera"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ej: 0412 889 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Fecha *
                </label>
                <input
                  type="date"
                  required
                  min={todayStr}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Hora *
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                >
                  <optgroup label="Desayuno & Café">
                    <option value="07:30">07:30 AM</option>
                    <option value="08:30">08:30 AM</option>
                    <option value="09:30">09:30 AM</option>
                    <option value="10:30">10:30 AM</option>
                  </optgroup>
                  <optgroup label="Almuerzo & Comidas de Negocio">
                    <option value="12:00">12:00 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="13:30">01:30 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="14:30">02:30 PM</option>
                    <option value="15:00">03:00 PM</option>
                  </optgroup>
                  <optgroup label="Cena & Noches de Bodegón">
                    <option value="18:30">06:30 PM</option>
                    <option value="19:00">07:00 PM</option>
                    <option value="19:30">07:30 PM</option>
                    <option value="20:00">08:00 PM</option>
                    <option value="20:30">08:30 PM</option>
                    <option value="21:00">09:00 PM</option>
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Comensales *
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                >
                  <option value={1}>1 persona</option>
                  <option value={2}>2 personas (Pareja / Negocios)</option>
                  <option value={3}>3 personas</option>
                  <option value={4}>4 personas</option>
                  <option value={5}>5 personas</option>
                  <option value={6}>6 personas</option>
                  <option value={8}>8 personas (Grupo)</option>
                  <option value={10}>10 personas</option>
                  <option value={12}>12+ personas (Evento especial)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Motivo de la Visita
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                >
                  <option value="Comida de Negocios / Almuerzo Ejecutivo">Comida de Negocios / Almuerzo Ejecutivo</option>
                  <option value="Celebración Familiar">Celebración Familiar</option>
                  <option value="Cena Romántica / Pareja">Cena Romántica / Pareja</option>
                  <option value="Cumpleaños / Aniversario">Cumpleaños / Aniversario</option>
                  <option value="Desayuno o Café Informal">Desayuno o Café Informal</option>
                  <option value="Reunión de Amigos & Piqueos">Reunión de Amigos & Piqueos</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Preferencia de Área
                </label>
                <select
                  value={formData.areaPreference}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      areaPreference: e.target.value as ReservationFormData['areaPreference'],
                    })
                  }
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                >
                  <option value="salon-principal">Salón Principal Climatizado (Recomendado)</option>
                  <option value="bodegon-privado">Zona Bodegón & Cava de Vinos</option>
                  <option value="cafe">Área Café & Panadería</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Peticiones Especiales (opcional)
              </label>
              <textarea
                rows={2}
                placeholder="Ej: Mesa cerca de enchufe para presentación de negocios, trona de bebé, sorpresa de cumpleaños..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirmar y Reservar Mesa Ahora</span>
              </button>
              <p className="text-[11px] text-stone-400 text-center mt-2">
                Sin costo de reserva · Tolerancia de 15 minutos en mesa
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
