import React from 'react';
import { Sparkles, Leaf, Timer, Check } from 'lucide-react';

export default function Products({ quantities, setQuantities, onOrderClick }) {
  
  const products = [
    {
      id: 'siderCone',
      name: 'Sider Cone',
      price: 20,
      description: 'Made with 100% organic Sidr leaf powder. Smooth-flowing consistency with natural conditioning for a rich, cooling stain.',
      img: '/henna_cones.png',
      features: ['Organic Sidr leaves', 'Cooling effect', 'Smooth flow paste', 'Stunning stain']
    },
    {
      id: 'bridalCone',
      name: 'Bridal Cone',
      price: 40,
      description: 'Premium quality double-filtered micro-paste. Hand-rolled fine tip for detailed bridal henna artwork.',
      img: '/henna_hands.png',
      features: ['Bridal artwork', 'Superfine detail', 'Ultra-dark stain', 'Premium choice']
    }
  ];

  const updateQty = (id, delta) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleProductCardClick = (id) => {
    if ((quantities[id] || 0) === 0) {
      updateQty(id, 1);
    }
  };

  return (
    <section id="cones" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full text-amber-700 font-semibold text-xs uppercase tracking-wider mb-3">
            <Leaf size={12} />
            <span>100% Organic & Chemical-Free</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 mb-4">
            Our Organic Cones Range
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Handcrafted with love using top-quality henna leaves and essential oils. Choose the perfect cone for your requirements.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {products.map((prod) => {
            const qty = quantities[prod.id] || 0;
            return (
              <div
                key={prod.id}
                onClick={() => handleProductCardClick(prod.id)}
                className={`glass-card rounded-[24px] overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  qty > 0 ? 'border-pink-500 ring-2 ring-pink-100 shadow-lg scale-[1.01]' : 'border-slate-200 hover:border-pink-300 hover:shadow-md'
                }`}
              >
                {/* Product Image */}
                <div className="h-56 overflow-hidden relative bg-slate-100">
                  <img
                    src={prod.img}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm">
                    <span className="text-lg font-black text-slate-900">₹{prod.price}/-</span>
                  </div>
                  {qty > 0 && (
                    <div className="absolute top-4 left-4 bg-pink-600 text-white p-1.5 rounded-full shadow-md animate-fade-in">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 font-serif">{prod.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed min-h-[60px]">{prod.description}</p>
                    
                    {/* Features checklist */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {prod.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md"
                        >
                          <span className="w-1 h-1 rounded-full bg-pink-500 mr-1.5"></span>
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quantity adjustment & Selection */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quantity</span>
                    <div className="flex items-center space-x-3 bg-slate-100 rounded-full p-1 border border-slate-200">
                      <button
                        onClick={() => updateQty(prod.id, -1)}
                        className="w-8 h-8 rounded-full bg-white hover:bg-slate-50 text-slate-600 font-bold hover:text-pink-600 shadow-sm flex items-center justify-center transition-colors active:scale-95"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold text-slate-800 text-sm">{qty}</span>
                      <button
                        onClick={() => updateQty(prod.id, 1)}
                        className="w-8 h-8 rounded-full bg-white hover:bg-slate-50 text-slate-600 font-bold hover:text-pink-600 shadow-sm flex items-center justify-center transition-colors active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Check Out Card */}
        {Object.values(quantities).some(q => q > 0) && (
          <div className="glass-card rounded-[24px] p-6 max-w-2xl mx-auto border border-pink-100 bg-pink-50/30 flex flex-col sm:flex-row items-center justify-between text-left animate-fade-in">
            <div className="mb-4 sm:mb-0">
              <h3 className="font-bold text-slate-900 text-lg">Calculate Bulk Order Price</h3>
              <p className="text-slate-500 text-sm mt-0.5">
                You've selected cones! Let's fill in your details to process the booking.
              </p>
            </div>
            <button
              onClick={onOrderClick}
              className="bg-gradient-to-r from-amber-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md shadow-pink-100 hover:shadow-lg hover:scale-[1.02] transition-all w-full sm:w-auto text-center"
            >
              Configure Bulk Order
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
