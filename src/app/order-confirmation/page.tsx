"use client";

import Link from "next/link";
import {
  Check,
  Download,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  getMockOrder,
  getMockPayment,
  clearMockCheckout,
} from "@/lib/mock-order-storage";
import type { Order } from "@/types/order";
import type { PaymentIntent } from "@/types/payment";

import "./confirmation.css";

export default function OrderConfirmationPage() {
  const [order, setOrder] =
    useState<Order | null>(null);

  const [payment, setPayment] =
    useState<PaymentIntent | null>(null);

  useEffect(() => {
    const storedOrder = getMockOrder();
    const storedPayment = getMockPayment();

    setOrder(storedOrder);
    setPayment(storedPayment);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!order || !payment) {
    return (
      <>
        <Navbar />

        <main className="confirmation-page">
          <div className="container">
            <div className="confirmation-empty">
              <h1>Order not found.</h1>

              <p>
                We couldn't find the order you're
                looking for.
              </p>

              <Link href="/shop">
                Continue shopping
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const paymentSuccessful =
    payment.status === "successful";

  const receiptNumber = `RCT-${order.orderNumber.replace(
    "SAN-",
    ""
  )}`;

  const formattedDate = new Date(
    order.createdAt
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedTime = new Date(
    order.createdAt
  ).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <Navbar />

      <main className="confirmation-page">
        <div className="container">
          <section className="confirmation-hero">
            <div className="confirmation-success-icon">
              <Check size={32} strokeWidth={2.5} />
            </div>

            <p className="section__eyebrow">
              ORDER CONFIRMED
            </p>

            <h1>Thank you, {order.customer.firstName}.</h1>

            <p>
              Your order has been received and your
              payment has been successfully processed.
            </p>

            <div className="confirmation-number">
              <span>Order number</span>
              <strong>{order.orderNumber}</strong>
            </div>
          </section>

          <div className="confirmation-layout">
            <section className="receipt-card">
              <div className="receipt-header">
                <div>
                  <p className="section__eyebrow">
                    SANFAANI STORE
                  </p>

                  <h2>Payment receipt</h2>
                </div>

                <button
                  type="button"
                  className="receipt-print"
                  onClick={handlePrint}
                >
                  <Download size={16} />
                  Save / Print
                </button>
              </div>

              <div className="receipt-meta">
                <div>
                  <span>Receipt</span>
                  <strong>{receiptNumber}</strong>
                </div>

                <div>
                  <span>Date</span>
                  <strong>
                    {formattedDate}
                  </strong>
                </div>

                <div>
                  <span>Time</span>
                  <strong>
                    {formattedTime}
                  </strong>
                </div>

                <div>
                  <span>Payment</span>

                  <strong className="receipt-paid">
                    <Check size={14} />
                    {paymentSuccessful
                      ? "Paid"
                      : "Pending"}
                  </strong>
                </div>
              </div>

              <div className="receipt-divider" />

              <div className="receipt-items">
                <div className="receipt-items__header">
                  <span>ITEM</span>
                  <span>AMOUNT</span>
                </div>

                {order.items.map((item) => (
                  <div
                    className="receipt-item"
                    key={item.productId}
                  >
                    <div>
                      <strong>{item.name}</strong>

                      <span>
                        {item.condition} · Qty{" "}
                        {item.quantity}
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

              <div className="receipt-divider" />

              <div className="receipt-totals">
                <div>
                  <span>Subtotal</span>

                  <strong>
                    ₣{" "}
                    {order.subtotal.toLocaleString(
                      "en-US"
                    )}
                  </strong>
                </div>

                <div>
                  <span>Delivery</span>

                  <strong>
                    {order.deliveryFee === 0
                      ? "Included"
                      : `₣ ${order.deliveryFee.toLocaleString(
                          "en-US"
                        )}`}
                  </strong>
                </div>

                <div className="receipt-total">
                  <span>Total paid</span>

                  <strong>
                    ₣{" "}
                    {order.total.toLocaleString(
                      "en-US"
                    )}
                  </strong>
                </div>
              </div>

              <div className="receipt-divider" />

              <div className="receipt-customer">
                <div>
                  <span>Customer</span>

                  <strong>
                    {order.customer.firstName}{" "}
                    {order.customer.lastName}
                  </strong>
                </div>

                <div>
                  <span>Email</span>

                  <strong>
                    {order.customer.email}
                  </strong>
                </div>

                <div>
                  <span>Phone</span>

                  <strong>
                    {order.customer.phone}
                  </strong>
                </div>

                <div>
                  <span>Fulfillment</span>

                  <strong>
                    {order.fulfillment.method ===
                    "delivery"
                      ? "Delivery"
                      : "Pickup"}
                  </strong>
                </div>
              </div>
            </section>

            <aside className="confirmation-sidebar">
              <div className="confirmation-status">
                <div className="confirmation-status__icon">
                  <Package size={21} />
                </div>

                <div>
                  <span>ORDER STATUS</span>

                  <strong>
                    {order.fulfillment.method ===
                    "pickup"
                      ? "Preparing for pickup"
                      : "Preparing your order"}
                  </strong>
                </div>
              </div>

              <div className="confirmation-timeline">
                <div className="timeline-item timeline-item--active">
                  <div className="timeline-dot">
                    <Check size={13} />
                  </div>

                  <div>
                    <strong>
                      Order confirmed
                    </strong>

                    <span>
                      Your order has been received.
                    </span>
                  </div>
                </div>

                <div className="timeline-line" />

                <div className="timeline-item">
                  <div className="timeline-dot">
                    <Package size={13} />
                  </div>

                  <div>
                    <strong>
                      Preparing order
                    </strong>

                    <span>
                      Sanfaani will prepare your
                      items.
                    </span>
                  </div>
                </div>

                <div className="timeline-line" />

                <div className="timeline-item">
                  <div className="timeline-dot">
                    <Truck size={13} />
                  </div>

                  <div>
                    <strong>
                      {order.fulfillment.method ===
                      "pickup"
                        ? "Ready for pickup"
                        : "Out for delivery"}
                    </strong>

                    <span>
                      You'll receive an update when
                      it's ready.
                    </span>
                  </div>
                </div>
              </div>

              <div className="confirmation-trust">
                <ShieldCheck size={19} />

                <div>
                  <strong>
                    Your payment is recorded
                  </strong>

                  <span>
                    Transaction ID:{" "}
                    {payment.transactionId}
                  </span>
                </div>
              </div>

              <Link
                href="/shop"
                className="confirmation-shop"
                onClick={() =>
                  clearMockCheckout()
                }
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}