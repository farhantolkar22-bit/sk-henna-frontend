import React, { useState, useEffect } from 'react';
import { ShoppingBag, MapPin, Phone, User, Send, CheckCircle } from 'lucide-react';

export default function BulkOrderForm({ quantities, setQuantities, config }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  const prices = config?.prices || { nailCone: 20, normalCone: 20, bridalCone: 40 };
  const whatsappNumber = config?.whatsappNumber || '918149814003';

  const nailQty = quantities.nailCone || 0;
  const normalQty = quantities.normalCone || 0;
  const bridalQty = quantities.bridalCone || 0;

  const totalItems = nailQty + normalQty + bridalQty;
  const totalPrice = (nailQty * prices.nailCone) + (normalQty * prices.normalCone) + (bridalQty * prices.bridalCone);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const generateWhatsAppUrl = (order) => {
    const message = `*SK_Henna Bulk Cone Order* 🌿\n\n` +
      `*Order ID:* #${order.id}\n` +
      `*Customer Name:* ${order.customerName}\n` +
      `*Phone Number:* ${order.phone}\n\n` +
      `*Items Ordered:*\n` +
      (order.nailConesQty > 0 ? `• Nail Cones: ${order.nailConesQty} x ₹${prices.nailCone} = ₹${order.nailConesQty * prices.nailCone}\n` : '') +
      (order.normalConesQty > 0 ? `• Normal Hand Cones: ${order.normalConesQty} x ₹${prices.normalCone} = ₹${order.normalConesQty * prices.normalCone}\n` : '') +
      (order.bridalConesQty > 0 ? `• Bridal Cones: ${order.bridalConesQty} x ₹${prices.bridalCone} = ₹${order.bridalConesQty * prices.bridalCone}\n` : '') +
      `\n*Total Amount:* ₹${order.totalPrice}/-\n` +
      `*Shipping Address:* ${order.address}\n\n` +
      `Please confirm my order. Thank you! 🙏✨`;

    const encodedText = encodeURIComponent(message);
    return `https://wa.me/${whatsappNumber}?text=${encodedText}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.address) {
      setError('Please fill in all details (Name, Phone, and Address).');
      return;
    }

    if (totalItems <= 0) {
      setError('Please select at least 1 cone from the products section above.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName,
          phone: formData.phone,
          nailConesQty: nailQty,
          normalConesQty: normalQty,
          bridalConesQty: bridalQty,
          address: formData.address
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to place order.');
      }

      setOrderResult(data.order);
      setSuccess(true);
      
      // Clear quantities
      setQuantities({ nailCone: 0, normalCone: 0, bridalCone: 0 });
      setFormData({ customerName: '', phone: '', address: '' });
      
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const redirectToWhatsApp = () => {
    if (orderResult) {
      const url = generateWhatsAppUrl(orderResult);
      window.open(url, '_blank');
    }
  };

  return (
    <section id="bulk-order-form" className="py-16 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-serif font-black text-slate-900 mb-3">Bulk Order Form</h2>
          <p className="text-slate-500 text-sm">
            Enter your details to register the order. After registering, click the WhatsApp button to send your order details instantly.
          </p>
        </div>

        {success ? (
          <div className="glass-card border-green-200 bg-green-50/20 rounded-[32px] p-8 text-center max-w-lg mx-auto shadow-md animate-scale-up">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
              <CheckCircle size={36} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Order Registered!</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Your bulk order (Order #{orderResult?.id}) has been recorded. To confirm shipment, send it to us on WhatsApp below.
            </p>
            <button
              onClick={redirectToWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-100 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
            >
              <Send size={18} />
              <span>Send Order on WhatsApp</span>
            </button>
            <button
              onClick={() => {
                setSuccess(false);
                setOrderResult(null);
              }}
              className="mt-4 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Place Another Order
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Summary Panel */}
            <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-[28px] p-6 text-left">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <ShoppingBag size={18} className="text-pink-600 mr-2" />
                <span>Order Summary</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Nail Cones (₹{prices.nailCone})</span>
                  <span className="font-bold text-slate-800">{nailQty}</span>
                </div>
                <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Normal Cones (₹{prices.normalCone})</span>
                  <span className="font-bold text-slate-800">{normalQty}</span>
                </div>
                <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Bridal Cones (₹{prices.bridalCone})</span>
                  <span className="font-bold text-slate-800">{bridalQty}</span>
                </div>
                
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-slate-900 font-bold text-base">Total Amount</span>
                  <span className="text-2xl font-black text-pink-600">₹{totalPrice}/-</span>
                </div>
              </div>
              
              {totalItems === 0 && (
                <div className="mt-6 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold p-3.5 rounded-xl leading-relaxed">
                  Please select cone quantities in the "Organic Cones" section above to populate your summary.
                </div>
              )}
            </div>

            {/* Right: Shipping details form */}
            <form onSubmit={handleSubmit} className="md:col-span-7 space-y-5 text-left">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold p-3.5 rounded-xl">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-slate-800 placeholder-slate-400 text-sm font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Phone Number (WhatsApp)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    <Phone size={18} />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter WhatsApp mobile number"
                    className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-slate-800 placeholder-slate-400 text-sm font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Shipping Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 pt-3.5 flex items-start text-slate-400 pointer-events-none">
                    <MapPin size={18} />
                  </span>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter complete shipping address with pin code"
                    className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-slate-800 placeholder-slate-400 text-sm font-medium resize-none"
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-600 to-pink-600 hover:from-amber-700 hover:to-pink-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-pink-100 hover:shadow-xl hover:shadow-pink-200 transition-all flex items-center justify-center space-x-2 text-base disabled:opacity-50"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Register Bulk Order</span>
                  </>
                )}
              </button>
            </form>

          </div>
        )}

      </div>
    </section>
  );
}
