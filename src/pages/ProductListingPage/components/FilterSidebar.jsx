import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const FilterSidebar = ({ categoryId, filters, setFilters, setProducts }) => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/category/${categoryId}/filters`);
        setOptions(res.data);
      } catch (err) {
        console.error('Failed to fetch filter options:', err);
      }
    };
    if (categoryId) fetchFilterOptions();
  }, [categoryId]);

  const applyFilters = async (updatedFilters) => {
    setFilters(updatedFilters);
    try {
      const query = new URLSearchParams();
      if (updatedFilters.price) query.append('price', updatedFilters.price);
      if (updatedFilters.resolution?.length) query.append('resolution', updatedFilters.resolution.join(','));
      if (updatedFilters.screenSize?.length) query.append('screenSize', updatedFilters.screenSize.join(','));
      if (updatedFilters.includeOutOfStock) query.append('includeOutOfStock', true);

      const res = await axios.get(`${BASE_URL}/products?category=${categoryId}&${query.toString()}`);
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch filtered products:', err);
    }
  };

  const handleCheckboxChange = (type, value) => {
    const current = filters[type] || [];
    const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    applyFilters({ ...filters, [type]: updated });
  };

  const handlePriceChange = (value) => {
    applyFilters({ ...filters, price: value });
  };

  if (!options) return <div>Loading filters...</div>;

  return (
    <div className="filter-card p-4">
      <h4 className="filter-title mb-4 ff2">Filter</h4>
      {Object.keys(options).map((key) => {
        const filter = options[key];
        if (key === 'price') {
          return (
            <div key="price-filter" className="mb-4">
              <h6 className="filter-subtitle hv">Price</h6>
              <input
                type="range"
                min={filter.min}
                max={filter.max}
                value={filters.price}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="form-range"
              />
              <div className="d-flex justify-content-between">
                <span>₹{filter.min.toLocaleString()}</span>
                <span>₹{filters.price.toLocaleString()}</span>
              </div>
              <hr />
            </div>
          );
        }
        return (
          <div key={key} className="mb-4">
            <h6 className="filter-subtitle hv">{filter.title}</h6>
            {filter.items.map((item) => (
              <div className="form-check" key={item.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={item.id}
                  checked={filters[key]?.includes(item.label) || false}
                  onChange={() => handleCheckboxChange(key, item.label)}
                />
                <label className="form-check-label hv" htmlFor={item.id}>
                  {item.label}
                </label>
              </div>
            ))}
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default FilterSidebar;
