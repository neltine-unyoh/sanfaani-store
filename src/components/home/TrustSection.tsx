import {
  BadgeCheck,
  Eye,
  Headphones,
  LockKeyhole,
} from "lucide-react";
import "./TrustSection.css";

const trustPoints = [
  {
    icon: Eye,
    title: "Know what you're buying",
    description:
      "Clear pricing, product condition, inspection details, and limitations before you commit.",
  },
  {
    icon: BadgeCheck,
    title: "Verified technology",
    description:
      "We make product condition and availability visible instead of leaving you to guess.",
  },
  {
    icon: LockKeyhole,
    title: "A safer transaction",
    description:
      "Structured checkout, payment verification, order records, and clear handover processes.",
  },
  {
    icon: Headphones,
    title: "Support beyond the sale",
    description:
      "Get repair, maintenance, and after-sales support when your technology needs attention.",
  },
];

export default function TrustSection() {
  return (
    <section className="trust-section">
      <div className="container">
        <div className="trust-section__intro">
          <div>
            <p className="section__eyebrow">THE SANFAANI WAY</p>

            <h2 className="section__title">
              Technology should feel
              <br />
              simple and trustworthy.
            </h2>
          </div>

          <p>
            We built Sanfaani around the things that matter when you spend
            money on technology: clarity, confidence, and support.
          </p>
        </div>

        <div className="trust-section__grid">
          {trustPoints.map((point) => {
            const Icon = point.icon;

            return (
              <div className="trust-card" key={point.title}>
                <div className="trust-card__icon">
                  <Icon size={21} strokeWidth={1.7} />
                </div>

                <h3>{point.title}</h3>

                <p>{point.description}</p>
              </div>
            );
          })}
        </div>

        <div className="trust-section__quote">
          <div className="trust-section__quote-mark">“</div>

          <div>
            <p>
              Better Tech. Less Stress.
            </p>

            <span>
              The Sanfaani way of helping you choose, buy, maintain,
              and support your technology.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}