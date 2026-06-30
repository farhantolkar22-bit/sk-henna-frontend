import React from 'react';
import Contact from '../components/Contact';

export default function ContactPage({ config }) {
  return (
    <div className="animate-fade-in pt-16 bg-white min-h-screen flex items-center justify-center">
      <div className="w-full">
        <Contact config={config} />
      </div>
    </div>
  );
}
