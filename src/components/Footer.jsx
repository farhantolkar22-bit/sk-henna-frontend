import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Phone, Heart, ArrowUp } from 'lucide-react';

export default function Footer({ config }) {
  const instagramId = config?.instagramId || '@Henna_by_shifa25';
  const instagramUrl = config?.instagramUrl || 'https://www.instagram.com/Henna_by_shifa25';
  const whatsappNumber = config?.whatsappNumber || '918149814003';

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
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-serif text-white tracking-wide">SK_Henna</span>
              <span className="text-sm font-cursive text-pink-500 font-medium tracking-wider -mt-1">
                {instagramId}
              </span>
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
            <div className="flex space-x-3">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white p-2.5 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white p-2.5 rounded-full transition-colors"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.48 4.961 1.481 5.378 0 9.755-4.375 9.758-9.759.002-2.608-1.012-5.06-2.859-6.907C16.602 2.122 14.15 1.107 11.54 1.107c-5.376 0-9.754 4.378-9.758 9.76-.001 1.776.478 3.4 1.385 4.896l-.999 3.647 3.738-.98c1.428.78 3.01 1.192 4.674 1.192zm11.233-6.536c-.26-.13-1.538-.759-1.776-.845-.238-.087-.41-.13-.58.13-.17.26-.66.845-.81.995-.15.17-.3.19-.56.06-.26-.13-1.1-.405-2.096-1.293-.775-.69-1.3-1.544-1.45-1.805-.15-.26-.015-.4-.145-.53-.12-.115-.26-.3-.39-.45-.13-.15-.17-.26-.26-.43-.09-.17-.04-.325.01-.455.05-.13.17-.41.26-.61.09-.2.12-.34.18-.45.06-.11.03-.21-.015-.34-.045-.13-.41-1-.56-1.37-.15-.36-.3-.31-.41-.315-.1-.005-.22-.005-.34-.005-.12 0-.32.045-.49.23-.17.185-.66.645-.66 1.57 0 .925.67 1.82.76 1.95.09.13 1.32 2.016 3.2 2.825.447.193.796.308 1.07.395.45.14.86.12 1.18.07.36-.05 1.538-.627 1.755-1.232.217-.606.217-1.127.15-1.23-.07-.105-.24-.17-.5-.3z"/>
                </svg>
              </a>
              <a
                href={`tel:+${whatsappNumber}`}
                className="bg-slate-800 hover:bg-amber-600 text-slate-300 hover:text-white p-2.5 rounded-full transition-colors"
                aria-label="Phone Call"
              >
                <Phone size={18} />
              </a>
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
          <span>&copy; {new Date().getFullYear()} SK Henna. All rights reserved.</span>
          <span className="flex items-center">
            Made with <Heart size={12} className="text-pink-600 fill-current mx-1" /> by @Henna_by_shifa25
          </span>
        </div>

      </div>
    </footer>
  );
}
