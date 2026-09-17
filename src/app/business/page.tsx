"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Headphones,
  Laptop,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./business.css";

const procurementNeeds = [
  {
    icon: Laptop,
    title: "Devices & equipment",
    description:
      "Source laptops, phones, tablets, accessories, and technology equipment for your organization.",
  },
  {
    icon: Wrench,
    title: "Repairs & maintenance",
    description:
      "Keep your organization's devices operational with structured repair and maintenance support.",
  },
  {
    icon: ClipboardList,
    title: "Bulk procurement",
    description:
      "Tell us what you need, how many you need, and when you need it. We'll work from your requirements.",
  },
  {
    icon: Headphones,
    title: "Ongoing support",
    description:
      "Get support beyond the initial purchase through maintenance, repairs, and after-sales assistance.",
  },
];

const process = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "Share your organization, requirements, quantities, budget, and timeline.",
  },
  {
    number: "02",
    title: "We prepare your quote",
    description:
      "Our team reviews the request and prepares a procurement proposal around your requirements.",
  },
  {
    number: "03",
    title: "Review & approve",
    description:
      "Review the items, quantities, pricing, and fulfillment details before proceeding.",
  },
  {
    number: "04",
    title: "Fulfillment & support",
    description:
      "We coordinate delivery or pickup and provide support after fulfillment.",
  },
];

const initialForm = {
  organization: "",
  contactName: "",
  email: "",
  phone: "",
  requirement: "",
  quantity: "",
  budget: "",
  timeline: "",
  notes: "",
};

