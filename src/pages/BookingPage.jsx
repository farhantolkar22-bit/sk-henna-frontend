import React from 'react';
import BookingForm from '../components/BookingForm';

export default function BookingPage({ config }) {
  return (
    <div className="animate-fade-in pt-16 bg-brand-gradient-light min-h-screen flex items-center justify-center">
      <div className="w-full">
        <BookingForm config={config} />
      </div>
    </div>
  );
}
