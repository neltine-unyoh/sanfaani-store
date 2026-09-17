"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  ClipboardList,
  Package,
  ShieldCheck,
  ShoppingBag,
  UserRound,
  Wrench,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { getMockOrders } from "@/lib/mock-order-storage";
import type { MockOrder } from "@/lib/mock-order-storage";
import "./account.css";

type RepairRequest = {
  requestNumber: string;
  status: string;
  deviceType: string;
  model: string;
  issue: string;
  createdAt: string;
};

type BusinessRequest = {
  requestNumber: string;
  status: string;
  organization: string;
  requirement: string;
  createdAt: string;
};

export default function AccountPage() {
  const [orders, setOrders] = useState<MockOrder[]>([]);
  const [repair, setRepair] = useState<RepairRequest | null>(null);
  const [businessRequest, setBusinessRequest] =
    useState<BusinessRequest | null>(null);

  useEffect(() => {
    setOrders(getMockOrders());

    const storedRepair = localStorage.getItem(
      "sanfaani_current_repair"
    );

    if (storedRepair) {
      try {
        setRepair(JSON.parse(storedRepair));
      } catch {
        setRepair(null);
      }
    }

    const storedBusiness = localStorage.getItem(
      "sanfaani_current_business_request"
    );

    if (storedBusiness) {
      try {
        setBusinessRequest(JSON.parse(storedBusiness));
      } catch {
        setBusinessRequest(null);
      }
    }
  }, []);

  const latestOrder = orders[0];

  return (
    <>
      <Navbar />

      <main className="account-page">
        <section className="account-hero">
          <div className="container">
            <div className="account-hero__eyebrow">
              <UserRound size={15} />
              MY ACCOUNT
            </div>

            <div className="account-hero__row">
              <div>
                <h1>Your Sanfaani account.</h1>

                <p>
                  Keep track of your purchases, repairs, procurement
                  requests, and support in one place.
                </p>
              </div>

              <Link
                href="/shop"
                className="account-hero__shop"
              >
                Continue shopping
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section className="account-content section">
          <div className="container">
            <div className="account-grid">
              <div className="account-main">
                <div className="account-section-heading">
                  <div>
                    <span>ACTIVITY</span>
                    <h2>What&apos;s happening</h2>
                  </div>
                </div>

                <div className="account-overview-grid">
                  <Link
                    href="/account/orders"
                    className="account-overview-card"
                  >
                    <div className="account-overview-card__top">
                      <div className="account-overview-card__icon">
                        <Package size={21} />
                      </div>

                      <ChevronRight size={18} />
                    </div>

                    <strong>{orders.length}</strong>

                    <span>
                      {orders.length === 1 ? "Order" : "Orders"}
                    </span>

                    <p>
                      View your order history and track your purchases.
                    </p>
                  </Link>

                  <Link
                    href="/repair"
                    className="account-overview-card"
                  >
                    <div className="account-overview-card__top">
                      <div className="account-overview-card__icon">
                        <Wrench size={21} />
                      </div>

                      <ChevronRight size={18} />
                    </div>

                    <strong>{repair ? "1" : "0"}</strong>

                    <span>Repair request</span>

                    <p>
                      Request a repair or follow your latest repair.
                    </p>
                  </Link>

                  <Link
                    href="/business"
                    className="account-overview-card"
                  >
                    <div className="account-overview-card__top">
                      <div className="account-overview-card__icon">
                        <Building2 size={21} />
                      </div>

                      <ChevronRight size={18} />
                    </div>

                    <strong>{businessRequest ? "1" : "0"}</strong>

                    <span>Business request</span>

                    <p>
                      Submit and reference your organization&apos;s
                      procurement request.
                    </p>
                  </Link>
                </div>

                {latestOrder ? (
                  <section className="account-panel">
                    <div className="account-panel__header">
                      <div>
                        <span>RECENT ORDER</span>
                        <h3>{latestOrder.orderNumber}</h3>
                      </div>

                      <Link href="/account/orders">
                        View all
                        <ArrowRight size={15} />
                      </Link>
                    </div>

                    <div className="account-order">
                      <div className="account-order__status">
                        <span className="account-status-dot" />
                        {formatStatus(latestOrder.status)}
                      </div>

                      <div className="account-order__details">
                        <div>
                          <span>Placed</span>
                          <strong>
                            {formatDate(latestOrder.createdAt)}
                          </strong>
                        </div>

                        <div>
                          <span>Items</span>
                          <strong>{latestOrder.items.length}</strong>
                        </div>

                        <div>
                          <span>Total</span>
                          <strong>
                            {formatCurrency(latestOrder.total)}
                          </strong>
                        </div>

                        <div>
                          <span>Fulfillment</span>
                          <strong>
                            {latestOrder.fulfillment.method === "pickup"
                              ? "Pickup"
                              : "Delivery"}
                          </strong>
                        </div>
                      </div>

                      <Link
                        href={`/track-order?order=${encodeURIComponent(
                          latestOrder.orderNumber
                        )}`}
                        className="account-order__track"
                      >
                        Track this order
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </section>
                ) : (
                  <section className="account-empty">
                    <div className="account-empty__icon">
                      <ShoppingBag size={23} />
                    </div>

                    <div>
                      <h3>Your order history is empty.</h3>
                      <p>
                        Once you place an order, you&apos;ll be able to
                        track it from your account.
                      </p>
                    </div>

                    <Link
                      href="/shop"
                      className="account-empty__button"
                    >
                      Explore the store
                      <ArrowRight size={16} />
                    </Link>
                  </section>
                )}

                {repair && (
                  <section className="account-panel">
                    <div className="account-panel__header">
                      <div>
                        <span>LATEST REPAIR</span>
                        <h3>{repair.requestNumber}</h3>
                      </div>

                      <Link
                        href="/track-repair"
                      >
                        Track
                        <ArrowRight size={15} />
                      </Link>
                    </div>

                    <div className="account-request">
                      <div className="account-request__icon">
                        <Wrench size={20} />
                      </div>

                      <div className="account-request__body">
                        <strong>
                          {repair.model || repair.deviceType}
                        </strong>

                        <p>{repair.issue}</p>

                        <div className="account-request__meta">
                          <span>
                            Status:{" "}
                            <strong>
                              {formatStatus(repair.status)}
                            </strong>
                          </span>

                          <span>
                            Submitted{" "}
                            {formatDate(repair.createdAt)}
                          </span>
                        </div>
                      </div>

                      <Link
                        href="/track-repair"
                        className="account-request__arrow"
                      >
                        <ChevronRight size={19} />
                      </Link>
                    </div>
                  </section>
                )}

                {businessRequest && (
                  <section className="account-panel">
                    <div className="account-panel__header">
                      <div>
                        <span>BUSINESS REQUEST</span>
                        <h3>{businessRequest.requestNumber}</h3>
                      </div>

                      <Link href="/business">
                        New request
                        <ArrowRight size={15} />
                      </Link>
                    </div>

                    <div className="account-request">
                      <div className="account-request__icon">
                        <Building2 size={20} />
                      </div>

                      <div className="account-request__body">
                        <strong>
                          {businessRequest.organization}
                        </strong>

                        <p>
                          {businessRequest.requirement}
                        </p>

                        <div className="account-request__meta">
                          <span>
                            Status:{" "}
                            <strong>
                              {formatStatus(
                                businessRequest.status
                              )}
                            </strong>
                          </span>

                          <span>
                            Submitted{" "}
                            {formatDate(
                              businessRequest.createdAt
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </div>

              <aside className="account-sidebar">
                <div className="account-profile">
                  <div className="account-profile__avatar">
                    <UserRound size={23} />
                  </div>

                  <div>
                    <span>ACCOUNT</span>
                    <h3>Customer</h3>
                    <p>Your Sanfaani account</p>
                  </div>
                </div>

                <nav className="account-nav">
                  <Link
                    href="/account"
                    className="account-nav__item account-nav__item--active"
                  >
                    <UserRound size={18} />
                    Account overview
                  </Link>

                  <Link
                    href="/account/orders"
                    className="account-nav__item"
                  >
                    <Package size={18} />
                    Orders
                  </Link>

                  <Link
                    href="/repair"
                    className="account-nav__item"
                  >
                    <Wrench size={18} />
                    Repairs
                  </Link>

                  <Link
                    href="/business"
                    className="account-nav__item"
                  >
                    <Building2 size={18} />
                    Business procurement
                  </Link>

                  <Link
                    href="/track-order"
                    className="account-nav__item"
                  >
                    <ClipboardList size={18} />
                    Track an order
                  </Link>
                </nav>

                <div className="account-security">
                  <ShieldCheck size={20} />

                  <div>
                    <strong>Trust & transparency</strong>
                    <p>
                      Your order and repair journeys are designed
                      around clear status updates and confirmation
                      points.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function formatCurrency(amount: number) {
  return `${new Intl.NumberFormat("en-US").format(amount)} FCFA`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatStatus(status: string) {
  return status
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}