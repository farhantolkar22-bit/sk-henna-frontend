import React from 'react';
import Products from '../components/Products';
import BulkOrderForm from '../components/BulkOrderForm';

export default function ConesPage({ quantities, setQuantities, config }) {
  const handleScrollToForm = () => {
    const el = document.getElementById('bulk-order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in pt-16">
      {/* Products list showoff */}
      <Products 
        quantities={quantities} 
        setQuantities={setQuantities} 
        onOrderClick={handleScrollToForm} 
      />
      {/* Form Submission */}
      <BulkOrderForm 
        quantities={quantities} 
        setQuantities={setQuantities} 
        config={config} 
      />
    </div>
  );
}
