import React, { useState } from 'react';
import { Eye, Heart, X, Image as ImageIcon } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const galleryItems = [
    {
      id: 1,
      title: 'Detailed Bridal Henna',
      category: 'bridal',
      img: '/henna_hands.png',
      likes: '142',
      description: 'Intricate floral and geometric patterns covering full hands and wrists, stained to a dark rich mahogany color.'
    },
    {
      id: 2,
      title: 'Organic Henna Cones Pack',
      category: 'cones',
      img: '/henna_cones.png',
      likes: '98',
      description: 'Handcrafted fresh organic henna cones packaged and ready for bridal application.'
    },
    {
      id: 4,
      title: 'Mehndi Mandalas',
      category: 'bridal',
      img: '/henna_hands.png', // Reusing generated high-quality assets to ensure completeness
      likes: '83',
      description: 'Elegant mandala design in the center of the palm with detailed finger detailing.'
    },
    {
      id: 5,
      title: 'Fresh Cones Lineup',
      category: 'cones',
      img: '/henna_cones.png',
      likes: '74',
      description: 'Fresh batch of smooth flowing cones made with pure Rajasthani henna powder and tea tree essential oil.'
    }
  ];

  const categories = [
    { name: 'All Work', value: 'all' },
    { name: 'Bridal Designs', value: 'bridal' },
    { name: 'Organic Cones', value: 'cones' }
  ];

  const filteredItems = activeTab === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <section id="gallery" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full text-pink-700 font-semibold text-xs uppercase tracking-wider mb-3">
            <ImageIcon size={12} />
            <span>Artistic Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 mb-4">Our Henna Gallery</h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Take a look at our authentic creations, including intricate bridal henna designs and freshly rolled organic cones.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide border transition-all ${
                activeTab === tab.value
                  ? 'bg-pink-600 border-pink-600 text-white shadow-md shadow-pink-150'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-pink-200 hover:text-pink-600'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Grid Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group glass-card rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                  <div className="bg-white text-slate-900 p-2.5 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Eye size={20} />
                  </div>
                </div>
              </div>
              
              <div className="p-5 text-left flex justify-between items-center bg-white/50 backdrop-blur-sm">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                  <span className="text-xs text-pink-600 font-semibold uppercase tracking-wider">{item.category}</span>
                </div>
                <div className="flex items-center text-slate-400 space-x-1 hover:text-pink-500 transition-colors">
                  <Heart size={16} className="fill-current text-pink-500/10 hover:text-pink-500" />
                  <span className="text-xs font-bold">{item.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in" onClick={() => setSelectedImage(null)}>
            <div
              className="relative bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl flex flex-col md:flex-row text-left animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-slate-900/60 hover:bg-slate-900/80 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                aria-label="Close details"
              >
                <X size={20} />
              </button>

              {/* Left Side: Photo */}
              <div className="md:w-3/5 aspect-[4/3] md:aspect-auto md:h-[450px] bg-slate-900 overflow-hidden">
                <img
                  src={selectedImage.img}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Side: Details */}
              <div className="p-6 md:p-8 md:w-2/5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-pink-600 uppercase tracking-widest block mb-1">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-slate-950 mb-3">{selectedImage.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{selectedImage.description}</p>
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Authentic Design</span>
                  <a
                    href="https://instagram.com/Henna_by_shifa25"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-pink-600 hover:text-pink-700 transition-colors uppercase tracking-wider"
                  >
                    View on Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
