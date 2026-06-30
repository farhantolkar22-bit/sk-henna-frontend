import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import { Sparkles, Calendar, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate('/booking');
  };

  const handleOrderClick = () => {
    navigate('/cones');
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <Hero onBookClick={handleBookClick} onOrderClick={handleOrderClick} />

      {/* Elegant Showcase Divider / Teaser Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Visual Block 1: Service Showcase */}
            <div className="glass-card rounded-[32px] overflow-hidden border border-slate-200/80 p-8 text-left space-y-6 hover:shadow-lg transition-all duration-300">
              <div className="h-64 rounded-2xl overflow-hidden bg-slate-100">
                <img 
                  src="/henna_hands.png" 
                  alt="Henna Bridal Art" 
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="space-y-3">
                <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block">Premium Artistry</span>
                <h3 className="text-2xl font-bold font-serif text-slate-900">Custom Henna Services</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Stunning, intricate patterns tailored for your special occasion. From full traditional bridal arms to elegant minimalist festival mandalas, we bring you custom designs with premium, dark stains.
                </p>
              </div>
              <button 
                onClick={handleBookClick}
                className="bg-slate-900 hover:bg-pink-650 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-md flex items-center space-x-2 group"
              >
                <span>Book Appointment</span>
                <Calendar size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Visual Block 2: Cone Showcase */}
            <div className="glass-card rounded-[32px] overflow-hidden border border-slate-200/80 p-8 text-left space-y-6 hover:shadow-lg transition-all duration-300">
              <div className="h-64 rounded-2xl overflow-hidden bg-slate-100">
                <img 
                  src="/henna_cones.png" 
                  alt="Organic Cones" 
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Handcrafted Cones</span>
                <h3 className="text-2xl font-bold font-serif text-slate-900">100% Organic Henna Cones</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Our cones are freshly homemade using pure organic Rajasthani henna leaves, sugar, and high-quality essential oils. Absolutely zero chemicals, preservatives, or artificial dyes.
                </p>
              </div>
              <button 
                onClick={handleOrderClick}
                className="bg-gradient-to-r from-amber-600 to-pink-600 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-md flex items-center space-x-2 group"
              >
                <span>Order Cones</span>
                <ShoppingBag size={16} className="group-hover:scale-105 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Brand values banner */}
      <section className="bg-brand-gradient py-16 border-y border-white/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Sparkles size={36} className="text-pink-600 mx-auto animate-pulse" />
          <h2 className="text-3xl font-serif font-black text-slate-950">Handcrafted for Timeless Stain</h2>
          <p className="text-slate-800 font-medium text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Every cone is meticulously rolled, packed, and shipped fresh. We ensure the finest, smooth consistency paste so that your designs flow effortlessly.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => navigate('/gallery')}
              className="inline-flex items-center space-x-2 text-pink-700 hover:text-pink-900 font-bold text-sm tracking-wider uppercase"
            >
              <span>View Henna Gallery</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
