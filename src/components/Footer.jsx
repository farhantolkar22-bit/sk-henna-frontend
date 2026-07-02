import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Phone, Heart, ArrowUp } from 'lucide-react';

export default function Footer({ config }) {
  const instagramId = config?.instagramId || '@Henna_by_shifa25';
  const instagramUrl = config?.instagramUrl || 'https://www.instagram.com/Henna_by_shifa25';
  const instagramId2 = config?.instagramId2 || '@sahla_hennartist';
  const instagramUrl2 = config?.instagramUrl2 || 'https://www.instagram.com/sahla_hennartist';
  const whatsappNumber = config?.whatsappNumber || '918149814003';
  const whatsappNumber2 = config?.whatsappNumber2 || '919309463714';

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5 text-left space-y-4">
            <div className="flex flex-col text-left leading-none">
              <span className="text-2xl font-black tracking-wider text-white font-serif">SHAHLA</span>
              <span className="text-[10px] font-bold tracking-widest text-pink-500 uppercase mt-1">by Shifa & Sahla</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Premium chemical-free organic henna cones, rolled with passion and made to order. Providing stunning, dark reddish-brown stains for bridal and festive celebrations.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-4 text-left space-y-4">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Explore</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link to="/" onClick={scrollToTop} className="hover:text-pink-500 transition-colors text-left py-1">Home</Link>
              <Link to="/cones" onClick={scrollToTop} className="hover:text-pink-500 transition-colors text-left py-1">Organic Cones</Link>
              <Link to="/booking" onClick={scrollToTop} className="hover:text-pink-500 transition-colors text-left py-1">Book Henna</Link>
              <Link to="/gallery" onClick={scrollToTop} className="hover:text-pink-500 transition-colors text-left py-1">Gallery</Link>
              <Link to="/contact" onClick={scrollToTop} className="hover:text-pink-500 transition-colors text-left py-1">Contact Us</Link>
            </div>
          </div>

          {/* Connect & Socials */}
          <div className="md:col-span-3 text-left space-y-4">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Connect</h4>
            <div className="space-y-4">
              {/* Shifa Profile */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Cones & Bridal (Shifa)</span>
                <div className="flex items-center space-x-2">
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white p-2 rounded-full transition-colors flex items-center justify-center shrink-0"
                    aria-label="Shifa's Instagram"
                    title="Shifa Mehndi - @Henna_by_shifa25"
                  >
                    <Instagram size={14} />
                  </a>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white p-2 rounded-full transition-all duration-300 shadow-sm shrink-0 flex items-center justify-center"
                    aria-label="Shifa's WhatsApp"
                  >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                    </svg>
                  </a>
                  <a
                    href={`tel:+${whatsappNumber}`}
                    className="bg-slate-800 hover:bg-amber-600 text-slate-300 hover:text-white p-2 rounded-full transition-colors flex items-center justify-center shrink-0"
                    aria-label="Phone Call Shifa"
                  >
                    <Phone size={14} />
                  </a>
                  <span className="text-[11px] font-bold text-slate-400 font-mono tracking-tight">{instagramId}</span>
                </div>
              </div>

              {/* Sahla Profile */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Bookings & Eid (Sahla)</span>
                <div className="flex items-center space-x-2">
                  <a
                    href={instagramUrl2}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white p-2 rounded-full transition-colors flex items-center justify-center shrink-0"
                    aria-label="Sahla's Instagram"
                    title="Sahla Mehndi - @sahla_hennartist"
                  >
                    <Instagram size={14} />
                  </a>
                  <a
                    href={`https://wa.me/${whatsappNumber2}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white p-2 rounded-full transition-all duration-300 shadow-sm shrink-0 flex items-center justify-center"
                    aria-label="Sahla's WhatsApp"
                  >
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                    </svg>
                  </a>
                  <a
                    href={`tel:+${whatsappNumber2}`}
                    className="bg-slate-800 hover:bg-amber-600 text-slate-300 hover:text-white p-2 rounded-full transition-colors flex items-center justify-center shrink-0"
                    aria-label="Phone Call Sahla"
                  >
                    <Phone size={14} />
                  </a>
                  <span className="text-[11px] font-bold text-slate-400 font-mono tracking-tight">{instagramId2}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-pink-500 transition-all uppercase tracking-wider pt-2"
            >
              <span>Back To Top</span>
              <ArrowUp size={14} />
            </button>
          </div>

        </div>

        <hr className="border-slate-800 mb-8" />

        {/* Footer Bottom copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-semibold text-slate-500 space-y-3 sm:space-y-0">
          <span>&copy; {new Date().getFullYear()} SHAHLA by Shifa & Sahla. All rights reserved.</span>
          <span className="flex items-center">
            Made with <Heart size={12} className="text-pink-600 fill-current mx-1" /> by @Henna_by_shifa25
          </span>
        </div>

      </div>
    </footer>
  );
}
