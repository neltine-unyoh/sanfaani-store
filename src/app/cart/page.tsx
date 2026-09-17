"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  ShieldCheck,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/components/commerce/CartProvider";

import "./cart.css";

export default function CartPage() {
  const {
    items,
    subtotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const formattedSubtotal = `₣ ${subtotal.toLocaleString(
    "en-US"
  )}`;

  if (items.length === 0) {
    return (
      <>
        <Navbar />

        <main className="cart-page">
          <div className="container">
            <div className="cart-empty">
              <div className="cart-empty__icon">
                <span>0</span>
              </div>

              <p className="section__eyebrow">
                YOUR CART
              </p>

              <h1>Your cart is empty.</h1>

              <p>
                Find something that fits your needs and add it
                to your cart.
              </p>

              <Link href="/shop">
                Explore devices
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="cart-page">
        <div className="container">
          <div className="cart-header">
            <div>
              <p className="section__eyebrow">
                YOUR CART
              </p>

              <h1>Ready when you are.</h1>
            </div>

            <Link href="/shop" className="cart-header__back">
              <ArrowLeft size={16} />
              Continue shopping
            </Link>
          </div>

          <div className="cart-layout">
            <div className="cart-items">
              {items.map((item) => (
                <div
                  className="cart-item"
                  key={item.product.id}
                >
                  <div className="cart-item__visual">
                    <span>
                      {item.product.imageLabel}
                    </span>
                  </div>

                  <div className="cart-item__details">
                    <span>
                      {item.product.category}
                    </span>

                    <h2>{item.product.name}</h2>

                    <p>
                      {item.product.condition} ·{" "}
                      {item.product.stockStatus}
                    </p>

                    <div className="cart-item__bottom">
                      <div className="cart-item__quantity">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-item__remove"
                        onClick={() =>
                          removeFromCart(item.product.id)
                        }
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>

                  <strong className="cart-item__price">
                    ₣{" "}
                    {(
                      item.product.price *
                      item.quantity
                    ).toLocaleString("en-US")}
                  </strong>
                </div>
              ))}
            </div>

            <aside className="cart-summary">
              <p>ORDER SUMMARY</p>

              <div className="cart-summary__row">
                <span>Subtotal</span>
                <strong>{formattedSubtotal}</strong>
              </div>

              <div className="cart-summary__row">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="cart-summary__divider" />

              <div className="cart-summary__total">
                <span>Total</span>
                <strong>{formattedSubtotal}</strong>
              </div>

              <Link
                href="/checkout"
                className="cart-summary__checkout"
              >
                Continue to checkout
                <ArrowRight size={17} />
              </Link>

              <div className="cart-summary__trust">
                <ShieldCheck size={17} />

                <span>
                  Your final order details, stock, pricing,
                  fulfillment, and payment status will be
                  confirmed during checkout.
                </span>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}