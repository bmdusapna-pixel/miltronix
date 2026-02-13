// src/components/ui/ShopCard.jsx
import React, { useEffect, useState } from "react";
import { addItemToCart, getCartItems } from "../../api/api";

// ⭐ Star icons
const starIconFull = "/assets/icon7.svg";
const starIconHalf = "/assets/icon9.svg";
const starIconEmpty = "/assets/icon8.svg";

const ShopCard = ({ product, onCartUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    console.log("🛒 ShopCard product:", product);
  }, [product]);

  useEffect(() => {
    setAdded(false);
    setSelectedVariant(null);
    if (product?.variants?.length === 1) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product?._id]);

  if (!product) return null;

  // ⭐ Rating
  const ratingValue = Number(product.rating || 4.5);
  const rating = Math.min(5, ratingValue);
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  const reviewsCount = product.reviews || 0;

  // 🖼 Image
  const imageUrl = product.images?.[0]?.url || "/images/placeholder.png";

  // 📂 Category
  const categoryName =
    product.category?.name || product.category?.categoryKey || product.categoryKey || "";

  // 💰 Prices
  const sellingPrice = Number(
    selectedVariant?.sellingPrice ??
      selectedVariant?.price ??
      product.sellingPrice ??
      product.sellingprice ??
      0
  );
  const mrp = Number(selectedVariant?.mrp ?? product.mrp ?? 0);
  const saveAmount = mrp > sellingPrice ? mrp - sellingPrice : 0;

  // 📦 Stock
  const inStock = selectedVariant
    ? selectedVariant.stockQuantity > 0
    : product.stockQuantity > 0;
  const canAddToCart =
    product.variants?.length > 0 ? !!selectedVariant && inStock : inStock;

  // 🛒 Add to cart
  const handleAddToCart = async () => {
    if (!product?._id) return alert("Product ID missing");
    if (!localStorage.getItem("token")) return alert("Please login first");
    if (!canAddToCart) {
      return alert(
        product.variants?.length > 0
          ? "Please select a variant"
          : "Out of stock"
      );
    }

    setLoading(true);
    try {
      await addItemToCart({
        productId: product._id,
        quantity: 1,
        variant: selectedVariant || {},
      });

      setAdded(true);

      if (onCartUpdate) {
        const cart = await getCartItems();
        onCartUpdate(cart);
      }

      console.log("✅ Added to cart");
    } catch (err) {
      console.error("❌ Add to cart error:", err);
      alert(err.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  // ❤️ Wishlist toggle
  const toggleWishlist = () => {
    setWishlist((prev) => !prev);
    // future: call API to add/remove wishlist
  };

  return (
    <div className="shop-card text-center border rounded p-3 position-relative">

      {/* Save badge */}
      {saveAmount > 0 && (
        <span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 rounded">
          Save ₹{saveAmount.toLocaleString()}
        </span>
      )}

      {/* Image */}
      <img
        src={imageUrl}
        alt={product.name}
        className="img-fluid mb-2"
        onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
      />

      {/* Category */}
      <h6 className="text-muted">{categoryName}</h6>

      {/* Name */}
      <h5>{product.name}</h5>

      {/* Price */}
      <p className="fw-bold">₹{sellingPrice.toLocaleString()}</p>

      {/* Old price */}
      {mrp > sellingPrice && (
        <p className="text-muted text-decoration-line-through">
          ₹{mrp.toLocaleString()}
        </p>
      )}

      {/* Rating */}
      <div className="d-flex justify-content-center gap-1 mb-2">
        {[...Array(fullStars)].map((_, i) => (
          <img key={`f-${i}`} src={starIconFull} className="star1" />
        ))}
        {halfStar && <img src={starIconHalf} className="star1" />}
        {[...Array(emptyStars)].map((_, i) => (
          <img key={`e-${i}`} src={starIconEmpty} className="star1" />
        ))}
        <span>({reviewsCount})</span>
      </div>

      {/* Variants */}
      {product.variants?.length > 0 && (
        <div className="d-flex gap-2 flex-wrap justify-content-center mb-2">
          {product.variants.map((v) => {
            const label =
              Object.values(v.attributes || {}).join(" / ") || "Variant";
            const isSelected = selectedVariant?.sku === v.sku;

            return (
              <button
                key={v.sku}
                disabled={v.stockQuantity === 0}
                onClick={() => setSelectedVariant(v)}
                className={`btn btn-sm ${
                  isSelected ? "btn-primary" : "btn-outline-secondary"
                }`}
              >
                {label} {v.stockQuantity === 0 && "(Out of stock)"}
              </button>
            );
          })}
        </div>
      )}

      {/* Buttons */}
      <div className="d-flex justify-content-between mt-2">
        <button
          onClick={handleAddToCart}
          disabled={loading || added || !canAddToCart}
          className={`btn w-75 ${added ? "btn-success" : "btn-primary"}`}
        >
          {loading
            ? "Adding..."
            : added
            ? "Added"
            : canAddToCart
            ? "Add to Cart"
            : product.variants?.length > 0
            ? "Select Variant"
            : "Out of Stock"}
        </button>

        <button className="btn" onClick={toggleWishlist}>
          <i className={`bi bi-heart${wishlist ? "-fill text-danger" : ""}`}></i>
        </button>
      </div>
    </div>
  );
};

export default ShopCard;
