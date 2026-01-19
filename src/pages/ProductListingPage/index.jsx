import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import CategorySlider from '../../components/ui/CategorySlider';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import RecommendationSection from './components/RecommendationSection';
import PageHeader from './components/PageHeader';
import ResolutionInfo from './components/ResolutionInfo';
import { fetchCategories, fetchProductsByCategory } from '../../api/api';

const ProductListingPage = () => {
  const { categoryName } = useParams();
  const [pageData, setPageData] = useState(null);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    resolution: [],
    screenSize: [],
    price: 10000000,
    includeOutOfStock: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategoryAndProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1️⃣ Load all categories
        const categories = await fetchCategories();
        if (!categories || categories.length === 0) {
          setError('No categories available');
          setProducts([]);
          return;
        }

        // 2️⃣ Find the category by URL param
        const category = categories.find(
          c => c.name.toLowerCase() === (categoryName || '').toLowerCase()
        );

        if (!category || !category.id) {
          setError('Category not found');
          setProducts([]);
          return;
        }

        // 3️⃣ Fetch products only if category.id exists
        const prods = await fetchProductsByCategory(category.id || 0);

        setPageData(category);
        setProducts(prods || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load category data');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryAndProducts();
  }, [categoryName]); // filters not yet applied in API

  if (loading)
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  if (error)
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        {error}
      </div>
    );

  return (
    <>
      <Header />
      <main style={{ backgroundColor: '#D5D4D3' }}>
        <CategorySlider />
        <Breadcrumb path={pageData?.breadcrumb || []} />
        <PageHeader
          title={pageData?.pageTitle || pageData?.name || 'Category'}
          subtitle={pageData?.pageSubtitle || ''}
          description={pageData?.description || ''}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <FilterSidebar
                categoryId={pageData?.id || null}
                filters={filters}
                setFilters={setFilters}
                setProducts={setProducts}
              />
            </div>
            <div className="col-md-9">
              <ProductGrid products={products} />
            </div>
          </div>
        </div>
        {pageData?.infoSection && <ResolutionInfo info={pageData.infoSection} />}
        {pageData?.recommendations?.length > 0 && (
          <RecommendationSection products={pageData.recommendations} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default ProductListingPage;
