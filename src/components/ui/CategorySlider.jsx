import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function CategorySlider() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/category/`);
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading categories...</div>;
  if (!categories.length) return <div style={{ textAlign: 'center', padding: '2rem' }}>No categories found</div>;

  return (
    <section className="category-bg">
      <div className="container">
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          breakpoints={{
            768: { slidesPerView: 4, spaceBetween: 30 },
            992: { slidesPerView: 7, spaceBetween: 30 },
          }}
          className="mySwiper"
        >
          {categories.map((cat) => (
            <SwiperSlide
              key={cat.id}
              className="text-center"
              style={{ cursor: 'pointer' }}
              onClick={() => handleCategoryClick(cat.name)}
            >
              <img
                src={cat.img || '/src/assets/default-category.png'}
                className="category-img"
                alt={cat.name}
              />
              <p className="category-title">{cat.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default CategorySlider;
