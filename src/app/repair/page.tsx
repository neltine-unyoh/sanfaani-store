"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  Laptop,
  Smartphone,
  Tablet,
  Wrench,
  ShieldCheck,
  Camera,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import "./repair.css";

type RepairData = {
  deviceType: string;
  issue: string;
  deviceName: string;
  serialNumber: string;
  description: string;
  accessories: string;
  preferredDate: string;
  preferredTime: string;
  customerName: string;
  phone: string;
  email: string;
};

const initialData: RepairData = {
  deviceType: "",
  issue: "",
  deviceName: "",
  serialNumber: "",
  description: "",
  accessories: "",
  preferredDate: "",
  preferredTime: "",
  customerName: "",
  phone: "",
  email: "",
};

const deviceTypes = [
  {
    id: "laptop",
    title: "Laptop",
    description: "Windows, Mac or other laptops",
    icon: Laptop,
  },
  {
    id: "phone",
    title: "Phone",
    description: "Smartphones and mobile devices",
    icon: Smartphone,
  },
  {
    id: "tablet",
    title: "Tablet",
    description: "iPad, Android and other tablets",
    icon: Tablet,
  },
];

const issues = [
  "Screen or display",
  "Battery or charging",
  "Software or operating system",
  "Keyboard or buttons",
  "Performance or overheating",
  "Network or connectivity",
  "Physical damage",
  "Other",
];

const timeOptions = [
  "Morning · 9:00 AM – 12:00 PM",
  "Afternoon · 12:00 PM – 3:00 PM",
  "Late afternoon · 3:00 PM – 6:00 PM",
];

