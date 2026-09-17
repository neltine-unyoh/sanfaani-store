import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  SearchCheck,
  Wrench,
  ShieldCheck,
} from "lucide-react";
import "./RepairSection.css";

const repairSteps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Tell us what’s wrong",
    description: "Submit your device and repair details.",
  },
  {
    number: "02",
    icon: SearchCheck,
    title: "We diagnose it",
    description: "Our team inspects the device and identifies the issue.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "You approve the repair",
    description: "Review the itemized quote before any work begins.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "We repair & verify",
    description: "Your device goes through repair and quality control.",
  },
];

export default function RepairSection() {
  return (
    <section className="repair-section">
      <div className="container">
        <div className="repair-section__header">
          <div>
            <p className="section__eyebrow">REPAIR & SUPPORT</p>

            <h2 className="section__title">
              Repairs without
              <br />
              the uncertainty.
            </h2>
          </div>

          <div className="repair-section__header-right">
            <p>
              From intake to handover, know what is happening with your
              device every step of the way.
            </p>

            <Link
              href="/repair"
              className="repair-section__link"
            >
              Request a repair
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <div className="repair-section__body">
          <div className="repair-section__visual">
            <div className="repair-section__visual-circle">
              <Wrench size={76} strokeWidth={1} />
            </div>

            <div className="repair-section__visual-label">
              <span className="repair-section__visual-dot" />
              <span>Structured repair process</span>
            </div>

            <div className="repair-section__visual-number">
              04
            </div>
          </div>

          <div className="repair-section__steps">
            {repairSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="repair-step"
                >
                  <div className="repair-step__number">
                    {step.number}
                  </div>

                  <div className="repair-step__icon">
                    <Icon size={20} strokeWidth={1.7} />
                  </div>

                  <div className="repair-step__content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>

                  <ArrowRight
                    className="repair-step__arrow"
                    size={18}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="repair-section__footer">
          <div>
            <span>DEVICE CUSTODY</span>
            <strong>Condition & accessories recorded at intake</strong>
          </div>

          <div>
            <span>QUOTE APPROVAL</span>
            <strong>You approve the exact repair before work begins</strong>
          </div>

          <div>
            <span>QUALITY CONTROL</span>
            <strong>Repair completion includes a QC checkpoint</strong>
          </div>
        </div>
      </div>
    </section>
  );
}