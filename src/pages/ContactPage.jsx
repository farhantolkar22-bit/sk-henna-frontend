import React from 'react';
import Contact from '../components/Contact';

export default function ContactPage({ config }) {
  return (
    <div className="animate-fade-in pt-20 bg-white min-h-screen">
      <Contact config={config} />
    </div>
  );
}
