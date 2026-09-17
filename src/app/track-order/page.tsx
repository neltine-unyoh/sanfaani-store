"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Package,
  Search,
  Truck,
} from "lucide-react";
import { FormEvent, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getMockOrder } from "@/lib/mock-order-storage";
import type { Order } from "@/types/order";

import "./track-order.css";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const storedOrder = getMockOrder();

    if (
      storedOrder &&
      storedOrder.orderNumber.toLowerCase() ===
        orderNumber.trim().toLowerCase()
    ) {
      setOrder(storedOrder);
    } else {
      setOrder(null);
    }

    setSearched(true);
  };

  const handleLoadDemo = () => {
    const storedOrder = getMockOrder();

    if (storedOrder) {
      setOrderNumber(storedOrder.orderNumber);
      setOrder(storedOrder);
      setSearched(true);
    }
  };

  return (
    <>
      <Navbar />

      <main className="track-page">
        <div className="container">
          <section className="track-hero">
            <Link
              href="/"
              className="track-back"
            >
              <ArrowLeft size={16} />
              Back to Sanfaani Store
            </Link>

            <p className="section__eyebrow">
              ORDER TRACKING
            </p>

            <h1>
              Know where your order stands.
            </h1>

            <p>
              Enter your order number to see the
              latest status of your Sanfaani purchase.
            </p>
          </section>

          <section className="track-search-card">
            <form onSubmit={handleSearch}>
              <div className="track-search-field">
                <Search size={19} />

                <input
                  type="text"
                  value={orderNumber}
                  onChange={(event) =>
                    setOrderNumber(
                      event.target.value
                    )
                  }
                  placeholder="Enter order number"
                  aria-label="Order number"
                />
              </div>

              <button type="submit">
                Track order
                <ArrowRight size={17} />
              </button>
            </form>

            <button
              type="button"
              className="track-demo-button"
              onClick={handleLoadDemo}
            >
              Use my latest mock order
            </button>
          </section>

          {searched && !order && (
            <section className="track-not-found">
              <div>
                <Package size={22} />
              </div>

              <h2>Order not found.</h2>

              <p>
                Check the order number and try again.
              </p>
            </section>
          )}

          {order && (
            <section className="track-result">
              <div className="track-result__header">
                <div>
                  <span>ORDER NUMBER</span>

                  <h2>{order.orderNumber}</h2>
                </div>

                <div className="track-status">
                  <span className="track-status__dot" />
                  {getStatusLabel(order.status)}
                </div>
              </div>

              <div className="track-result__divider" />

              <div className="track-timeline">
                <TimelineItem
                  active
                  complete
                  icon={<Check size={14} />}
                  title="Order placed"
                  description="Your order has been received."
                />

                <TimelineLine active />

                <TimelineItem
                  active
                  complete
                  icon={<Check size={14} />}
                  title="Payment confirmed"
                  description="Your payment has been recorded."
                />

                <TimelineLine active />

                <TimelineItem
                  active={
                    order.status !==
                      "pending_payment"
                  }
                  complete={
                    order.status !==
                      "processing" &&
                    order.status !==
                      "pending_payment"
                  }
                  icon={<Package size={14} />}
                  title="Processing"
                  description="Your order is being prepared."
                />

                <TimelineLine
                  active={
                    order.status ===
                      "ready_for_pickup" ||
                    order.status ===
                      "dispatched" ||
                    order.status ===
                      "delivered" ||
                    order.status ===
                      "completed"
                  }
                />

                <TimelineItem
                  active={
                    order.status ===
                      "ready_for_pickup" ||
                    order.status ===
                      "dispatched" ||
                    order.status ===
                      "delivered" ||
                    order.status ===
                      "completed"
                  }
                  complete={
                    order.status ===
                      "delivered" ||
                    order.status ===
                      "completed"
                  }
                  icon={<Truck size={14} />}
                  title={
                    order.fulfillment.method ===
                    "pickup"
                      ? "Ready for pickup"
                      : "Dispatched"
                  }
                  description={
                    order.fulfillment.method ===
                    "pickup"
                      ? "Your order will be ready for collection."
                      : "Your order is on its way."
                  }
                />

                <TimelineLine
                  active={
                    order.status ===
                      "delivered" ||
                    order.status ===
                      "completed"
                  }
                />

                <TimelineItem
                  active={
                    order.status ===
                      "delivered" ||
                    order.status ===
                      "completed"
                  }
                  complete={
                    order.status ===
                    "completed"
                  }
                  icon={<Check size={14} />}
                  title="Completed"
                  description="Your order has been completed."
                />
              </div>

              <div className="track-result__bottom">
                <div className="track-order-items">
                  <span>YOUR ORDER</span>

                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="track-order-item"
                    >
                      <div>
                        <strong>
                          {item.name}
                        </strong>

                        <small>
                          Qty {item.quantity}
                        </small>
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

                <div className="track-order-details">
                  <span>FULFILLMENT</span>

                  <strong>
                    {order.fulfillment.method ===
                    "delivery"
                      ? "Delivery"
                      : "Pickup"}
                  </strong>

                  {order.fulfillment.address && (
                    <p>
                      {
                        order.fulfillment.address
                          .address
                      }
                      <br />
                      {
                        order.fulfillment.address
                          .area
                      }
                      ,{" "}
                      {
                        order.fulfillment.address
                          .city
                      }
                    </p>
                  )}

                  <Link href="/shop">
                    Continue shopping
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

function TimelineItem({
  active,
  complete,
  icon,
  title,
  description,
}: {
  active: boolean;
  complete: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className={`timeline-item ${
        active ? "timeline-item--active" : ""
      } ${complete ? "timeline-item--complete" : ""}`}
    >
      <div className="timeline-item__icon">
        {icon}
      </div>

      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
    </div>
  );
}

function TimelineLine({
  active,
}: {
  active: boolean;
}) {
  return (
    <div
      className={`timeline-connector ${
        active
          ? "timeline-connector--active"
          : ""
      }`}
    />
  );
}

function getStatusLabel(
  status: Order["status"]
) {
  switch (status) {
    case "pending_payment":
      return "Payment pending";

    case "paid":
      return "Payment confirmed";

    case "processing":
      return "Processing";

    case "ready_for_pickup":
      return "Ready for pickup";

    case "dispatched":
      return "Dispatched";

    case "delivered":
      return "Delivered";

    case "completed":
      return "Completed";

    case "cancelled":
      return "Cancelled";

    case "returned":
      return "Returned";

    case "refunded":
      return "Refunded";

    default:
      return "Processing";
  }
}