"use client";

import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "./CartProvider";
import type { Product } from "@/data/products";

type AddToCartButtonProps = {
  product: Product;
  quantity?: number;
};

export default function AddToCartButton({
  product,
  quantity = 1,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  const unavailable = product.stockStatus === "Unavailable";

  return (
    <button
      type="button"
      className="product-purchase__button"
      onClick={handleAddToCart}
      disabled={unavailable}
    >
      {added ? (
        <>
          <Check size={18} />
          Added to cart
        </>
      ) : (
        <>
          <ShoppingBag size={18} />
          {unavailable ? "Unavailable" : "Add to cart"}
        </>
      )}
    </button>
  );
}