export default function RepairPage() {
  const [step, setStep] = useState(0);
  const [data, setData] =
    useState<RepairData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [repairNumber, setRepairNumber] =
    useState("");

  const updateField = (
    field: keyof RepairData,
    value: string
  ) => {
    setData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const canContinue = () => {
    if (step === 0) {
      return Boolean(data.deviceType);
    }

    if (step === 1) {
      return (
        Boolean(data.issue) &&
        Boolean(data.deviceName)
      );
    }

    if (step === 2) {
      return (
        Boolean(data.customerName) &&
        Boolean(data.phone) &&
        Boolean(data.email)
      );
    }

    return true;
  };

  const nextStep = () => {
    if (!canContinue()) return;

    if (step < 3) {
      setStep((current) => current + 1);
    }
  };

  const previousStep = () => {
    if (step > 0) {
      setStep((current) => current - 1);
    }
  };

  const submitRequest = () => {
    if (!canContinue()) return;

    const generatedNumber = `REP-${Date.now()
      .toString()
      .slice(-6)}`;

    setRepairNumber(generatedNumber);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "sanfaani_current_repair",
        JSON.stringify({
          ...data,
          repairNumber: generatedNumber,
          status: "requested",
          createdAt: new Date().toISOString(),
        })
      );
    }

    setSubmitted(true);
  };

  const restart = () => {
    setData(initialData);
    setStep(0);
    setSubmitted(false);
    setRepairNumber("");
  };

  return (
    <>
      <Navbar />

      <main className="repair-page">

        {/* HERO */}
        <section className="repair-hero">
          <div className="container">
            <Link
              href="/"
              className="repair-back"
            >
              <ArrowLeft size={16} />
              Back home
            </Link>

            <div className="repair-hero__content">
              <div>
                <p className="section__eyebrow">
                  SANFAANI REPAIR
                </p>

                <h1>
                  When your device
                  <span> needs attention.</span>
                </h1>

                <p>
                  Tell us what&apos;s wrong. We&apos;ll
                  document your device, diagnose the issue,
                  share a quote for approval, and keep you
                  informed throughout the repair.
                </p>
              </div>

              <div className="repair-hero__proof">
                <div>
                  <ShieldCheck size={19} />
                  <span>Documented intake</span>
                </div>

                <div>
                  <ClipboardCheck size={19} />
                  <span>Quote approval</span>
                </div>

                <div>
                  <Check size={19} />
                  <span>Quality check</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {!submitted ? (
          <section className="repair-flow">
            <div className="container">

              {/* PROGRESS */}
              <div className="repair-progress">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className={
                      item - 1 <= step
                        ? "repair-progress__item repair-progress__item--active"
                        : "repair-progress__item"
                    }
                  >
                    <span>{item}</span>

                    <div>
                      <small>
                        {item === 1 && "Device"}
                        {item === 2 && "Issue"}
                        {item === 3 && "Details"}
                        {item === 4 && "Review"}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="repair-layout">

                {/* MAIN FORM */}
                <div className="repair-card">

                  {/* STEP 1 */}
                  {step === 0 && (
                    <>
                      <div className="repair-card__heading">
                        <p className="section__eyebrow">
                          STEP 01
                        </p>

                        <h2>
                          What device needs repair?
                        </h2>

                        <p>
                          Start with the device type so we
                          can structure the repair request
                          correctly.
                        </p>
                      </div>

                      <div className="repair-device-options">
                        {deviceTypes.map((device) => {
                          const Icon = device.icon;

                          const selected =
                            data.deviceType ===
                            device.id;

                          return (
                            <button
                              key={device.id}
                              type="button"
                              className={
                                selected
                                  ? "repair-device-option repair-device-option--selected"
                                  : "repair-device-option"
                              }
                              onClick={() =>
                                updateField(
                                  "deviceType",
                                  device.id
                                )
                              }
                            >
                              <div className="repair-device-option__icon">
                                <Icon size={25} />
                              </div>

                              <div>
                                <strong>
                                  {device.title}
                                </strong>

                                <p>
                                  {device.description}
                                </p>
                              </div>

                              <div className="repair-option-check">
                                {selected && (
                                  <Check size={13} />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* STEP 2 */}
                  {step === 1 && (
                    <>
                      <div className="repair-card__heading">
                        <p className="section__eyebrow">
                          STEP 02
                        </p>

                        <h2>
                          Tell us what&apos;s happening.
                        </h2>

                        <p>
                          Give us enough information to
                          understand the issue before
                          intake.
                        </p>
                      </div>

                      <div className="repair-form">

                        <div className="repair-field">
                          <label htmlFor="deviceName">
                            Device name / model
                          </label>

                          <input
                            id="deviceName"
                            type="text"
                            placeholder="e.g. HP EliteBook 840 G8"
                            value={data.deviceName}
                            onChange={(event) =>
                              updateField(
                                "deviceName",
                                event.target.value
                              )
                            }
                          />
                        </div>

                        <div className="repair-field">
                          <label htmlFor="issue">
                            Main issue
                          </label>

                          <div className="repair-select">
                            <select
                              id="issue"
                              value={data.issue}
                              onChange={(event) =>
                                updateField(
                                  "issue",
                                  event.target.value
                                )
                              }
                            >
                              <option value="">
                                Select the main issue
                              </option>

                              {issues.map((issue) => (
                                <option
                                  key={issue}
                                  value={issue}
                                >
                                  {issue}
                                </option>
                              ))}
                            </select>

                            <ChevronDown size={16} />
                          </div>
                        </div>

                        <div className="repair-field">
                          <label htmlFor="serialNumber">
                            Serial number
                            <span>
                              Optional
                            </span>
                          </label>

                          <input
                            id="serialNumber"
                            type="text"
                            placeholder="If available"
                            value={
                              data.serialNumber
                            }
                            onChange={(event) =>
                              updateField(
                                "serialNumber",
                                event.target.value
                              )
                            }
                          />
                        </div>

                        <div className="repair-field">
                          <label htmlFor="description">
                            Describe the issue
                          </label>

                          <textarea
                            id="description"
                            rows={5}
                            placeholder="Tell us what happened, when it started, and anything you've already tried."
                            value={
                              data.description
                            }
                            onChange={(event) =>
                              updateField(
                                "description",
                                event.target.value
                              )
                            }
                          />
                        </div>

                        <div className="repair-field">
                          <label htmlFor="accessories">
                            Accessories you're bringing
                            <span>
                              Optional
                            </span>
                          </label>

                          <input
                            id="accessories"
                            type="text"
                            placeholder="e.g. Charger, mouse, case"
                            value={
                              data.accessories
                            }
                            onChange={(event) =>
                              updateField(
                                "accessories",
                                event.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* STEP 3 */}
                  {step === 2 && (
                    <>
                      <div className="repair-card__heading">
                        <p className="section__eyebrow">
                          STEP 03
                        </p>

                        <h2>
                          How can we reach you?
                        </h2>

                        <p>
                          We&apos;ll use these details for
                          repair updates and your quote.
                        </p>
                      </div>

                      <div className="repair-form">

                        <div className="repair-form-grid">
                          <div className="repair-field">
                            <label htmlFor="customerName">
                              Full name
                            </label>

                            <input
                              id="customerName"
                              type="text"
                              placeholder="Your full name"
                              value={
                                data.customerName
                              }
                              onChange={(event) =>
                                updateField(
                                  "customerName",
                                  event.target.value
                                )
                              }
                            />
                          </div>

                          <div className="repair-field">
                            <label htmlFor="phone">
                              Phone number
                            </label>

                            <input
                              id="phone"
                              type="tel"
                              placeholder="+237 ..."
                              value={data.phone}
                              onChange={(event) =>
                                updateField(
                                  "phone",
                                  event.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="repair-field">
                          <label htmlFor="email">
                            Email address
                          </label>

                          <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={data.email}
                            onChange={(event) =>
                              updateField(
                                "email",
                                event.target.value
                              )
                            }
                          />
                        </div>

                        <div className="repair-form-grid">
                          <div className="repair-field">
                            <label htmlFor="preferredDate">
                              Preferred date
                            </label>

                            <input
                              id="preferredDate"
                              type="date"
                              value={
                                data.preferredDate
                              }
                              onChange={(event) =>
                                updateField(
                                  "preferredDate",
                                  event.target.value
                                )
                              }
                            />
                          </div>

                          <div className="repair-field">
                            <label htmlFor="preferredTime">
                              Preferred time
                            </label>

                            <div className="repair-select">
                              <select
                                id="preferredTime"
                                value={
                                  data.preferredTime
                                }
                                onChange={(event) =>
                                  updateField(
                                    "preferredTime",
                                    event.target.value
                                  )
                                }
                              >
                                <option value="">
                                  Select a time
                                </option>

                                {timeOptions.map(
                                  (time) => (
                                    <option
                                      key={time}
                                      value={time}
                                    >
                                      {time}
                                    </option>
                                  )
                                )}
                              </select>

                              <ChevronDown
                                size={16}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* STEP 4 */}
                  {step === 3 && (
                    <>
                      <div className="repair-card__heading">
                        <p className="section__eyebrow">
                          STEP 04
                        </p>

                        <h2>
                          Review your repair request.
                        </h2>

                        <p>
                          Check the information below before
                          sending your request.
                        </p>
                      </div>

                      <div className="repair-review">

                        <div className="repair-review__section">
                          <div>
                            <span>
                              Device
                            </span>

                            <strong>
                              {
                                deviceTypes.find(
                                  (device) =>
                                    device.id ===
                                    data.deviceType
                                )?.title
                              }
                            </strong>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setStep(0)
                            }
                          >
                            Edit
                          </button>
                        </div>

                        <div className="repair-review__section">
                          <div>
                            <span>
                              Device / model
                            </span>

                            <strong>
                              {data.deviceName}
                            </strong>

                            {data.serialNumber && (
                              <small>
                                Serial:{" "}
                                {
                                  data.serialNumber
                                }
                              </small>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setStep(1)
                            }
                          >
                            Edit
                          </button>
                        </div>

                        <div className="repair-review__section">
                          <div>
                            <span>
                              Issue
                            </span>

                            <strong>
                              {data.issue}
                            </strong>

                            {data.description && (
                              <small>
                                {data.description}
                              </small>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setStep(1)
                            }
                          >
                            Edit
                          </button>
                        </div>

                        <div className="repair-review__section">
                          <div>
                            <span>
                              Contact
                            </span>

                            <strong>
                              {data.customerName}
                            </strong>

                            <small>
                              {data.phone}
                              <br />
                              {data.email}
                            </small>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setStep(2)
                            }
                          >
                            Edit
                          </button>
                        </div>

                        {(data.preferredDate ||
                          data.preferredTime) && (
                          <div className="repair-review__section">
                            <div>
                              <span>
                                Preferred intake
                              </span>

                              <strong>
                                {data.preferredDate ||
                                  "Date not specified"}
                              </strong>

                              {data.preferredTime && (
                                <small>
                                  {
                                    data.preferredTime
                                  }
                                </small>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                setStep(2)
                              }
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="repair-consent">
                        <Check size={16} />

                        <p>
                          By submitting this request, you
                          understand that diagnosis and
                          repair pricing are confirmed
                          after intake. No repair work should
                          begin without your approval of the
                          applicable quote.
                        </p>
                      </div>
                    </>
                  )}

                  {/* ACTIONS */}
                  <div className="repair-actions">
                    <button
                      type="button"
                      className="repair-secondary-button"
                      onClick={previousStep}
                      disabled={step === 0}
                    >
                      <ArrowLeft size={16} />
                      Previous
                    </button>

                    {step < 3 ? (
                      <button
                        type="button"
                        className="repair-primary-button"
                        onClick={nextStep}
                        disabled={!canContinue()}
                      >
                        Continue
                        <ArrowRight size={17} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="repair-primary-button"
                        onClick={submitRequest}
                      >
                        Submit repair request
                        <ArrowRight size={17} />
                      </button>
                    )}
                  </div>
                </div>

                {/* SIDEBAR */}
                <aside className="repair-sidebar">

                  <div className="repair-sidebar__card">
                    <div className="repair-sidebar__icon">
                      <Wrench size={20} />
                    </div>

                    <p className="repair-sidebar__eyebrow">
                      HOW IT WORKS
                    </p>

                    <h3>
                      A repair process you can follow.
                    </h3>

                    <div className="repair-sidebar__steps">
                      <div>
                        <span>01</span>
                        <p>
                          Request & intake
                        </p>
                      </div>

                      <div>
                        <span>02</span>
                        <p>
                          Diagnosis
                        </p>
                      </div>

                      <div>
                        <span>03</span>
                        <p>
                          Quote approval
                        </p>
                      </div>

                      <div>
                        <span>04</span>
                        <p>
                          Repair & QC
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="repair-sidebar__card repair-sidebar__card--dark">
                    <Camera size={20} />

                    <h3>
                      Bring the right information.
                    </h3>

                    <p>
                      If possible, have your charger,
                      accessories and device serial number
                      available during intake.
                    </p>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        ) : (
          /* SUCCESS */
          <section className="repair-success">
            <div className="container">
              <div className="repair-success__card">

                <div className="repair-success__icon">
                  <Check size={27} />
                </div>

                <p className="section__eyebrow">
                  REQUEST RECEIVED
                </p>

                <h2>
                  Your repair request is in.
                </h2>

                <p className="repair-success__intro">
                  We&apos;ve recorded your request. Keep
                  your repair number below for future
                  tracking and support.
                </p>

                <div className="repair-success__number">
                  <span>
                    REPAIR NUMBER
                  </span>

                  <strong>
                    {repairNumber}
                  </strong>
                </div>

                <div className="repair-success__timeline">
                  <div className="repair-success__timeline-item repair-success__timeline-item--active">
                    <div>
                      <Check size={13} />
                    </div>

                    <span>
                      Request submitted
                    </span>
                  </div>

                  <div className="repair-success__line" />

                  <div className="repair-success__timeline-item">
                    <div>
                      2
                    </div>

                    <span>
                      Intake & diagnosis
                    </span>
                  </div>

                  <div className="repair-success__line" />

                  <div className="repair-success__timeline-item">
                    <div>
                      3
                    </div>

                    <span>
                      Quote approval
                    </span>
                  </div>
                </div>

                <div className="repair-success__actions">
                  <Link
                    href="/track-repair"
                    className="repair-primary-button"
                  >
                    Track repair
                    <ArrowRight size={17} />
                  </Link>

                  <Link
                    href="/"
                    className="repair-secondary-button"
                  >
                    Back to home
                  </Link>
                </div>

                <button
                  type="button"
                  className="repair-restart"
                  onClick={restart}
                >
                  Submit another repair request
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}