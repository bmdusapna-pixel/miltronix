import React from 'react';
import ShopCard from '../../../components/ui/ShopCard';

const ProductGrid = ({ products = [], loading = false }) => {
  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading products...</div>;

  return (
    <div className="row g-4">
      {products && products.length > 0 ? (
        products.map((product) => <ShopCard key={product.id} product={product} />)
      ) : (
        <div style={{ padding: '2rem', textAlign: 'center' }}>No products match your filters.</div>
      )}
    </div>
  );
};

export default ProductGrid;
