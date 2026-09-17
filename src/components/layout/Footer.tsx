import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
} from "lucide-react";
import "./Footer.css";

const shopLinks = [
  { label: "Laptops", href: "/shop/laptops" },
  { label: "Phones", href: "/shop/phones" },
  { label: "Tablets", href: "/shop/tablets" },
  { label: "Accessories", href: "/shop/accessories" },
];

const supportLinks = [
  { label: "Find your device", href: "/guidance" },
  { label: "Request a repair", href: "/repair" },
  { label: "Track an order", href: "/account/orders" },
  { label: "Repair tracking", href: "/account/repairs" },
];

const companyLinks = [
  { label: "About Sanfaani", href: "/about" },
  { label: "Business", href: "/business" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" className="footer__logo">
              <span>Sanfaani</span>
              <small>Better Tech. Less Stress.</small>
            </Link>

            <p>
              Technology commerce and repair, designed to make choosing,
              buying, and maintaining your devices simpler.
            </p>

            <Link href="/shop" className="footer__cta">
              Start shopping
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h3>Shop</h3>

              {shopLinks.map((link) => (
                <Link href={link.href} key={link.label}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="footer__column">
              <h3>Support</h3>

              {supportLinks.map((link) => (
                <Link href={link.href} key={link.label}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="footer__column">
              <h3>Company</h3>

              {companyLinks.map((link) => (
                <Link href={link.href} key={link.label}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__newsletter">
          <div>
            <span>STAY IN THE LOOP</span>
            <h3>Useful tech. No unnecessary noise.</h3>
          </div>

          <form className="footer__form">
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Your email address"
            />

            <button type="submit">
              Subscribe
              <ArrowUpRight size={16} />
            </button>
          </form>
        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} Sanfaani. All rights reserved.
          </p>

          <div className="footer__legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/warranty">Warranty</Link>
          </div>

          <div className="footer__socials">
            <Link href="#" aria-label="Instagram">
              <span className="social-icon">IG</span>
            </Link>

            <Link href="#" aria-label="Facebook">
              <span className="social-icon">FB</span>
            </Link>

            <Link href="#" aria-label="LinkedIn">
              <span className="social-icon">in</span>
            </Link>

            <Link
              href="mailto:hello@sanfaani.com"
              aria-label="Email"
            >
              <Mail size={16} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}