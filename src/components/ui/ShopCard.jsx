import React from 'react';

const starIconFull = '/src/assets/icon 7.svg';
const starIconEmpty = '/src/assets/icon 8.svg';

const ShopCard = ({ product }) => {
  if (!product) return null;

  const fullStars = Math.floor(product.rating || 0);
  const emptyStars = 5 - fullStars;

  // Safe image URL, fallback placeholder
  const imageUrl = product.image ? product.image : '/placeholder.png';

  return (
    <div className="col-md-6 col-lg-4">
      <div className="shop-card text-center">
        {product.saveAmount && (
          <span className="shop-card-badge">Save ₹{product.saveAmount?.toLocaleString()}</span>
        )}
        <img
          src={imageUrl}
          alt={product.title || 'Product'}
          className="img-fluid shop-card-img"
        />
        <h6 className="product-category2">{product.category || ''}</h6>
        <h5 className="product-title2">{product.title || ''}</h5>
        <p className="product-price2">₹{product.price?.toLocaleString() || 0}</p>
        {product.oldPrice && (
          <p className="product-old-price2">₹{product.oldPrice?.toLocaleString()}</p>
        )}
        <div className="product-rating1">
          {[...Array(fullStars)].map((_, i) => (
            <img key={i} src={starIconFull} alt="star" className="star1" />
          ))}
          {[...Array(emptyStars)].map((_, i) => (
            <img key={i} src={starIconEmpty} alt="star" className="star1" />
          ))}
          <span>{product.rating || 0} ({product.reviews || 0})</span>
        </div>
        <div className="d-flex justify-content-between">
          <button className="shop-card-btn-cart w-75">
            <i className="bi bi-cart"></i> Add to Cart
          </button>
          <button className="btn shop-card-btn-wishlist">
            <i className="bi bi-heart-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
