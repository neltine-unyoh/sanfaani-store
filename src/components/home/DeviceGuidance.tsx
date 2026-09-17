import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Palette,
  Gamepad2,
} from "lucide-react";
import "./DeviceGuidance.css";

const useCases = [
  {
    icon: GraduationCap,
    title: "Study",
    description: "School, research & everyday learning",
  },
  {
    icon: BriefcaseBusiness,
    title: "Work",
    description: "Remote work, business & productivity",
  },
  {
    icon: Palette,
    title: "Create",
    description: "Design, content & creative work",
  },
  {
    icon: Gamepad2,
    title: "Play",
    description: "Gaming, entertainment & more",
  },
];

export default function DeviceGuidance() {
  return (
    <section className="device-guidance">
      <div className="container">
        <div className="device-guidance__panel">
          <div className="device-guidance__content">
            <p className="device-guidance__eyebrow">
              DEVICE GUIDANCE
            </p>

            <h2 className="device-guidance__title">
              Not sure what
              <br />
              you actually need?
            </h2>

            <p className="device-guidance__description">
              Tell us what you&apos;re trying to accomplish, your budget,
              and how you&apos;ll use your device. We&apos;ll help you
              narrow down the right technology.
            </p>

            <Link
              href="/guidance"
              className="device-guidance__button"
            >
              Find my device
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="device-guidance__options">
            <p className="device-guidance__options-label">
              WHAT ARE YOU SHOPPING FOR?
            </p>

            <div className="device-guidance__grid">
              {useCases.map((useCase) => {
                const Icon = useCase.icon;

                return (
                  <div
                    key={useCase.title}
                    className="guidance-option"
                  >
                    <div className="guidance-option__icon">
                      <Icon size={21} strokeWidth={1.7} />
                    </div>

                    <div>
                      <h3>{useCase.title}</h3>
                      <p>{useCase.description}</p>
                    </div>

                    <ArrowRight
                      className="guidance-option__arrow"
                      size={17}
                    />
                  </div>
                );
              })}
            </div>

            <div className="device-guidance__note">
              <span />
              <p>
                Recommendations are based on your needs — not just the
                most expensive device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}