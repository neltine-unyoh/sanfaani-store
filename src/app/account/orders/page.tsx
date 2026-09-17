"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Package,
  ShoppingBag,
  Truck,
  MapPin,
  Clock3,
  CheckCircle2,
  CreditCard,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getMockOrders } from "@/lib/mock-order-storage";
import type { Order } from "@/types/order";

import "./orders.css";

function formatPrice(price: number) {
  return `₣ ${price.toLocaleString("en-US")}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getStatusLabel(status: Order["status"]) {
  const labels: Record<Order["status"], string> = {
    pending_payment: "Payment pending",
    paid: "Paid",
    processing: "Processing",
    ready_for_pickup: "Ready for pickup",
    dispatched: "Dispatched",
    delivered: "Delivered",
    completed: "Completed",
    cancelled: "Cancelled",
    returned: "Returned",
    refunded: "Refunded",
  };

  return labels[status];
}

function getStatusClass(status: Order["status"]) {
  if (
    status === "completed" ||
    status === "delivered"
  ) {
    return "orders-status orders-status--success";
  }

  if (
    status === "cancelled" ||
    status === "returned" ||
    status === "refunded"
  ) {
    return "orders-status orders-status--error";
  }

  if (status === "pending_payment") {
    return "orders-status orders-status--warning";
  }

  return "orders-status orders-status--active";
}

function getStatusIcon(status: Order["status"]) {
  if (
    status === "completed" ||
    status === "delivered"
  ) {
    return <CheckCircle2 size={16} />;
  }

  if (status === "dispatched") {
    return <Truck size={16} />;
  }

  if (status === "ready_for_pickup") {
    return <MapPin size={16} />;
  }

  if (status === "pending_payment") {
    return <CreditCard size={16} />;
  }

  return <Clock3 size={16} />;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setOrders(getMockOrders());
    setLoaded(true);
  }, []);

  return (
    <>
      <Navbar />

      <main className="orders-page">
        <section className="orders-hero">
          <div className="container">
            <Link
              href="/shop"
              className="orders-back"
            >
              <ArrowLeft size={16} />
              Back to shop
            </Link>

            <div className="orders-hero__content">
              <div>
                <p className="section__eyebrow">
                  MY ACCOUNT
                </p>

                <h1>Your orders.</h1>

                <p>
                  Keep track of your purchases, payment
                  status, fulfillment, and order history
                  in one place.
                </p>
              </div>

              <div className="orders-hero__icon">
                <Package size={34} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </section>

        <section className="orders-content">
          <div className="container">
            {!loaded ? (
              <div className="orders-loading">
                <div className="orders-loading__spinner" />
                <p>Loading your orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="orders-empty">
                <div className="orders-empty__icon">
                  <ShoppingBag
                    size={28}
                    strokeWidth={1.5}
                  />
                </div>

                <p className="section__eyebrow">
                  ORDER HISTORY
                </p>

                <h2>No orders yet.</h2>

                <p>
                  Your completed purchases will appear
                  here. Start by finding technology that
                  fits your needs.
                </p>

                <Link
                  href="/shop"
                  className="orders-empty__button"
                >
                  Shop technology
                  <ChevronRight size={17} />
                </Link>
              </div>
            ) : (
              <div className="orders-layout">
                <div className="orders-main">
                  <div className="orders-heading">
                    <div>
                      <p className="section__eyebrow">
                        ORDER HISTORY
                      </p>

                      <h2>
                        {orders.length}{" "}
                        {orders.length === 1
                          ? "order"
                          : "orders"}
                      </h2>
                    </div>

                    <Link
                      href="/shop"
                      className="orders-heading__shop"
                    >
                      Continue shopping
                      <ChevronRight size={16} />
                    </Link>
                  </div>

                  <div className="orders-list">
                    {orders.map((order) => (
                      <article
                        key={order.id}
                        className="order-card"
                      >
                        <div className="order-card__header">
                          <div>
                            <span className="order-card__label">
                              Order number
                            </span>

                            <strong>
                              {order.orderNumber}
                            </strong>
                          </div>

                          <div className="order-card__date">
                            {formatDate(
                              order.createdAt
                            )}
                          </div>
                        </div>

                        <div className="order-card__status-row">
                          <div
                            className={getStatusClass(
                              order.status
                            )}
                          >
                            {getStatusIcon(
                              order.status
                            )}

                            {getStatusLabel(
                              order.status
                            )}
                          </div>

                          <span className="order-card__fulfillment">
                            {order.fulfillment.method ===
                            "delivery" ? (
                              <>
                                <Truck size={15} />
                                Delivery
                              </>
                            ) : (
                              <>
                                <MapPin size={15} />
                                Pickup
                              </>
                            )}
                          </span>
                        </div>

                        <div className="order-card__items">
                          {order.items.map((item) => (
                            <div
                              key={item.productId}
                              className="order-card__item"
                            >
                              <div className="order-card__item-image">
                                <span>
                                  {item.category
                                    .slice(0, 1)
                                    .toUpperCase()}
                                </span>
                              </div>

                              <div className="order-card__item-info">
                                <strong>
                                  {item.name}
                                </strong>

                                <span>
                                  {item.condition} · Qty{" "}
                                  {item.quantity}
                                </span>
                              </div>

                              <strong className="order-card__item-price">
                                {formatPrice(
                                  item.totalPrice
                                )}
                              </strong>
                            </div>
                          ))}
                        </div>

                        <div className="order-card__footer">
                          <div>
                            <span>
                              Total
                            </span>

                            <strong>
                              {formatPrice(
                                order.total
                              )}
                            </strong>
                          </div>

                          <Link
                            href={`/track-order?order=${order.orderNumber}`}
                            className="order-card__track"
                          >
                            Track order
                            <ChevronRight
                              size={16}
                            />
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <aside className="orders-sidebar">
                  <div className="orders-sidebar__card">
                    <div className="orders-sidebar__icon">
                      <Package size={19} />
                    </div>

                    <h3>
                      Need help with an order?
                    </h3>

                    <p>
                      Use your order number to track
                      fulfillment or contact Sanfaani
                      support for assistance.
                    </p>

                    <Link
                      href="/track-order"
                      className="orders-sidebar__link"
                    >
                      Track an order
                      <ChevronRight size={15} />
                    </Link>
                  </div>

                  <div className="orders-sidebar__card orders-sidebar__card--dark">
                    <p className="orders-sidebar__eyebrow">
                      SANFAANI SUPPORT
                    </p>

                    <h3>
                      Technology should feel simpler.
                    </h3>

                    <p>
                      From choosing a device to keeping
                      it working, we&apos;re here beyond
                      the sale.
                    </p>

                    <Link
                      href="/repair"
                      className="orders-sidebar__link"
                    >
                      Request a repair
                      <ChevronRight size={15} />
                    </Link>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}