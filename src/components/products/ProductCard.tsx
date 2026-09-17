"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ShoppingBag,
  Check,
} from "lucide-react";

import type { Product } from "@/data/products";
import { useCart } from "@/components/commerce/CartProvider";

import "./ProductCard.css";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const isUnavailable =
    product.stockStatus === "Unavailable";

  return (
    <article className="product-card">
      <Link
        href={`/shop/${product.id}`}
        className="product-card__image"
      >
        <span className="product-card__condition">
          {product.condition}
        </span>

        <div className="product-card__visual">
          <div className="product-card__device">
            <div className="product-card__device-screen">
              <span>{product.imageLabel}</span>
            </div>
          </div>
        </div>

        <div className="product-card__view">
          <ArrowUpRight size={17} />
        </div>
      </Link>

      <div className="product-card__content">
        <div className="product-card__category">
          {product.category}
        </div>

        <h3 className="product-card__name">
          {product.name}
        </h3>

        <div className="product-card__footer">
          <div>
            <span className="product-card__price">
              ₣ {product.price.toLocaleString("en-US")}
            </span>

            <span
              className={`product-card__availability ${
                product.stockStatus === "Limited"
                  ? "product-card__availability--limited"
                  : product.stockStatus === "Unavailable"
                    ? "product-card__availability--unavailable"
                    : ""
              }`}
            >
              {product.stockStatus}
            </span>
          </div>

          <button
            type="button"
            className="product-card__cart"
            disabled={isUnavailable}
            aria-label={`Add ${product.name} to cart`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              if (!isUnavailable) {
                addToCart(product);
              }
            }}
          >
            {isUnavailable ? (
              <span>—</span>
            ) : (
              <ShoppingBag size={18} />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}