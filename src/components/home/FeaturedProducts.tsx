import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { featuredProducts } from "@/data/products";
import "./FeaturedProducts.css";

export default function FeaturedProducts() {
  return (
    <section className="featured-products">
      <div className="container">
        <div className="featured-products__header">
          <div>
            <p className="section__eyebrow">
              FEATURED DEVICES
            </p>

            <h2 className="section__title">
              Technology worth
              <br />
              bringing home.
            </h2>
          </div>

          <Link
            href="/shop"
            className="featured-products__link"
          >
            View all devices
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="featured-products__grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}