"use client";

import { useState } from "react";
import AddToCartButton from "@/components/commerce/AddToCartButton";
import type { Product } from "@/data/products";

export default function ProductPurchase({
  product,
}: {
  product: Product;
}) {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  return (
    <>
      <div className="product-purchase">
        <div className="product-purchase__quantity">
          <button
            type="button"
            onClick={decreaseQuantity}
            aria-label="Decrease quantity"
            disabled={quantity === 1}
          >
            −
          </button>

          <span>{quantity}</span>

          <button
            type="button"
            onClick={increaseQuantity}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <AddToCartButton
          product={product}
          quantity={quantity}
        />
      </div>

      <p className="product-purchase__note">
        Final availability, pricing, fulfillment, and
        payment details are revalidated during checkout.
      </p>
    </>
  );
}