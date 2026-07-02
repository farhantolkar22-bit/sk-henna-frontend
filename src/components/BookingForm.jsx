import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Phone, User, Send, CheckCircle, Sparkles } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function BookingForm({ config }) {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('userRole') || sessionStorage.getItem('adminToken');

  const handleFormInteraction = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login?redirect=/booking');
    }
  };

  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    date: '',
    time: '',
    occasion: 'Bridal',
    handDetails: 'Both Hands (Front & Back)',
    address: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  const whatsappNumber2 = config?.whatsappNumber2 || '919309463714';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const generateWhatsAppUrl = (booking) => {
    const cleanPhone = booking.phone.replace(/[^0-9]/g, '');
    const waLink = cleanPhone ? `(https://wa.me/${cleanPhone})` : '';
    const message = `*Henna by Shifa & Sahla - Artist Booking* 🌸\n\n` +
      `*Booking ID:* #${booking.id}\n` +
      `*Client Name:* ${booking.clientName}\n` +
      `*Phone Number:* ${booking.phone} ${waLink}\n\n` +
      `*Booking Details:*\n` +
      `• Date: ${booking.date}\n` +
      `• Time: ${booking.time}\n` +
      `• Occasion: ${booking.occasion}\n` +
      `• Design Area: ${booking.handDetails}\n` +
      `• Event Address: ${booking.address}\n` +
      (booking.notes ? `• Special Notes: ${booking.notes}\n` : '') +
      `\nPlease confirm availability for my slot. Thank you! ✨`;

    const encodedText = encodeURIComponent(message);
    return `https://wa.me/${whatsappNumber2}?text=${encodedText}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.phone || !formData.date || !formData.time || !formData.address) {
      setError('Please fill in all required fields (Name, Phone, Date, Time, and Address).');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to request booking.');
      }

      setBookingResult(data.booking);
      setSuccess(true);
      
      setFormData({
        clientName: '',
        phone: '',
        date: '',
        time: '',
        occasion: 'Bridal',
        handDetails: 'Both Hands (Front & Back)',
        address: '',
        notes: ''
      });

      // Auto-redirect to WhatsApp
      const url = generateWhatsAppUrl(data.booking);
      const newTab = window.open(url, '_blank');
      if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
        window.location.href = url;
      }
      
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const redirectToWhatsApp = () => {
    if (bookingResult) {
      const url = generateWhatsAppUrl(bookingResult);
      window.open(url, '_blank');
    }
  };

  return (
    <section id="booking" className="py-20 bg-brand-gradient-light relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-pink-100 opacity-30 blur-3xl pointer-events-none"></div>

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full text-pink-700 font-semibold text-xs uppercase tracking-wider mb-3 animate-pulse">
            <Sparkles size={12} />
            <span>Book A Henna Session</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 mb-4">Book Your Henna Appointment</h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Planning a wedding, festival, or family event? Reserve your henna slot in advance. Fill out the form and confirm via WhatsApp.
          </p>
        </div>

        {success ? (
          <div className="glass-card border-green-200 bg-green-50/20 rounded-[32px] p-8 text-center max-w-lg mx-auto shadow-lg animate-scale-up">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
              <CheckCircle size={36} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Booking Registered!</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Your appointment request (Booking #{bookingResult?.id}) has been recorded. To secure your slot, tap below to confirm availability on WhatsApp.
            </p>
            <button
              onClick={redirectToWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-100 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
            >
              <Send size={18} />
              <span>Confirm Slot on WhatsApp</span>
            </button>
            <button
              onClick={() => {
                setSuccess(false);
                setBookingResult(null);
              }}
              className="mt-4 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Book Another Appointment
            </button>
          </div>
        ) : (
          <div className="glass-card rounded-[32px] p-6 sm:p-10 border border-white/60 shadow-xl max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} onClickCapture={handleFormInteraction} onFocusCapture={handleFormInteraction} className="space-y-6 text-left">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold p-3.5 rounded-xl">
                  {error}
                </div>
              )}

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-slate-800 placeholder-slate-400 text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">WhatsApp Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                      <Phone size={16} />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="WhatsApp contact"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-slate-800 placeholder-slate-400 text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Appointment Date</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                      <Calendar size={16} />
                    </span>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-slate-800 text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Time */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Preferred Time</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                      <Clock size={16} />
                    </span>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-slate-800 text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Occasion */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Occasion</label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-slate-800 text-sm font-medium appearance-none"
                  >
                    <option value="Bridal">Bridal Henna (Wedding)</option>
                    <option value="Engagement">Engagement Party</option>
                    <option value="Festival">Festival (Eid, Karwa Chauth, Diwali, etc.)</option>
                    <option value="Party">Party Guest Henna</option>
                    <option value="Custom">Custom / Other</option>
                  </select>
                </div>

                {/* Design Area / Hand Details */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Design Area</label>
                  <select
                    name="handDetails"
                    value={formData.handDetails}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-slate-800 text-sm font-medium appearance-none"
                  >
                    <option value="Both Hands (Front & Back)">Both Hands (Front & Back)</option>
                    <option value="Both Hands (Palms Only)">Both Hands (Palms Only)</option>
                    <option value="Single Hand (Front & Back)">Single Hand (Front & Back)</option>
                    <option value="Full Arms (Bridal Special)">Full Arms (Bridal Special)</option>
                    <option value="Nail Stain Only">Nail Stain Only</option>
                    <option value="Custom Requirement">Custom Requirement</option>
                  </select>
                </div>
              </div>

              {/* Event Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Event Location / Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 pt-3.5 flex items-start text-slate-400 pointer-events-none">
                    <MapPin size={16} />
                  </span>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2.5"
                    placeholder="Enter complete venue or home address"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-slate-800 placeholder-slate-400 text-sm font-medium resize-none"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Special Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Specify design requirements, guest count, or any styling queries..."
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-slate-800 placeholder-slate-400 text-sm font-medium resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-600 to-pink-600 hover:from-amber-700 hover:to-pink-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-pink-100 hover:shadow-xl hover:shadow-pink-200 transition-all flex items-center justify-center space-x-2 text-base disabled:opacity-50"
              >
                {loading ? (
                  <span>Processing Appointment...</span>
                ) : (
                  <>
                    <Calendar size={18} />
                    <span>Register Appointment</span>
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
