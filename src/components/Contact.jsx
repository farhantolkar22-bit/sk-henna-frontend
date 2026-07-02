import React from 'react';
import { Phone, Instagram, MapPin, Mail, Sparkles } from 'lucide-react';

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
          <div className="inline-flex items-center space-x-1.5 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full text-amber-700 font-semibold text-xs uppercase tracking-wider mb-3 animate-pulse">
            <Sparkles size={12} />
            <span>Connect With Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 mb-4">Get In Touch</h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Have questions about bulk orders, pricing, or custom henna designs? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Card 1: WhatsApp */}
          <div className="group glass-card rounded-[32px] p-8 border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-50/20 hover:-translate-y-1.5 transition-all duration-300 text-center flex flex-col items-center relative overflow-hidden">
            {/* Bottom Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-50/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white p-5 rounded-2xl shadow-lg shadow-emerald-100/50 mb-6 group-hover:scale-105 transition-transform duration-300 relative z-10">
              <svg viewBox="0 0 16 16" width="28" height="28" fill="currentColor">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
            </div>
            
            <div className="space-y-3 w-full flex flex-col items-center relative z-10 flex-grow">
              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest block">Chat on WhatsApp</span>
              <h3 className="text-xl font-bold text-slate-900 font-serif">Instant Messaging</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-[280px]">
                Send queries or place orders instantly. Division of contact for perfect processing.
              </p>
              
              <div className="pt-4 space-y-3 w-full mt-auto">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white/60 hover:bg-emerald-50/30 hover:border-emerald-200/80 hover:shadow-md hover:shadow-emerald-50/20 transition-all duration-300 w-full group/btn"
                >
                  <div className="text-left">
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-1">Order Cones</span>
                    <span className="block text-sm font-bold text-slate-800">Shifa</span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-100/50 group-hover/btn:bg-emerald-100/40 transition-colors">
                    {formattedPhone}
                  </span>
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber2}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white/60 hover:bg-emerald-50/30 hover:border-emerald-200/80 hover:shadow-md hover:shadow-emerald-50/20 transition-all duration-300 w-full group/btn"
                >
                  <div className="text-left">
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-1">Book Henna</span>
                    <span className="block text-sm font-bold text-slate-800">Sahla</span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-100/50 group-hover/btn:bg-emerald-100/40 transition-colors">
                    {formattedPhone2}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Voice Call */}
          <div className="group glass-card rounded-[32px] p-8 border border-slate-200/80 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-50/20 hover:-translate-y-1.5 transition-all duration-300 text-center flex flex-col items-center relative overflow-hidden">
            {/* Bottom Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-50/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-white p-5 rounded-2xl shadow-lg shadow-amber-100/50 mb-6 group-hover:scale-105 transition-transform duration-300 relative z-10">
              <Phone size={28} />
            </div>
            
            <div className="space-y-3 w-full flex flex-col items-center relative z-10 flex-grow">
              <span className="text-xs font-black text-amber-600 uppercase tracking-widest block">Call Directly</span>
              <h3 className="text-xl font-bold text-slate-900 font-serif">Voice Call</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-[280px]">
                Get quick consultations, shipping updates, or discuss event arrangements.
              </p>
              
              <div className="pt-4 space-y-3 w-full mt-auto">
                <a
                  href={`tel:+${whatsappNumber}`}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white/60 hover:bg-amber-50/30 hover:border-amber-200/80 hover:shadow-md hover:shadow-amber-50/20 transition-all duration-300 w-full group/btn"
                >
                  <div className="text-left">
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-1">Order Cones</span>
                    <span className="block text-sm font-bold text-slate-800">Shifa</span>
                  </div>
                  <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-100/50 group-hover/btn:bg-amber-100/40 transition-colors">
                    {formattedPhone}
                  </span>
                </a>
                <a
                  href={`tel:+${whatsappNumber2}`}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white/60 hover:bg-amber-50/30 hover:border-amber-200/80 hover:shadow-md hover:shadow-amber-50/20 transition-all duration-300 w-full group/btn"
                >
                  <div className="text-left">
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-1">Book Henna</span>
                    <span className="block text-sm font-bold text-slate-800">Sahla</span>
                  </div>
                  <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-100/50 group-hover/btn:bg-amber-100/40 transition-colors">
                    {formattedPhone2}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Instagram */}
          <div className="group glass-card rounded-[32px] p-8 border border-slate-200/80 hover:border-pink-300 hover:shadow-xl hover:shadow-pink-50/20 hover:-translate-y-1.5 transition-all duration-300 text-center flex flex-col items-center relative overflow-hidden">
            {/* Bottom Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-50/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="bg-gradient-to-br from-pink-400 via-rose-500 to-purple-600 text-white p-5 rounded-2xl shadow-lg shadow-pink-100/50 mb-6 group-hover:scale-105 transition-transform duration-300 relative z-10">
              <Instagram size={28} />
            </div>
            
            <div className="space-y-3 w-full flex flex-col items-center relative z-10 flex-grow">
              <span className="text-xs font-black text-pink-600 uppercase tracking-widest block">Follow on Instagram</span>
              <h3 className="text-xl font-bold text-slate-900 font-serif">Mehndi Artists</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-[280px]">
                Browse our artists' mehndi designs and check availability for weddings, Eid, and special events.
              </p>
              
              <div className="pt-4 space-y-3 w-full mt-auto">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white/60 hover:bg-pink-50/30 hover:border-pink-200/80 hover:shadow-md hover:shadow-pink-50/20 transition-all duration-300 w-full group/btn"
                >
                  <div className="text-left">
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-1">Bridal Mehndi</span>
                    <span className="block text-sm font-bold text-slate-800">Shifa</span>
                  </div>
                  <span className="text-xs font-extrabold text-pink-600 bg-pink-50 px-2.5 py-1.5 rounded-xl border border-pink-100/50 group-hover/btn:bg-pink-100/40 transition-colors">
                    {instagramId}
                  </span>
                </a>
                <a
                  href={instagramUrl2}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white/60 hover:bg-pink-50/30 hover:border-pink-200/80 hover:shadow-md hover:shadow-pink-50/20 transition-all duration-300 w-full group/btn"
                >
                  <div className="text-left">
                    <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-1">Weddings & Eid</span>
                    <span className="block text-sm font-bold text-slate-800">Sahla</span>
                  </div>
                  <span className="text-xs font-extrabold text-pink-600 bg-pink-50 px-2.5 py-1.5 rounded-xl border border-pink-100/50 group-hover/btn:bg-pink-100/40 transition-colors">
                    {instagramId2}
                  </span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Business details snippet Horizontal Bar */}
        <div className="mt-20 max-w-4xl mx-auto glass-card rounded-[28px] p-6 border border-slate-200/60 shadow-sm flex flex-col md:flex-row items-center justify-around gap-6 text-sm text-slate-650 font-semibold relative overflow-hidden">
          
          <div className="flex items-center space-x-3 group relative z-10">
            <div className="bg-pink-50 text-pink-600 p-2.5 rounded-xl group-hover:scale-110 transition-transform">
              <Phone size={16} />
            </div>
            <div className="text-left">
              <span className="block text-[9px] text-slate-400 font-extrabold uppercase tracking-widest leading-none mb-1">Direct Hotline</span>
              <a href={`tel:+${whatsappNumber}`} className="hover:text-pink-600 transition-colors">{formattedPhone}</a>
            </div>
          </div>
          
          <div className="hidden md:block h-8 w-px bg-slate-200"></div>

          <div className="flex items-center space-x-3 group relative z-10">
            <div className="bg-pink-50 text-pink-600 p-2.5 rounded-xl group-hover:scale-110 transition-transform">
              <MapPin size={16} />
            </div>
            <div className="text-left">
              <span className="block text-[9px] text-slate-400 font-extrabold uppercase tracking-widest leading-none mb-1">Location & Shipping</span>
              <span className="text-slate-700">Available Nationwide</span>
            </div>
          </div>

          <div className="hidden md:block h-8 w-px bg-slate-200"></div>

          <div className="flex items-center space-x-3 group relative z-10">
            <div className="bg-pink-50 text-pink-600 p-2.5 rounded-xl group-hover:scale-110 transition-transform">
              <Mail size={16} />
            </div>
            <div className="text-left">
              <span className="block text-[9px] text-slate-400 font-extrabold uppercase tracking-widest leading-none mb-1">Email Inquiry</span>
              <a href="mailto:skhenna.orders@gmail.com" className="hover:text-pink-600 transition-colors">skhenna.orders@gmail.com</a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
