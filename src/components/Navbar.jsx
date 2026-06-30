import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Instagram } from 'lucide-react';

export default function Navbar({ userRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Organic Cones', path: '/cones' },
    { name: 'Book Henna', path: '/booking' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const handleNavClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('userRole');
    window.location.reload();
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo / Brand */}
          <Link to="/" className="flex flex-col cursor-pointer" onClick={handleNavClick}>
            <span className="text-2xl font-semibold tracking-wide text-slate-800 font-serif">SK_Henna</span>
            <span className="text-sm font-cursive text-pink-600 tracking-wider -mt-1 font-medium">@Henna_by_shifa25</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className={({ isActive }) => 
                  `text-sm font-medium tracking-wide transition-colors ${
                    isActive ? 'text-pink-600 font-semibold' : 'text-slate-600 hover:text-pink-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            {userRole ? (
              <div className="flex items-center space-x-3 bg-pink-50 border border-pink-100 rounded-full px-3 py-1.5 shadow-sm">
                <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">
                  {userRole === 'admin' ? 'Admin' : 'User'} Mode
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase border-l border-slate-200 pl-3"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                onClick={handleNavClick}
                className={({ isActive }) => 
                  `text-xs font-semibold uppercase tracking-wider transition-colors border px-3 py-1.5 rounded-full ${
                    isActive 
                      ? 'bg-pink-50 border-pink-200 text-pink-600' 
                      : 'text-slate-400 hover:text-pink-600 border-slate-200 hover:border-pink-250'
                  }`
                }
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Call to Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://instagram.com/Henna_by_shifa25"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full text-slate-500 hover:text-pink-600 hover:bg-pink-50 transition-all"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            
            <Link
              to="/cones"
              onClick={handleNavClick}
              className="bg-gradient-to-r from-amber-600 to-pink-600 text-white font-medium text-sm px-5 py-2.5 rounded-full shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Order Cones
            </Link>
          </div>

          {/* Mobile hamburger menu */}
          <div className="md:hidden flex items-center space-x-3">
            <a
              href="https://instagram.com/Henna_by_shifa25"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full text-slate-500 hover:text-pink-600 transition-all"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-pink-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden glass-nav absolute top-full left-0 w-full shadow-lg border-t border-slate-100 py-4 px-6 animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className={({ isActive }) => 
                  `text-left text-base font-medium py-1 transition-colors ${
                    isActive ? 'text-pink-600 font-semibold' : 'text-slate-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            {userRole ? (
              <div className="flex flex-col space-y-2 py-2 border-t border-slate-150">
                <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">
                  Logged in as: {userRole}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-left text-sm font-semibold text-slate-400 hover:text-red-500 py-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                onClick={handleNavClick}
                className={({ isActive }) => 
                  `text-left text-sm font-semibold uppercase tracking-wider py-1 ${
                    isActive ? 'text-pink-600' : 'text-slate-400'
                  }`
                }
              >
                Login
              </NavLink>
            )}
            
            <hr className="border-slate-100" />
            
            <Link
              to="/booking"
              onClick={handleNavClick}
              className="text-center bg-gradient-to-r from-amber-600 to-pink-600 text-white font-medium py-3 rounded-xl shadow-md"
            >
              Book Henna Artist
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
