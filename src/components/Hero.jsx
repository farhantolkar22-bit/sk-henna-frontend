import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';

export default function Hero({ onBookClick, onOrderClick }) {
  return (
    <section id="home" className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-brand-gradient-light relative">
      {/* Decorative gradient glowing balls */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-yellow-200 opacity-30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-pink-200 opacity-40 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copywriting & CTAs */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left animate-slide-up">
            <div className="inline-flex items-center space-x-2 bg-pink-50 border border-pink-100 px-3.5 py-1.5 rounded-full text-pink-600 font-semibold text-xs uppercase tracking-wider w-fit">
              <Sparkles size={14} className="animate-pulse" />
              <span>Premium Organic Henna</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-slate-900 leading-tight">
              Stunning Designs,<br />
              <span className="text-brand-gradient">Purest Henna Cones</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Experience the magic of deep, rich stains with our 100% natural, chemical-free henna cones. Freshly homemade to order, designed to elevate your bridal & festive look.
            </p>

            {/* Flyer Key Value Props */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3">
                <div className="bg-pink-100 text-pink-600 p-1.5 rounded-lg">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">100% Pure Organic</h3>
                  <p className="text-slate-500 text-xs">Zero chemicals, entirely plant-based</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-amber-100 text-amber-600 p-1.5 rounded-lg">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">Dark Stain & Rich Color</h3>
                  <p className="text-slate-500 text-xs">Exquisite depth that lasts</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-green-100 text-green-600 p-1.5 rounded-lg">
                  <Zap size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">Freshly Homemade</h3>
                  <p className="text-slate-500 text-xs">Handcrafted in small batches</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-pink-100 text-pink-600 p-1.5 rounded-lg">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">Best Ever Result</h3>
                  <p className="text-slate-500 text-xs">Trusted by brides and professionals</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={onOrderClick}
                className="bg-gradient-to-r from-amber-600 to-pink-600 hover:from-amber-700 hover:to-pink-700 text-white font-medium px-8 py-3.5 rounded-xl shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 text-base"
              >
                <span>Shop Cones Now</span>
                <ArrowRight size={18} />
              </button>
              
              <button
                onClick={onBookClick}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium px-8 py-3.5 rounded-xl shadow-sm hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 text-base"
              >
                <span>Book Henna Artist</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Graphic matching user flyer */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Main Flyer Box Styled using Tailwind */}
            <div className="w-full max-w-[390px] aspect-[4/5] rounded-[32px] bg-brand-gradient p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between border border-white/40 animate-float">
              {/* Header Title from Flyer */}
              <div className="text-center w-full mt-2">
                <h3 className="text-2xl font-cursive font-medium text-amber-950 tracking-wider">@Henna_by_shifa25</h3>
                <h2 className="text-3xl font-serif font-black text-slate-900 border-b-2 border-slate-900 w-fit mx-auto px-4 mt-1 pb-1">
                  SK_Henna
                </h2>
              </div>

              {/* Center section: pricing and round visual */}
              <div className="grid grid-cols-12 gap-3 items-center my-4">
                {/* Curved visual representation */}
                <div className="col-span-6 relative aspect-square rounded-full border-4 border-amber-500 overflow-hidden bg-cover bg-center shadow-lg transform -rotate-6" style={{ backgroundImage: "url('/henna_hands.png')" }}>
                  {/* Decorative backdrop inside circle */}
                </div>

                {/* Cone Pricing Table list */}
                <div className="col-span-6 flex flex-col text-left space-y-1.5 pl-2 z-10">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">Organic Cones</h4>
                  <div className="text-[11px] font-extrabold text-pink-700 leading-none">NAIL CONE</div>
                  <div className="text-lg font-black text-slate-950 leading-none mb-1">₹ 20/-</div>

                  <div className="text-[11px] font-extrabold text-pink-700 leading-none">NORMAL HAND</div>
                  <div className="text-lg font-black text-slate-950 leading-none mb-1">₹ 20/-</div>

                  <div className="text-[11px] font-extrabold text-pink-700 leading-none">BRIDAL CONE</div>
                  <div className="text-lg font-black text-slate-950 leading-none">₹ 40/-</div>
                </div>
              </div>

              {/* Bullet points and booking tag */}
              <div className="flex justify-between items-end">
                {/* Bullet Info */}
                <div className="text-left text-xs space-y-1 flex-1">
                  <div className="flex items-center space-x-1 font-bold text-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
                    <span>100% Pure Organic Cones</span>
                  </div>
                  <p className="text-[10px] text-slate-700 font-medium pl-2.5 -mt-1 leading-tight">Dark strain & rich colour.</p>
                  
                  <div className="flex items-center space-x-1 font-bold text-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
                    <span>Chemical free</span>
                  </div>
                  <p className="text-[10px] text-slate-700 font-medium pl-2.5 -mt-1 leading-tight">Freshly homemade cones.</p>
                </div>

                {/* Miniature Nails Circular Inset */}
                <div className="w-16 h-16 rounded-full border-2 border-amber-400 shadow-md overflow-hidden bg-cover bg-center shrink-0 mr-2 transform translate-y-1" style={{ backgroundImage: "url('/henna_nails.png')" }}>
                </div>

                {/* Yellow Book Now Tag */}
                <button
                  onClick={onOrderClick}
                  className="bg-yellow-200 border border-yellow-300 text-slate-900 font-bold font-serif text-[11px] px-3 py-2 rounded-xl uppercase tracking-wider hover:bg-yellow-300 transition-all shrink-0 hover:scale-[1.05]"
                >
                  Book<br/>Now!
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
