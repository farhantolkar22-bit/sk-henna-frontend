import React from 'react';
import { Phone, Instagram, MapPin, Mail, Sparkles, MessageCircle } from 'lucide-react';

export default function Contact({ config }) {
  const instagramId = config?.instagramId || '@Henna_by_shifa25';
  const instagramUrl = config?.instagramUrl || 'https://www.instagram.com/Henna_by_shifa25';
  const whatsappNumber = config?.whatsappNumber || '918149814003';
  const formattedPhone = `+${whatsappNumber.slice(0, 2)} ${whatsappNumber.slice(2, 7)} ${whatsappNumber.slice(7)}`;

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
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="glass-card rounded-[32px] p-8 border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-50/20 text-left transition-all duration-300 group flex items-start space-x-5"
          >
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shrink-0">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.48 4.961 1.481 5.378 0 9.755-4.375 9.758-9.759.002-2.608-1.012-5.06-2.859-6.907C16.602 2.122 14.15 1.107 11.54 1.107c-5.376 0-9.754 4.378-9.758 9.76-.001 1.776.478 3.4 1.385 4.896l-.999 3.647 3.738-.98c1.428.78 3.01 1.192 4.674 1.192zm11.233-6.536c-.26-.13-1.538-.759-1.776-.845-.238-.087-.41-.13-.58.13-.17.26-.66.845-.81.995-.15.17-.3.19-.56.06-.26-.13-1.1-.405-2.096-1.293-.775-.69-1.3-1.544-1.45-1.805-.15-.26-.015-.4-.145-.53-.12-.115-.26-.3-.39-.45-.13-.15-.17-.26-.26-.43-.09-.17-.04-.325.01-.455.05-.13.17-.41.26-.61.09-.2.12-.34.18-.45.06-.11.03-.21-.015-.34-.045-.13-.41-1-.56-1.37-.15-.36-.3-.31-.41-.315-.1-.005-.22-.005-.34-.005-.12 0-.32.045-.49.23-.17.185-.66.645-.66 1.57 0 .925.67 1.82.76 1.95.09.13 1.32 2.016 3.2 2.825.447.193.796.308 1.07.395.45.14.86.12 1.18.07.36-.05 1.538-.627 1.755-1.232.217-.606.217-1.127.15-1.23-.07-.105-.24-.17-.5-.3z"/>
              </svg>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Chat on WhatsApp</span>
              <h3 className="text-xl font-bold text-slate-900 font-serif">Instant Messaging</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Connect directly on WhatsApp to query custom henna bookings, shipping updates, or details.
              </p>
              <div className="pt-2 font-bold text-slate-800 text-sm flex items-center">
                <span>{formattedPhone}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-2 animate-ping"></span>
              </div>
            </div>
          </a>

          {/* Card 2: Phone Call */}
          <a
            href={`tel:+${whatsappNumber}`}
            className="glass-card rounded-[32px] p-8 border border-slate-200 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-50/20 text-left transition-all duration-300 group flex items-start space-x-5"
          >
            <div className="bg-amber-50 text-amber-600 p-4 rounded-2xl group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300 shrink-0">
              <Phone size={28} />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">Call Directly</span>
              <h3 className="text-xl font-bold text-slate-900 font-serif">Voice Call</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Call us directly for urgent orders, pricing, or local booking inquiries.
              </p>
              <div className="pt-2 font-bold text-slate-800 text-sm flex items-center">
                <span>{formattedPhone}</span>
              </div>
            </div>
          </a>

          {/* Card 3: Instagram */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="glass-card rounded-[32px] p-8 border border-slate-200 hover:border-pink-300 hover:shadow-lg hover:shadow-pink-50/20 text-left transition-all duration-300 group flex items-start space-x-5"
          >
            <div className="bg-pink-50 text-pink-600 p-4 rounded-2xl group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300 shrink-0">
              <Instagram size={28} />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-pink-600 uppercase tracking-wider block">Follow on Instagram</span>
              <h3 className="text-xl font-bold text-slate-900 font-serif">Instagram Profile</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Browse our latest bridal mehndi collections, tutorial videos, and customer reviews.
              </p>
              <div className="pt-2 font-bold text-slate-800 text-sm">
                <span>{instagramId}</span>
              </div>
            </div>
          </a>

        </div>

        {/* Business details snippet */}
        <div className="mt-16 text-center text-xs text-slate-400 space-y-2 font-semibold">
          <div className="flex justify-center items-center space-x-1.5">
            <Phone size={14} className="text-pink-600" />
            <a href={`tel:+${whatsappNumber}`} className="hover:text-pink-500 transition-colors">Call: {formattedPhone}</a>
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
