import React from 'react';
import { Phone, Instagram, MapPin, Mail, Sparkles, MessageCircle } from 'lucide-react';

export default function Contact({ config }) {
  const instagramId = config?.instagramId || '@Henna_by_shifa25';
  const instagramUrl = config?.instagramUrl || 'https://www.instagram.com/Henna_by_shifa25';
  const instagramId2 = config?.instagramId2 || '@sahla_hennartist';
  const instagramUrl2 = config?.instagramUrl2 || 'https://www.instagram.com/sahla_hennartist';
  const whatsappNumber = config?.whatsappNumber || '918149814003';
  const whatsappNumber2 = config?.whatsappNumber2 || '919309463714';
  const formattedPhone = `+${whatsappNumber.slice(0, 2)} ${whatsappNumber.slice(2, 7)} ${whatsappNumber.slice(7)}`;
  const formattedPhone2 = `+${whatsappNumber2.slice(0, 2)} ${whatsappNumber2.slice(2, 7)} ${whatsappNumber2.slice(7)}`;

  return (
    <section id="contact" className="py-20 bg-white relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-10 w-80 h-80 rounded-full bg-pink-100/40 opacity-30 blur-3xl pointer-events-none -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full text-amber-700 font-semibold text-xs uppercase tracking-wider mb-3">
            <Sparkles size={12} />
            <span>Connect With Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 mb-4">Get In Touch</h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Have questions about bulk orders, pricing, or custom henna designs? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Card 1: WhatsApp */}
          <div className="glass-card rounded-[32px] p-8 border border-slate-200 hover:shadow-lg transition-all duration-300 text-left flex items-start space-x-5">
            <div className="bg-[#25D366] text-white p-4 rounded-[20px] shadow-sm shrink-0">
              <svg viewBox="0 0 16 16" width="28" height="28" fill="currentColor">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
            </div>
            <div className="space-y-3 w-full">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Chat on WhatsApp</span>
              <h3 className="text-xl font-bold text-slate-900 font-serif">Instant Messaging</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Send queries or place orders instantly. Division of contact for perfect processing.
              </p>
              <div className="pt-1 space-y-2">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/10 transition-all w-full"
                >
                  <span className="font-semibold text-slate-800 text-xs sm:text-sm mr-2 text-left">Order Cones (Shifa)</span>
                  <span className="text-emerald-600 font-bold text-xs whitespace-nowrap shrink-0">{formattedPhone}</span>
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber2}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/10 transition-all w-full"
                >
                  <span className="font-semibold text-slate-800 text-xs sm:text-sm mr-2 text-left">Book Henna (Sahla)</span>
                  <span className="text-emerald-600 font-bold text-xs whitespace-nowrap shrink-0">{formattedPhone2}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Voice Call */}
          <div className="glass-card rounded-[32px] p-8 border border-slate-200 hover:shadow-lg transition-all duration-300 text-left flex items-start space-x-5">
            <div className="bg-amber-50 text-amber-600 p-4 rounded-2xl shrink-0">
              <Phone size={28} />
            </div>
            <div className="space-y-3 w-full">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">Call Directly</span>
              <h3 className="text-xl font-bold text-slate-900 font-serif">Voice Call</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Get quick consultations, shipping updates, or discuss event arrangements.
              </p>
              <div className="pt-1 space-y-2">
                <a
                  href={`tel:+${whatsappNumber}`}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/10 transition-all w-full"
                >
                  <span className="font-semibold text-slate-800 text-xs sm:text-sm mr-2 text-left">Order Cones (Shifa)</span>
                  <span className="text-amber-700 font-bold text-xs whitespace-nowrap shrink-0">{formattedPhone}</span>
                </a>
                <a
                  href={`tel:+${whatsappNumber2}`}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/10 transition-all w-full"
                >
                  <span className="font-semibold text-slate-800 text-xs sm:text-sm mr-2 text-left">Book Henna (Sahla)</span>
                  <span className="text-amber-700 font-bold text-xs whitespace-nowrap shrink-0">{formattedPhone2}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Instagram */}
          <div className="glass-card rounded-[32px] p-8 border border-slate-200 hover:shadow-lg transition-all duration-300 text-left flex items-start space-x-5">
            <div className="bg-pink-50 text-pink-600 p-4 rounded-2xl shrink-0">
              <Instagram size={28} />
            </div>
            <div className="space-y-3 w-full">
              <span className="text-xs font-bold text-pink-600 uppercase tracking-wider block">Follow on Instagram</span>
              <h3 className="text-xl font-bold text-slate-900 font-serif">Mehndi Artists</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Browse our artists' mehndi designs and check availability for weddings, Eid, and special events.
              </p>
              <div className="pt-1 space-y-2">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-pink-200 hover:bg-pink-50/10 transition-all w-full"
                >
                  <span className="font-semibold text-slate-800 text-xs sm:text-sm mr-2 text-left">Shifa (Bridal Mehndi)</span>
                  <span className="text-pink-600 font-bold text-xs whitespace-nowrap shrink-0">{instagramId}</span>
                </a>
                <a
                  href={instagramUrl2}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-pink-200 hover:bg-pink-50/10 transition-all w-full"
                >
                  <span className="font-semibold text-slate-800 text-xs sm:text-sm mr-2 text-left leading-tight">Sahla (Weddings, Eid & Events)</span>
                  <span className="text-pink-600 font-bold text-xs whitespace-nowrap shrink-0">{instagramId2}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Business details snippet */}
        <div className="mt-16 text-center text-xs text-slate-400 space-y-2 font-semibold flex flex-col items-center">
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-2">
            <div className="flex items-center space-x-1.5">
              <Phone size={14} className="text-pink-600" />
              <a href={`tel:+${whatsappNumber}`} className="hover:text-pink-500 transition-colors">Call Shifa (Cones): {formattedPhone}</a>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center space-x-1.5">
              <Phone size={14} className="text-pink-600" />
              <a href={`tel:+${whatsappNumber2}`} className="hover:text-pink-500 transition-colors">Call Sahla (Bookings): {formattedPhone2}</a>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-1.5">
            <MapPin size={14} className="text-pink-600" />
            <span>Available for local appointments & shipping cones nationwide</span>
          </div>
          <div className="flex justify-center items-center space-x-1.5">
            <Mail size={14} className="text-pink-600" />
            <span>skhenna.orders@gmail.com</span>
          </div>
        </div>

      </div>
    </section>
  );
}
