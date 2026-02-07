import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { fetchCategories } from "../../api/api";

const BACKEND_URL = "https://miltronix-backend-1.onrender.com";

function CategorySlider() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await fetchCategories();
        setCategories(Array.isArray(cats) ? cats : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleClick = (categoryKey) => {
    navigate(`/category/${categoryKey}`);
  };

  if (loading)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Loading categories...
      </div>
    );

  if (!categories.length)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        No categories found
      </div>
    );

  return (
    <>
      <style>{`
        .category-bg {
          background: #e5e3e1;
          padding: 70px 0 25px 0;
        }

        .category-swiper {
          padding: 10px 0;
        }

        .category-slide {
          text-align: center;
          cursor: pointer;
        }

        // .category-circle {
        //   width: 100px;
        //   height: 100px;
        //   margin: auto;
        //   border-radius: 50%;
        //   background: #fff;
        //   display: flex;
        //   align-items: center;
        //   justify-content: center;
        //   overflow: hidden;
         
        //   padding: 10px; /* ✅ image space */
        // }

        .category-circle:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }

        /* ✅ IMAGE FIX */
        .category-img {
          width: 100%;
          height: 100%;
          object-fit: contain;   /* 🔥 main fix */
          object-position: center;
          border-radius: 50%;
          display: block;
        }

        .category-title {
          margin-top: 10px;
          font-size: 14px;
          font-weight: 600;
          color: #222;
          text-transform: uppercase;
        }

        @media (max-width: 576px) {
          .category-circle {
            width: 90px;
            height: 90px;
          }

          .category-title {
            font-size: 12px;
          }
        }
      `}</style>

      <section className="category-bg">
        <div className="container">
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            breakpoints={{
              576: { slidesPerView: 4 },
              768: { slidesPerView: 5 },
              992: { slidesPerView: 7 },
            }}
            className="category-swiper"
          >
            {categories.map((cat) => (
              <SwiperSlide
                key={cat._id}
                className="category-slide"
                onClick={() => handleClick(cat.categoryKey)}
              >
                <div className="category-circle">
                  <img
                    src={
                      cat.image
                        ? `${BACKEND_URL}${
                            cat.image.startsWith("/") ? "" : "/"
                          }${cat.image}`
                        : "/src/assets/default-category.png"
                    }
                    alt={cat.pageTitle || "category"}
                    className="category-img"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "/src/assets/default-category.png")
                    }
                  />
                </div>

                <p className="category-title">{cat.pageTitle}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}

export default CategorySlider;
