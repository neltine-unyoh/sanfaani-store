"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

import "./shop.css";

const categories = [
  "All",
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

const budgetRanges = [
  { label: "Any budget", min: 0, max: Infinity },
  {
    label: "Under ₣100,000",
    min: 0,
    max: 100000,
  },
  {
    label: "₣100,000 – ₣200,000",
    min: 100000,
    max: 200000,
  },
  {
    label: "₣200,000 – ₣350,000",
    min: 200000,
    max: 350000,
  },
  {
    label: "₣350,000+",
    min: 350000,
    max: Infinity,
  },
];

function getGuidanceLabel(
  device: string | null,
  use: string | null,
  budget: string | null
) {
  const deviceLabel =
    device === "laptop"
      ? "Laptops"
      : device === "phone"
      ? "Phones"
      : device === "tablet"
      ? "Tablets"
      : null;

  const useLabel =
    use === "study"
      ? "Study"
      : use === "work"
      ? "Work"
      : use === "create"
      ? "Create"
      : use === "play"
      ? "Play"
      : null;

  const budgetLabel =
    budget === "under-100"
      ? "Under ₣100,000"
      : budget === "100-200"
      ? "₣100,000 – ₣200,000"
      : budget === "200-350"
      ? "₣200,000 – ₣350,000"
      : budget === "350-plus"
      ? "₣350,000+"
      : null;

  return {
    deviceLabel,
    useLabel,
    budgetLabel,
  };
}

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [condition, setCondition] =
    useState("All conditions");
  const [budget, setBudget] = useState("Any budget");
  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const [urlGuidance] = useState(() => {
    if (typeof window === "undefined") {
      return {
        device: null,
        use: null,
        budget: null,
      };
    }

    const params = new URLSearchParams(
      window.location.search
    );

    return {
      device: params.get("device"),
      use: params.get("use"),
      budget: params.get("budget"),
    };
  });

  const guidance = getGuidanceLabel(
    urlGuidance.device,
    urlGuidance.use,
    urlGuidance.budget
  );

  const hasGuidance =
    Boolean(urlGuidance.device) ||
    Boolean(urlGuidance.use) ||
    Boolean(urlGuidance.budget);

  const filteredProducts = useMemo(() => {
    const selectedBudget = budgetRanges.find(
      (item) => item.label === budget
    );

    return products.filter((product) => {
      const searchMatch =
        !search ||
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.brand
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const categoryMatch =
        category === "All" ||
        product.category === category;

      const conditionMatch =
        condition === "All conditions" ||
        product.condition === condition;

      const budgetMatch =
        !selectedBudget ||
        (product.price >= selectedBudget.min &&
          product.price <= selectedBudget.max);

     const guidanceDeviceMatch =
  !urlGuidance.device ||
  (urlGuidance.device === "laptop" &&
    product.category === "Laptops") ||
  (urlGuidance.device === "phone" &&
    product.category === "Phones") ||
  (urlGuidance.device === "tablet" &&
    product.category === "Tablets");

      return (
        searchMatch &&
        categoryMatch &&
        conditionMatch &&
        budgetMatch &&
        guidanceDeviceMatch
      );
    });
  }, [
    search,
    category,
    condition,
    budget,
    urlGuidance.device,
  ]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setCondition("All conditions");
    setBudget("Any budget");
  };

  return (
    <>
      <Navbar />

      <main className="shop-page">
        {/* Header */}
        <section className="shop-hero">
          <div className="container">
            <Link
              href="/"
              className="shop-back"
            >
              <ArrowLeft size={16} />
              Back home
            </Link>

            <div className="shop-hero__content">
              <div>
                <p className="section__eyebrow">
                  SANFAANI STORE
                </p>

                <h1>
                  Technology,
                  <span> without the guesswork.</span>
                </h1>

                <p>
                  Browse verified technology across
                  laptops, phones, tablets and accessories.
                  See what you&apos;re getting before you
                  buy.
                </p>
              </div>

              <Link
                href="/guidance"
                className="shop-guidance-link"
              >
                <Sparkles size={17} />
                Find my device
              </Link>
            </div>
          </div>
        </section>

        {/* Guidance Context */}
        {hasGuidance && (
          <section className="shop-guidance">
            <div className="container">
              <div className="shop-guidance__inner">
                <div className="shop-guidance__icon">
                  <Sparkles size={18} />
                </div>

                <div className="shop-guidance__copy">
                  <strong>
                    Showing options based on your
                    device profile.
                  </strong>

                  <div className="shop-guidance__tags">
                    {guidance.deviceLabel && (
                      <span>
                        {guidance.deviceLabel}
                      </span>
                    )}

                    {guidance.useLabel && (
                      <span>
                        {guidance.useLabel}
                      </span>
                    )}

                    {guidance.budgetLabel && (
                      <span>
                        {guidance.budgetLabel}
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href="/guidance"
                  className="shop-guidance__edit"
                >
                  Change answers
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Catalogue */}
        <section className="shop-catalogue">
          <div className="container">
            <div className="shop-toolbar">
              <div className="shop-toolbar__result">
                <span>
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1
                    ? "product"
                    : "products"}
                </span>

                {hasGuidance && (
                  <small>
                    matched to your profile
                  </small>
                )}
              </div>

              <button
                type="button"
                className="shop-mobile-filter-button"
                onClick={() =>
                  setMobileFiltersOpen(true)
                }
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
            </div>

            <div className="shop-layout">
              {/* Desktop Filters */}
              <aside className="shop-filters">
                <div className="shop-filters__header">
                  <span>FILTERS</span>

                  <button
                    type="button"
                    onClick={clearFilters}
                  >
                    Clear
                  </button>
                </div>

                <div className="shop-filter">
                  <label htmlFor="desktop-search">
                    Search
                  </label>

                  <div className="shop-search">
                    <Search size={16} />

                    <input
                      id="desktop-search"
                      type="search"
                      placeholder="Search products..."
                      value={search}
                      onChange={(event) =>
                        setSearch(event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="shop-filter">
                  <label>Category</label>

                  <div className="shop-filter-options">
                    {categories.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={
                          category === item
                            ? "shop-filter-option shop-filter-option--active"
                            : "shop-filter-option"
                        }
                        onClick={() =>
                          setCategory(item)
                        }
                      >
                        <span>{item}</span>

                        {category === item && (
                          <span className="shop-filter-dot" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="shop-filter">
                  <label>Condition</label>

                  <div className="shop-select-wrapper">
                    <select
                      value={condition}
                      onChange={(event) =>
                        setCondition(event.target.value)
                      }
                    >
                      {conditions.map((item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}
                    </select>

                    <ChevronDown size={15} />
                  </div>
                </div>

                <div className="shop-filter">
                  <label>Budget</label>

                  <div className="shop-select-wrapper">
                    <select
                      value={budget}
                      onChange={(event) =>
                        setBudget(event.target.value)
                      }
                    >
                      {budgetRanges.map((item) => (
                        <option
                          key={item.label}
                          value={item.label}
                        >
                          {item.label}
                        </option>
                      ))}
                    </select>

                    <ChevronDown size={15} />
                  </div>
                </div>

                <div className="shop-filter__guidance">
                  <Sparkles size={17} />

                  <strong>
                    Not sure what you need?
                  </strong>

                  <p>
                    Answer a few questions and we&apos;ll
                    help narrow down your options.
                  </p>

                  <Link href="/guidance">
                    Find my device →
                  </Link>
                </div>
              </aside>

              {/* Products */}
              <div className="shop-products">
                {filteredProducts.length > 0 ? (
                  <div className="shop-grid">
                    {filteredProducts.map(
                      (product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div className="shop-empty">
                    <div className="shop-empty__icon">
                      <Search size={23} />
                    </div>

                    <h2>
                      No matching products.
                    </h2>

                    <p>
                      Try adjusting your filters or
                      search for something else.
                    </p>

                    <button
                      type="button"
                      onClick={clearFilters}
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filter Drawer */}
        {mobileFiltersOpen && (
          <div className="shop-filter-drawer">
            <div
              className="shop-filter-drawer__backdrop"
              onClick={() =>
                setMobileFiltersOpen(false)
              }
            />

            <div className="shop-filter-drawer__panel">
              <div className="shop-filter-drawer__header">
                <div>
                  <span>FILTERS</span>
                  <h2>Refine your search</h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMobileFiltersOpen(false)
                  }
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="shop-filter-drawer__body">
                <div className="shop-filter">
                  <label>Search</label>

                  <div className="shop-search">
                    <Search size={16} />

                    <input
                      type="search"
                      placeholder="Search products..."
                      value={search}
                      onChange={(event) =>
                        setSearch(event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="shop-filter">
                  <label>Category</label>

                  <div className="shop-filter-options">
                    {categories.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={
                          category === item
                            ? "shop-filter-option shop-filter-option--active"
                            : "shop-filter-option"
                        }
                        onClick={() =>
                          setCategory(item)
                        }
                      >
                        <span>{item}</span>

                        {category === item && (
                          <span className="shop-filter-dot" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="shop-filter">
                  <label>Condition</label>

                  <div className="shop-select-wrapper">
                    <select
                      value={condition}
                      onChange={(event) =>
                        setCondition(event.target.value)
                      }
                    >
                      {conditions.map((item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}
                    </select>

                    <ChevronDown size={15} />
                  </div>
                </div>

                <div className="shop-filter">
                  <label>Budget</label>

                  <div className="shop-select-wrapper">
                    <select
                      value={budget}
                      onChange={(event) =>
                        setBudget(event.target.value)
                      }
                    >
                      {budgetRanges.map((item) => (
                        <option
                          key={item.label}
                          value={item.label}
                        >
                          {item.label}
                        </option>
                      ))}
                    </select>

                    <ChevronDown size={15} />
                  </div>
                </div>
              </div>

              <div className="shop-filter-drawer__footer">
                <button
                  type="button"
                  className="shop-filter-drawer__clear"
                  onClick={clearFilters}
                >
                  Clear all
                </button>

                <button
                  type="button"
                  className="shop-filter-drawer__apply"
                  onClick={() =>
                    setMobileFiltersOpen(false)
                  }
                >
                  Show{" "}
                  {filteredProducts.length} products
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}