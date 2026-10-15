import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageSquare, Truck, Utensils, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup' | 'dinein'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Divisas en Efectivo ($)');
  const [notes, setNotes] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const subtotal = items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const deliveryFee = orderType === 'delivery' && subtotal > 0 ? 2.0 : 0.0;
  const grandTotal = subtotal + deliveryFee;

  if (!isOpen) return null;

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Por favor indica tu nombre y teléfono para procesar tu orden.');
      return;
    }

    if (orderType === 'delivery' && !address.trim()) {
      alert('Por favor indica tu dirección de entrega en Santa Cruz o alrededores.');
      return;
    }

    // Build the formatted WhatsApp message
    let message = `🍽️ *NUEVO PEDIDO - DA GIANNI*\n\n`;
    message += `👤 *Cliente:* ${customerName.trim()}\n`;
    message += `📞 *Teléfono:* ${customerPhone.trim()}\n`;
    message += `📍 *Modalidad:* ${
      orderType === 'delivery'
        ? `Delivery a domicilio\n🏠 *Dirección:* ${address.trim()}`
        : orderType === 'pickup'
        ? 'Para llevar (Retiro en restaurante)'
        : `Consumo en el local (Mesa #${tableNumber || 'Por asignar'})`
    }\n`;
    message += `💳 *Método de pago:* ${paymentMethod}\n\n`;

    message += `📝 *DETALLE DE LA ORDEN:*\n`;
    items.forEach((cartItem) => {
      message += `• ${cartItem.quantity}x ${cartItem.item.name} ($${(
        cartItem.item.price * cartItem.quantity
      ).toFixed(2)})\n`;
      if (cartItem.specialInstructions) {
        message += `  └ _Nota: ${cartItem.specialInstructions}_\n`;
      }
    });

    message += `\n💵 *Subtotal:* $${subtotal.toFixed(2)}`;
    if (deliveryFee > 0) {
      message += `\n🛵 *Delivery:* $${deliveryFee.toFixed(2)}`;
    }
    message += `\n⭐ *TOTAL A PAGAR:* $${grandTotal.toFixed(2)}\n`;

    if (notes.trim()) {
      message += `\n💬 *Observaciones:* ${notes.trim()}\n`;
    }

    message += `\n_Pedido generado desde el sitio web de Da Gianni_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    setSubmittedSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <div>
                <h2 className="text-base font-semibold leading-none">Tu Pedido</h2>
                <span className="text-[11px] text-stone-400 mt-0.5 block">
                  {items.length === 0 ? 'Sin productos' : `${items.length} tipo(s) de plato`}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Cerrar pedido"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          {submittedSuccess ? (
            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
              <CheckCircle className="w-16 h-16 text-emerald-600 mb-4 animate-bounce" />
              <h3 className="font-serif text-2xl font-bold text-stone-900">¡Pedido Enviado a WhatsApp!</h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xs leading-relaxed">
                Hemos transferido los detalles de tu orden a nuestro WhatsApp oficial. Te responderemos de inmediato para confirmar el tiempo exacto.
              </p>
              <div className="mt-8 flex flex-col gap-3 w-full">
                <button
                  onClick={() => {
                    setSubmittedSuccess(false);
                    onClearCart();
                    onClose();
                  }}
                  type="button"
                  className="w-full py-3 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Finalizar y Cerrar
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-stone-900">Tu orden está vacía</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-xs">
                Explora el menú y agrega nuestras pastas, cafés, minipanes o platos para pedir con delivery o retiro.
              </p>
              <button
                onClick={onClose}
                type="button"
                className="mt-6 px-5 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
              >
                Explorar Menú
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Order Mode Segmented Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  ¿Cómo deseas recibir tu comida?
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 text-[11px] font-medium rounded-md transition-all ${
                      orderType === 'delivery'
                        ? 'bg-white text-stone-950 shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-2 text-[11px] font-medium rounded-md transition-all ${
                      orderType === 'pickup'
                        ? 'bg-white text-stone-950 shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Para Llevar
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('dinein')}
                    className={`py-2 text-[11px] font-medium rounded-md transition-all ${
                      orderType === 'dinein'
                        ? 'bg-white text-stone-950 shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    En Mesa
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Platos seleccionados</span>
                  <button
                    onClick={onClearCart}
                    type="button"
                    className="text-stone-400 hover:text-rose-600 transition-colors"
                  >
                    Vaciar todo
                  </button>
                </div>

                {items.map((cartItem) => (
                  <div
                    key={cartItem.item.id}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-3"
                  >
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-stone-900 truncate">
                          {cartItem.item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(cartItem.item.id)}
                          className="text-stone-400 hover:text-rose-600 p-0.5 transition-colors shrink-0"
                          aria-label="Eliminar plato"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] font-mono tabular-nums text-stone-500 mt-0.5">
                        ${cartItem.item.price.toFixed(2)} c/u
                      </div>

                      {cartItem.specialInstructions && (
                        <p className="text-[11px] text-amber-800 italic mt-1 line-clamp-1">
                          Nota: {cartItem.specialInstructions}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                            className="w-6 h-6 rounded-md bg-white border border-stone-300 text-stone-700 flex items-center justify-center hover:bg-stone-100 transition-colors"
                            aria-label="Reducir cantidad"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono tabular-nums text-xs font-bold text-stone-900 w-4 text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                            className="w-6 h-6 rounded-md bg-white border border-stone-300 text-stone-700 flex items-center justify-center hover:bg-stone-100 transition-colors"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono tabular-nums text-xs font-bold text-stone-950">
                          ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form Details */}
              <form onSubmit={handleSendWhatsAppOrder} className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Tu Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Carmen Gómez"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej: 0412 123 4567"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Dirección de Entrega en Aragua *
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Calle, sector, urbanización, punto de referencia..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                )}

                {orderType === 'dinein' && (
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Número de Mesa (opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Mesa 5 salón o terraza"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Forma de Pago
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    <option value="Divisas en Efectivo ($)">Divisas en Efectivo ($ USD)</option>
                    <option value="Zelle">Zelle</option>
                    <option value="Pago Móvil (Bs)">Pago Móvil (Tasa oficial del día)</option>
                    <option value="Punto de Venta / Tarjeta">Punto de Venta (en local o con repartidor)</option>
                    <option value="Euros (€ en efectivo)">Euros (€ en efectivo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Notas adicionales para Da Gianni
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Pagaré con billete de $20, enviar servilletas extra"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                {/* Subtotal & Summary */}
                <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal de platos:</span>
                    <span className="font-mono tabular-nums text-stone-900 font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between">
                      <span>Servicio de Delivery:</span>
                      <span className="font-mono tabular-nums text-stone-900 font-semibold">
                        ${deliveryFee.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
                    <span>Total Estimado:</span>
                    <span className="font-mono tabular-nums text-amber-700 text-base">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action button */}
                <button
                  type="submit"
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar Pedido a WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
