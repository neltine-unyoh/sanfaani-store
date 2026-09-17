"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  ShoppingBag,
  UserRound,
  Menu,
  X,
} from "lucide-react";
import { useCart } from "@/components/commerce/CartProvider";
import "./Navbar.css";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { itemCount } = useCart();

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        {/* LOGO */}
        <Link href="/" className="navbar__logo">
          <img
            src="/brand/sanfaani.webp"
            alt="Sanfaani"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="navbar__desktop">
          <Link href="/shop" className="navbar__link">
            Shop
          </Link>

          <Link href="/guidance" className="navbar__link">
            Find Your Device
          </Link>

          <Link href="/repair" className="navbar__link">
            Repair
          </Link>

          <Link href="/business" className="navbar__link">
            Business
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="navbar__actions">
          {/* SEARCH */}
          <button
            type="button"
            className="navbar__icon-button"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* ACCOUNT */}
          <Link
            href="/account"
            className="navbar__icon-button"
            aria-label="My account"
          >
            <UserRound size={20} />
          </Link>

          {/* CART */}
          <Link
            href="/cart"
            className="navbar__icon-button navbar__cart"
            aria-label="Shopping cart"
          >
            <ShoppingBag size={20} />

            {itemCount > 0 && (
              <span className="navbar__cart-count">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>

          {/* MOBILE MENU */}
          <button
            type="button"
            className="navbar__mobile-toggle"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label={
              mobileOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {mobileOpen && (
        <div className="navbar__mobile">
          <nav className="navbar__mobile-nav">
            <Link
              href="/shop"
              onClick={() => setMobileOpen(false)}
            >
              Shop
            </Link>

            <Link
              href="/guidance"
              onClick={() => setMobileOpen(false)}
            >
              Find Your Device
            </Link>

            <Link
              href="/repair"
              onClick={() => setMobileOpen(false)}
            >
              Repair
            </Link>

            <Link
              href="/business"
              onClick={() => setMobileOpen(false)}
            >
              Business
            </Link>

            <div className="navbar__mobile-divider" />

            <Link
              href="/account"
              onClick={() => setMobileOpen(false)}
            >
              <UserRound size={18} />
              My Account
            </Link>

            <Link
              href="/account/orders"
              onClick={() => setMobileOpen(false)}
            >
              <ShoppingBag size={18} />
              My Orders
            </Link>

            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
            >
              <ShoppingBag size={18} />
              Cart

              {itemCount > 0 && (
                <span className="navbar__mobile-count">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}