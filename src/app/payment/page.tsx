"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Lock,
  ShieldCheck,
  Smartphone,
  CreditCard,
} from "lucide-react";
import { useEffect, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  getMockOrder,
  getMockPayment,
  saveMockPayment,
} from "@/lib/mock-order-storage";
import {
  processMockPayment,
} from "@/lib/mock-payment";
import type { Order } from "@/types/order";
import type { PaymentIntent } from "@/types/payment";

import "./payment.css";

export default function PaymentPage() {
  const [order, setOrder] =
    useState<Order | null>(null);

  const [payment, setPayment] =
    useState<PaymentIntent | null>(null);

  const [isProcessing, setIsProcessing] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const storedOrder = getMockOrder();
    const storedPayment = getMockPayment();

    setOrder(storedOrder);
    setPayment(storedPayment);
  }, []);

  const handlePayment = async () => {
    if (!order || !payment) return;

    setIsProcessing(true);
    setError("");

    const processingPayment = {
      ...payment,
      status: "processing" as const,
    };

    setPayment(processingPayment);
    saveMockPayment(processingPayment);

    try {
      const result =
        await processMockPayment(
          processingPayment
        );

      if (!result.verified) {
        throw new Error(
          "Payment could not be verified."
        );
      }

      const successfulPayment = {
        ...processingPayment,
        status: "successful" as const,
      };

      saveMockPayment(successfulPayment);

      window.location.href =
        `/order-confirmation?order=${order.id}`;
    } catch {
      setError(
        "Payment failed. Please try again."
      );

      setIsProcessing(false);
    }
  };

  if (!order || !payment) {
    return (
      <>
        <Navbar />

        <main className="payment-page">
          <div className="container">
            <div className="payment-empty">
              <h1>Payment session not found.</h1>

              <p>
                Your checkout session may have
                expired.
              </p>

              <Link href="/shop">
                <ArrowLeft size={16} />
                Return to shop
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const isBankTransfer =
    payment.provider === "bank-transfer";

  const isPickup =
    payment.provider === "pay-on-pickup";

  return (
    <>
      <Navbar />

      <main className="payment-page">
        <div className="container">
          <div className="payment-header">
            <Link
              href="/checkout"
              className="payment-back"
            >
              <ArrowLeft size={16} />
              Back to checkout
            </Link>

            <p className="section__eyebrow">
              PAYMENT
            </p>

            <h1>
              {isBankTransfer
                ? "Complete your transfer."
                : isPickup
                ? "Confirm your order."
                : "Pay securely."}
            </h1>

            <p>
              Order {order.orderNumber}
            </p>
          </div>

          <div className="payment-layout">
            <section className="payment-card">
              <div className="payment-card__header">
                <div className="payment-card__icon">
                  {isBankTransfer ? (
                    <Smartphone size={22} />
                  ) : isPickup ? (
                    <Check size={22} />
                  ) : (
                    <CreditCard size={22} />
                  )}
                </div>

                <div>
                  <span>
                    {isBankTransfer
                      ? "Bank transfer"
                      : isPickup
                      ? "Pay on pickup"
                      : "Card / Mobile Money"}
                  </span>

                  <h2>
                    ₣{" "}
                    {order.total.toLocaleString(
                      "en-US"
                    )}
                  </h2>
                </div>
              </div>

              {error && (
                <div className="payment-error">
                  {error}
                </div>
              )}

              {isBankTransfer ? (
                <div className="payment-instructions">
                  <h3>
                    Transfer instructions
                  </h3>

                  <div>
                    <span>Bank</span>
                    <strong>
                      Sanfaani Business Bank
                    </strong>
                  </div>

                  <div>
                    <span>Account name</span>
                    <strong>
                      Sanfaani LTD
                    </strong>
                  </div>

                  <div>
                    <span>Account number</span>
                    <strong>
                      000 000 0000
                    </strong>
                  </div>

                  <p>
                    Use your order number as the
                    transfer reference.
                  </p>
                </div>
              ) : isPickup ? (
                <div className="payment-instructions">
                  <h3>Pay when you collect</h3>

                  <p>
                    Your order will be prepared for
                    pickup. Payment will be collected
                    when you receive your items.
                  </p>
                </div>
              ) : (
                <div className="mock-payment-form">
                  <label>
                    Cardholder name

                    <input
                      type="text"
                      placeholder="Neltine Unyoh"
                      defaultValue={`${order.customer.firstName} ${order.customer.lastName}`}
                    />
                  </label>

                  <label>
                    Card number

                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      defaultValue="4242 4242 4242 4242"
                    />
                  </label>

                  <div className="mock-payment-grid">
                    <label>
                      Expiry

                      <input
                        type="text"
                        placeholder="MM / YY"
                        defaultValue="12 / 30"
                      />
                    </label>

                    <label>
                      CVV

                      <input
                        type="text"
                        placeholder="123"
                        defaultValue="123"
                      />
                    </label>
                  </div>

                  <div className="mock-payment-note">
                    <Lock size={15} />

                    <span>
                      This is a frontend payment
                      simulation. No real money will
                      be charged.
                    </span>
                  </div>
                </div>
              )}

              <button
                type="button"
                className="payment-button"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="payment-spinner" />
                    Processing payment...
                  </>
                ) : isPickup ? (
                  <>
                    <Check size={18} />
                    Confirm order
                  </>
                ) : isBankTransfer ? (
                  <>
                    <Check size={18} />
                    Confirm transfer
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Pay ₣{" "}
                    {order.total.toLocaleString(
                      "en-US"
                    )}
                  </>
                )}
              </button>
            </section>

            <aside className="payment-summary">
              <div>
                <p className="section__eyebrow">
                  ORDER SUMMARY
                </p>

                <h2>Your order</h2>
              </div>

              <div className="payment-summary__items">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="payment-summary__item"
                  >
                    <div>
                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        {item.quantity} × ₣{" "}
                        {item.unitPrice.toLocaleString(
                          "en-US"
                        )}
                      </span>
                    </div>

                    <strong>
                      ₣{" "}
                      {item.totalPrice.toLocaleString(
                        "en-US"
                      )}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="payment-summary__divider" />

              <div className="payment-summary__row">
                <span>Subtotal</span>

                <strong>
                  ₣{" "}
                  {order.subtotal.toLocaleString(
                    "en-US"
                  )}
                </strong>
              </div>

              <div className="payment-summary__row">
                <span>Delivery</span>

                <span>
                  {order.deliveryFee === 0
                    ? "Included / pending"
                    : `₣ ${order.deliveryFee.toLocaleString(
                        "en-US"
                      )}`}
                </span>
              </div>

              <div className="payment-summary__total">
                <span>Total</span>

                <strong>
                  ₣{" "}
                  {order.total.toLocaleString(
                    "en-US"
                  )}
                </strong>
              </div>

              <div className="payment-trust">
                <ShieldCheck size={19} />

                <div>
                  <strong>
                    Secure payment
                  </strong>

                  <span>
                    Your transaction is processed
                    securely.
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}