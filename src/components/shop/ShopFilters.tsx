"use client";

import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";
import "./ShopFilters.css";

const categories = [
  "All devices",
  "Laptops",
  "Phones",
  "Tablets",
  "Accessories",
];

const conditions = [
  "All conditions",
  "New",
  "Refurbished",
  "Used",
];

export default function ShopFilters() {
  const [category, setCategory] = useState("All devices");
  const [condition, setCondition] = useState("All conditions");

  return (
    <aside className="shop-filters">
      <div className="shop-filters__mobile-title">
        <SlidersHorizontal size={17} />
        <span>Filters</span>
      </div>

      <div className="shop-filter">
        <label htmlFor="category">Category</label>

        <div className="shop-filter__select">
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <ChevronDown size={15} />
        </div>
      </div>

      <div className="shop-filter">
        <label htmlFor="condition">Condition</label>

        <div className="shop-filter__select">
          <select
            id="condition"
            value={condition}
            onChange={(event) => setCondition(event.target.value)}
          >
            {conditions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <ChevronDown size={15} />
        </div>
      </div>

      <div className="shop-filter">
        <span className="shop-filter__label">
          Price range
        </span>

        <div className="shop-filter__prices">
          <input
            type="number"
            placeholder="Min"
            aria-label="Minimum price"
          />

          <span>—</span>

          <input
            type="number"
            placeholder="Max"
            aria-label="Maximum price"
          />
        </div>
      </div>

      <button type="button" className="shop-filters__clear">
        Clear filters
      </button>
    </aside>
  );
}