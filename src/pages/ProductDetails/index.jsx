import React, { useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CategorySlider from "../../components/ui/CategorySlider";
import Breadcrumb from "./components/Breadcrumb";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import { productDetailsData, productData, productSpecsData, productReviewsData } from '../../data/MockData';
import KeyFeatures from './components/KeyFeatures';
import ProductSpecs from './components/ProductSpecs';
import RatingSummary from './components/RatingSummary';
import CustomerFeedback from "./components/CustomerFeedback";

const ProductDetailPage = () => {
  const [mainImage, setMainImage] = useState(productData.images[0]);

  return (
    <>
      <Header />
      <main>
        <CategorySlider />
        <section className="product-detail-section">
        <Breadcrumb path={productData.breadcrumb} />
          <div className="container">
            <div className="row g-4 align-items-center">
              <ProductGallery images={productData.images} />
              <ProductInfo product={productData} />
              <KeyFeatures features={productDetailsData.keyFeatures} />
              <ProductSpecs specs={productSpecsData.specifications} />
              <RatingSummary reviews={productReviewsData} />
              <CustomerFeedback reviews={productReviewsData} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