export default function BusinessPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [requestNumber, setRequestNumber] = useState("");

  const updateField = (
    field: keyof typeof initialForm,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const number = `B2B-${Date.now().toString().slice(-6)}`;

    const request = {
      ...form,
      requestNumber: number,
      status: "submitted",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "sanfaani_current_business_request",
      JSON.stringify(request)
    );

    setRequestNumber(number);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <main>
        <section className="business-hero">
          <div className="container business-hero__grid">
            <div className="business-hero__content">
              <div className="business-hero__eyebrow">
                <Building2 size={15} />
                BUSINESS & PROCUREMENT
              </div>

              <h1>
                Technology procurement,
                <span> without the complexity.</span>
              </h1>

              <p>
                Equip your school, business, team, or organization with
                technology sourced around your actual requirements — with
                clear pricing, structured procurement, and support beyond
                the sale.
              </p>

              <div className="business-hero__actions">
                <a href="#request-quote" className="button button--primary">
                  Request a quote
                  <ArrowRight size={18} />
                </a>

                <Link href="/repair" className="button button--secondary">
                  Explore repairs
                </Link>
              </div>

              <div className="business-hero__proof">
                <div>
                  <ShieldCheck size={17} />
                  <span>Clear requirements</span>
                </div>

                <div>
                  <CheckCircle2 size={17} />
                  <span>Structured quotes</span>
                </div>

                <div>
                  <Headphones size={17} />
                  <span>After-sales support</span>
                </div>
              </div>
            </div>

            <div className="business-hero__visual">
              <div className="procurement-card">
                <div className="procurement-card__top">
                  <span>PROCUREMENT REQUEST</span>
                  <span className="procurement-card__status">
                    <span />
                    REVIEW
                  </span>
                </div>

                <div className="procurement-card__title">
                  Technology equipment
                </div>

                <div className="procurement-card__rows">
                  <div>
                    <span>Organization</span>
                    <strong>Your organization</strong>
                  </div>

                  <div>
                    <span>Requirement</span>
                    <strong>Laptops & accessories</strong>
                  </div>

                  <div>
                    <span>Quantity</span>
                    <strong>20 units</strong>
                  </div>

                  <div>
                    <span>Timeline</span>
                    <strong>Within 30 days</strong>
                  </div>
                </div>

                <div className="procurement-card__footer">
                  <span>Quote prepared around your requirements</span>
                  <ShieldCheck size={19} />
                </div>
              </div>

              <div className="business-hero__floating">
                <CheckCircle2 size={18} />
                <div>
                  <strong>Clear procurement</strong>
                  <span>From request to fulfillment</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="business-needs section">
          <div className="container">
            <div className="section__header business-needs__header">
              <div>
                <div className="section__eyebrow">WHAT WE SUPPORT</div>

                <h2 className="section__title">
                  More than buying devices.
                </h2>
              </div>

              <p className="section__description">
                Sanfaani brings procurement, repairs, maintenance, and
                after-sales support into one technology experience.
              </p>
            </div>

            <div className="business-needs__grid">
              {procurementNeeds.map((item) => {
                const Icon = item.icon;

                return (
                  <article className="business-need-card" key={item.title}>
                    <div className="business-need-card__icon">
                      <Icon size={22} />
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.description}</p>

                    <ArrowRight
                      className="business-need-card__arrow"
                      size={18}
                    />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="business-process section">
          <div className="container">
            <div className="business-process__intro">
              <div>
                <div className="section__eyebrow">HOW IT WORKS</div>

                <h2 className="section__title">
                  A procurement process built around your needs.
                </h2>
              </div>

              <p className="section__description">
                No need to figure out the entire procurement process alone.
                Start with your requirements and let the team work from
                there.
              </p>
            </div>

            <div className="business-process__steps">
              {process.map((item, index) => (
                <div className="business-step" key={item.number}>
                  <div className="business-step__number">
                    {item.number}
                  </div>

                  <div className="business-step__content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  {index < process.length - 1 && (
                    <ArrowRight
                      className="business-step__arrow"
                      size={20}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="business-quote" id="request-quote">
          <div className="container business-quote__grid">
            <div className="business-quote__intro">
              <div className="business-quote__eyebrow">
                REQUEST A PROCUREMENT QUOTE
              </div>

              <h2>
                Tell us what your organization needs.
              </h2>

              <p>
                Give us enough context to understand the requirement. Our
                team can then review the request and prepare the next step.
              </p>

              <div className="business-quote__trust">
                <div>
                  <ShieldCheck size={20} />
                  <span>Your request is handled securely.</span>
                </div>

                <div>
                  <ClipboardList size={20} />
                  <span>Requirements are reviewed before quoting.</span>
                </div>

                <div>
                  <Wrench size={20} />
                  <span>Support can continue after fulfillment.</span>
                </div>
              </div>
            </div>

            <div className="business-form-card">
              {submitted ? (
                <div className="business-success">
                  <div className="business-success__icon">
                    <CheckCircle2 size={30} />
                  </div>

                  <div className="business-success__eyebrow">
                    REQUEST SUBMITTED
                  </div>

                  <h3>Your procurement request is in.</h3>

                  <p>
                    We&apos;ve recorded your request. Keep your request
                    number for reference.
                  </p>

                  <div className="business-success__number">
                    <span>REQUEST NUMBER</span>
                    <strong>{requestNumber}</strong>
                  </div>

                  <div className="business-success__actions">
                    <button
                      type="button"
                      className="button button--primary"
                      onClick={() => {
                        setSubmitted(false);
                        setForm(initialForm);
                      }}
                    >
                      Submit another request
                    </button>

                    <Link
                      href="/"
                      className="business-success__link"
                    >
                      Return home
                    </Link>
                  </div>
                </div>
              ) : (
                <form
                  className="business-form"
                  onSubmit={handleSubmit}
                >
                  <div className="business-form__header">
                    <span>PROCUREMENT REQUEST</span>
                    <h3>Request a quote</h3>
                    <p>
                      Start with the details you already know. You can
                      provide additional context in the notes.
                    </p>
                  </div>

                  <div className="business-form__section">
                    <div className="business-form__section-title">
                      Organization
                    </div>

                    <div className="business-form__grid">
                      <label className="business-field">
                        <span>Organization name *</span>
                        <input
                          required
                          value={form.organization}
                          onChange={(event) =>
                            updateField(
                              "organization",
                              event.target.value
                            )
                          }
                          placeholder="e.g. ABC School"
                        />
                      </label>

                      <label className="business-field">
                        <span>Contact person *</span>
                        <input
                          required
                          value={form.contactName}
                          onChange={(event) =>
                            updateField(
                              "contactName",
                              event.target.value
                            )
                          }
                          placeholder="Full name"
                        />
                      </label>

                      <label className="business-field">
                        <span>Email address *</span>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(event) =>
                            updateField("email", event.target.value)
                          }
                          placeholder="name@organization.com"
                        />
                      </label>

                      <label className="business-field">
                        <span>Phone number *</span>
                        <input
                          required
                          type="tel"
                          value={form.phone}
                          onChange={(event) =>
                            updateField("phone", event.target.value)
                          }
                          placeholder="+237 ..."
                        />
                      </label>
                    </div>
                  </div>

                  <div className="business-form__section">
                    <div className="business-form__section-title">
                      Requirement
                    </div>

                    <div className="business-form__grid">
                      <label className="business-field business-field--full">
                        <span>What do you need? *</span>
                        <textarea
                          required
                          value={form.requirement}
                          onChange={(event) =>
                            updateField(
                              "requirement",
                              event.target.value
                            )
                          }
                          placeholder="Tell us about the devices, equipment, repairs, or support you need."
                          rows={4}
                        />
                      </label>

                      <label className="business-field">
                        <span>Estimated quantity</span>
                        <input
                          value={form.quantity}
                          onChange={(event) =>
                            updateField(
                              "quantity",
                              event.target.value
                            )
                          }
                          placeholder="e.g. 20 laptops"
                        />
                      </label>

                      <label className="business-field">
                        <span>Budget range</span>
                        <select
                          value={form.budget}
                          onChange={(event) =>
                            updateField("budget", event.target.value)
                          }
                        >
                          <option value="">Select a range</option>
                          <option value="Under 500,000 FCFA">
                            Under 500,000 FCFA
                          </option>
                          <option value="500,000 - 2,000,000 FCFA">
                            500,000 - 2,000,000 FCFA
                          </option>
                          <option value="2,000,000 - 5,000,000 FCFA">
                            2,000,000 - 5,000,000 FCFA
                          </option>
                          <option value="5,000,000+ FCFA">
                            5,000,000+ FCFA
                          </option>
                          <option value="Not decided yet">
                            Not decided yet
                          </option>
                        </select>
                      </label>

                      <label className="business-field">
                        <span>Required timeline</span>
                        <select
                          value={form.timeline}
                          onChange={(event) =>
                            updateField(
                              "timeline",
                              event.target.value
                            )
                          }
                        >
                          <option value="">Select timeline</option>
                          <option value="As soon as possible">
                            As soon as possible
                          </option>
                          <option value="Within 2 weeks">
                            Within 2 weeks
                          </option>
                          <option value="Within 30 days">
                            Within 30 days
                          </option>
                          <option value="Within 60 days">
                            Within 60 days
                          </option>
                          <option value="Flexible">
                            Flexible
                          </option>
                        </select>
                      </label>

                      <label className="business-field business-field--full">
                        <span>Additional notes</span>
                        <textarea
                          value={form.notes}
                          onChange={(event) =>
                            updateField("notes", event.target.value)
                          }
                          placeholder="Anything else we should know?"
                          rows={3}
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="button button--primary business-form__submit"
                  >
                    Submit procurement request
                    <ArrowRight size={18} />
                  </button>

                  <p className="business-form__note">
                    Submitting this form creates a procurement request.
                    Pricing and fulfillment are confirmed separately.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}