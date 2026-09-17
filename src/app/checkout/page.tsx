"use client";

import Link from "next/link";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { FormEvent, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/components/commerce/CartProvider";
import { createPendingOrder } from "@/lib/orders";
import {
  createMockPayment,
} from "@/lib/mock-payment";
import {
  saveMockOrder,
  saveMockPayment,
} from "@/lib/mock-order-storage";

import "./checkout.css";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [fulfillment, setFulfillment] = useState<
    "delivery" | "pickup"
  >("delivery");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "bank-transfer" | "pickup"
  >("card");

  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  if (items.length === 0) {
    return (
      <>
        <Navbar />

        <main className="checkout-page">
          <div className="container">
            <div className="checkout-empty">
              <p className="section__eyebrow">
                SANFAANI STORE
              </p>

              <h1>Your cart is empty.</h1>

              <p>
                Add a device or accessory before
                continuing to checkout.
              </p>

              <Link
                href="/shop"
                className="checkout-empty__button"
              >
                <ArrowLeft size={17} />
                Continue shopping
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const validate = () => {
    const validationErrors: string[] = [];

    if (!firstName.trim())
      validationErrors.push(
        "First name is required."
      );

    if (!lastName.trim())
      validationErrors.push(
        "Last name is required."
      );

    if (!email.trim())
      validationErrors.push(
        "Email address is required."
      );

    if (!phone.trim())
      validationErrors.push(
        "Phone number is required."
      );

    if (fulfillment === "delivery") {
      if (!address.trim())
        validationErrors.push(
          "Delivery address is required."
        );

      if (!city.trim())
        validationErrors.push("City is required.");

      if (!area.trim())
        validationErrors.push(
          "Area is required."
        );
    }

    return validationErrors;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setErrors([]);

    const validationErrors = validate();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setIsSubmitting(true);

    try {
      const order = createPendingOrder({
        customer: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
        },

        items,

        fulfillment,

        address:
          fulfillment === "delivery"
            ? {
                address: address.trim(),
                city: city.trim(),
                area: area.trim(),
              }
            : undefined,

        paymentMethod,

        notes: notes.trim() || undefined,
      });

      const payment = createMockPayment({
        orderId: order.id,
        orderNumber: order.orderNumber,
        amount: order.total,
        paymentMethod,
      });

      saveMockOrder(order);
      saveMockPayment(payment);

      /*
       * Keep the cart until payment succeeds.
       * The payment screen will clear it after success.
       */

      window.location.href =
        `/payment?order=${order.id}`;
    } catch {
      setErrors([
        "Something went wrong. Please try again.",
      ]);

      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="checkout-page">
        <div className="container">
          <div className="checkout-header">
            <Link
              href="/cart"
              className="checkout-back"
            >
              <ArrowLeft size={16} />
              Back to cart
            </Link>

            <p className="section__eyebrow">
              SECURE CHECKOUT
            </p>

            <h1>Complete your order.</h1>

            <p>
              Tell us where to deliver your
              technology and how you would like to
              pay.
            </p>
          </div>

          {errors.length > 0 && (
            <div className="checkout-error">
              <strong>
                Please check the following:
              </strong>

              <ul>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form
            className="checkout-layout"
            onSubmit={handleSubmit}
          >
            <div className="checkout-main">
              <section className="checkout-section">
                <div className="checkout-section__heading">
                  <span>01</span>

                  <div>
                    <h2>Contact information</h2>

                    <p>
                      We'll use these details for your
                      order updates.
                    </p>
                  </div>
                </div>

                <div className="checkout-form-grid">
                  <label>
                    First name
                    <input
                      type="text"
                      value={firstName}
                      onChange={(event) =>
                        setFirstName(
                          event.target.value
                        )
                      }
                      placeholder="First name"
                    />
                  </label>

                  <label>
                    Last name
                    <input
                      type="text"
                      value={lastName}
                      onChange={(event) =>
                        setLastName(
                          event.target.value
                        )
                      }
                      placeholder="Last name"
                    />
                  </label>

                  <label>
                    Email address
                    <input
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(
                          event.target.value
                        )
                      }
                      placeholder="you@example.com"
                    />
                  </label>

                  <label>
                    Phone number
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) =>
                        setPhone(
                          event.target.value
                        )
                      }
                      placeholder="+237 ..."
                    />
                  </label>
                </div>
              </section>

              <section className="checkout-section">
                <div className="checkout-section__heading">
                  <span>02</span>

                  <div>
                    <h2>Fulfillment</h2>

                    <p>
                      Choose how you'd like to receive
                      your order.
                    </p>
                  </div>
                </div>

                <div className="checkout-options">
                  <label
                    className={`checkout-option ${
                      fulfillment === "delivery"
                        ? "checkout-option--selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="fulfillment"
                      checked={
                        fulfillment ===
                        "delivery"
                      }
                      onChange={() =>
                        setFulfillment(
                          "delivery"
                        )
                      }
                    />

                    <div>
                      <strong>Delivery</strong>

                      <span>
                        We'll deliver your order to
                        your preferred location.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`checkout-option ${
                      fulfillment === "pickup"
                        ? "checkout-option--selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="fulfillment"
                      checked={
                        fulfillment === "pickup"
                      }
                      onChange={() =>
                        setFulfillment("pickup")
                      }
                    />

                    <div>
                      <strong>Pickup</strong>

                      <span>
                        Collect your order from an
                        eligible Sanfaani location.
                      </span>
                    </div>
                  </label>
                </div>

                {fulfillment === "delivery" && (
                  <div className="checkout-address">
                    <label>
                      Delivery address

                      <input
                        type="text"
                        value={address}
                        onChange={(event) =>
                          setAddress(
                            event.target.value
                          )
                        }
                        placeholder="Street address"
                      />
                    </label>

                    <div className="checkout-form-grid">
                      <label>
                        City

                        <input
                          type="text"
                          value={city}
                          onChange={(event) =>
                            setCity(
                              event.target.value
                            )
                          }
                          placeholder="City"
                        />
                      </label>

                      <label>
                        Area

                        <input
                          type="text"
                          value={area}
                          onChange={(event) =>
                            setArea(
                              event.target.value
                            )
                          }
                          placeholder="Area / neighbourhood"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </section>

              <section className="checkout-section">
                <div className="checkout-section__heading">
                  <span>03</span>

                  <div>
                    <h2>Payment</h2>

                    <p>
                      Choose your preferred payment
                      method.
                    </p>
                  </div>
                </div>

                <div className="checkout-options">
                  <label
                    className={`checkout-option ${
                      paymentMethod === "card"
                        ? "checkout-option--selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={
                        paymentMethod === "card"
                      }
                      onChange={() =>
                        setPaymentMethod("card")
                      }
                    />

                    <div>
                      <strong>
                        Card / Mobile Money
                      </strong>

                      <span>
                        Pay securely through Sanfaani
                        Store.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`checkout-option ${
                      paymentMethod ===
                      "bank-transfer"
                        ? "checkout-option--selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={
                        paymentMethod ===
                        "bank-transfer"
                      }
                      onChange={() =>
                        setPaymentMethod(
                          "bank-transfer"
                        )
                      }
                    />

                    <div>
                      <strong>
                        Bank transfer
                      </strong>

                      <span>
                        Complete your transfer and
                        we'll verify it.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`checkout-option ${
                      paymentMethod === "pickup"
                        ? "checkout-option--selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={
                        paymentMethod === "pickup"
                      }
                      onChange={() =>
                        setPaymentMethod("pickup")
                      }
                    />

                    <div>
                      <strong>
                        Pay on pickup
                      </strong>

                      <span>
                        Pay when you collect your
                        order.
                      </span>
                    </div>
                  </label>
                </div>
              </section>

              <section className="checkout-section">
                <div className="checkout-section__heading">
                  <span>04</span>

                  <div>
                    <h2>Order notes</h2>

                    <p>
                      Anything our team should know?
                    </p>
                  </div>
                </div>

                <label>
                  Notes

                  <textarea
                    value={notes}
                    onChange={(event) =>
                      setNotes(event.target.value)
                    }
                    placeholder="Optional"
                    rows={4}
                  />
                </label>
              </section>
            </div>

            <aside className="checkout-summary">
              <div className="checkout-summary__top">
                <p className="section__eyebrow">
                  YOUR ORDER
                </p>

                <h2>Order summary</h2>
              </div>

              <div className="checkout-summary__items">
                {items.map((item) => (
                  <div
                    className="checkout-summary__item"
                    key={item.product.id}
                  >
                    <div>
                      <strong>
                        {item.product.name}
                      </strong>

                      <span>
                        {item.quantity} × ₣{" "}
                        {item.product.price.toLocaleString(
                          "en-US"
                        )}
                      </span>
                    </div>

                    <strong>
                      ₣{" "}
                      {(
                        item.product.price *
                        item.quantity
                      ).toLocaleString(
                        "en-US"
                      )}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="checkout-summary__divider" />

              <div className="checkout-summary__row">
                <span>Subtotal</span>

                <strong>
                  ₣{" "}
                  {subtotal.toLocaleString(
                    "en-US"
                  )}
                </strong>
              </div>

              <div className="checkout-summary__row">
                <span>Delivery</span>

                <span>
                  Calculated at confirmation
                </span>
              </div>

              <div className="checkout-summary__total">
                <span>Total</span>

                <strong>
                  ₣{" "}
                  {subtotal.toLocaleString(
                    "en-US"
                  )}
                </strong>
              </div>

              <button
                type="submit"
                className="checkout-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Preparing payment..."
                ) : (
                  <>
                    <Lock size={17} />
                    Continue to payment
                  </>
                )}
              </button>

              <div className="checkout-security">
                <Check size={15} />

                <span>
                  Secure checkout with payment
                  verification.
                </span>
              </div>
            </aside>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}