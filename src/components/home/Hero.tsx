import Link from "next/link";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__container">
        <div className="hero__content">
          <div className="hero__eyebrow">
            <Sparkles size={14} />
            <span>TECHNOLOGY, SIMPLIFIED</span>
          </div>

          <h1 className="hero__title">
            Your next device,
            <span> without the guesswork.</span>
          </h1>

          <p className="hero__description">
            Find technology that fits your needs, your budget, and your life —
            with transparent pricing, verified condition, and support you can
            count on.
          </p>

          <div className="hero__actions">
            <Link href="/shop" className="hero__button hero__button--primary">
              Shop devices
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/guidance"
              className="hero__button hero__button--secondary"
            >
              Find your device
            </Link>
          </div>

          <div className="hero__trust">
            <div className="hero__trust-item">
              <div className="hero__trust-icon">
                <Check size={14} />
              </div>
              <span>Inspected devices</span>
            </div>

            <div className="hero__trust-item">
              <div className="hero__trust-icon">
                <Check size={14} />
              </div>
              <span>Transparent pricing</span>
            </div>

            <div className="hero__trust-item">
              <div className="hero__trust-icon">
                <Check size={14} />
              </div>
              <span>Warranty support</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__glow" />

          <div className="hero__device hero__device--back">
            <div className="device__camera" />
            <div className="device__screen">
              <div className="device__screen-line device__screen-line--large" />
              <div className="device__screen-line" />
              <div className="device__screen-line device__screen-line--short" />
            </div>
          </div>

          <div className="hero__device hero__device--front">
            <div className="device__camera" />
            <div className="device__screen">
              <div className="device__screen-content">
                <span className="device__screen-label">SANFAANI</span>
                <strong>Your tech.</strong>
                <strong>Made simple.</strong>
              </div>
            </div>
          </div>

          <div className="hero__floating-card hero__floating-card--condition">
            <ShieldCheck size={18} />
            <div>
              <strong>Verified</strong>
              <span>Device condition</span>
            </div>
          </div>

          <div className="hero__floating-card hero__floating-card--price">
            <span className="price__label">Starting from</span>
            <strong>₣ 85,000</strong>
            <span className="price__small">Flexible options available</span>
          </div>
        </div>
      </div>
    </section>
  );
}