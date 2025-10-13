import React from 'react';
// Assume icon assets are in src/assets/icons/
const starFull = 'src/assets/icon 7.svg';
const starEmpty = 'src/assets/icon 8.svg';
const cartIcon = 'src/assets/cart.png';
const wishlistIcon = 'src/assets/icon 9.svg';


// This component receives a single 'product' object as a prop
function ProductCard({ product }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="product-card h-100">
        <img src={product.image} className="product-img" alt={product.title} />
        <div className="product-body text-center">
          <h6 className="product-category">{product.category}</h6>
          <h5 className="product-title">{product.title}</h5>
          <p className="product-price">₹{product.price}</p>
          <p className="product-old-price">₹{product.oldPrice}</p>
          <div className="product-rating">
            <img src={starFull} alt="star" className="star" />
            <img src={starFull} alt="star" className="star" />
            <img src={starFull} alt="star" className="star" />
            <img src={starFull} alt="star" className="star" />
            <img src={starEmpty} alt="star" className="star" />
            <span> {product.rating} ({product.reviews})</span>
          </div>
        </div>
        <div className="product-footer">
          <button className="btn-add-cart">
            <img src={cartIcon} alt="Cart" className="me-2" width="16" height="16" /> Add to Cart
          </button>
          <button className="btn-wishlist">
            <img src={wishlistIcon} alt="Wishlist" width="19" height="19" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;