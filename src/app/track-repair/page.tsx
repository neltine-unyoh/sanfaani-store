"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  FileText,
  PackageCheck,
  Search,
  ShieldCheck,
  Smartphone,
  Wrench,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import "./track-repair.css";

type RepairRecord = {
  repairNumber: string;
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
  status: string;
  createdAt: string;
};

type RepairStage = {
  id: string;
  label: string;
  description: string;
  icon: typeof Wrench;
};

const stages: RepairStage[] = [
  {
    id: "requested",
    label: "Request submitted",
    description:
      "Your repair request has been received.",
    icon: ClipboardCheck,
  },
  {
    id: "intake",
    label: "Intake & diagnosis",
    description:
      "Your device is checked and the issue is assessed.",
    icon: Search,
  },
  {
    id: "quote",
    label: "Quote & approval",
    description:
      "A repair quote is prepared for your approval.",
    icon: FileText,
  },
  {
    id: "repair",
    label: "Repair & quality check",
    description:
      "Approved work is completed and tested.",
    icon: Wrench,
  },
  {
    id: "ready",
    label: "Ready for handover",
    description:
      "Your device is ready to be collected or returned.",
    icon: PackageCheck,
  },
];

function getStageIndex(status: string) {
  switch (status) {
    case "requested":
      return 0;
    case "intake_scheduled":
    case "received":
    case "diagnosing":
      return 1;
    case "quote_sent":
    case "awaiting_approval":
    case "approved":
      return 2;
    case "awaiting_parts":
    case "in_repair":
    case "paused":
    case "qc":
      return 3;
    case "ready":
    case "handed_over":
      return 4;
    default:
      return 0;
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "requested":
      return "Request received";
    case "intake_scheduled":
      return "Intake scheduled";
    case "received":
      return "Device received";
    case "diagnosing":
      return "Diagnosing";
    case "quote_sent":
      return "Quote sent";
    case "awaiting_approval":
      return "Awaiting approval";
    case "approved":
      return "Repair approved";
    case "awaiting_parts":
      return "Awaiting parts";
    case "in_repair":
      return "In repair";
    case "paused":
      return "Repair paused";
    case "qc":
      return "Quality check";
    case "ready":
      return "Ready for handover";
    case "handed_over":
      return "Handed over";
    default:
      return "Request received";
  }
}

function formatDate(date: string) {
  if (!date) return "Not specified";

  return new Date(date).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

export default function TrackRepairPage() {
  const [repairNumber, setRepairNumber] =
    useState("");

  const [repair, setRepair] =
    useState<RepairRecord | null>(null);

  const [searched, setSearched] =
    useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(
      "sanfaani_current_repair"
    );

    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);

      if (parsed?.repairNumber) {
        setRepairNumber(parsed.repairNumber);
      }
    } catch {
      // Ignore malformed mock data.
    }
  }, []);

  const findRepair = () => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(
      "sanfaani_current_repair"
    );

    setSearched(true);

    if (!stored) {
      setRepair(null);
      return;
    }

    try {
      const parsed = JSON.parse(stored);

      if (
        parsed?.repairNumber?.toLowerCase() ===
        repairNumber.trim().toLowerCase()
      ) {
        setRepair(parsed);
      } else {
        setRepair(null);
      }
    } catch {
      setRepair(null);
    }
  };

  const useLatestRepair = () => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(
      "sanfaani_current_repair"
    );

    if (!stored) {
      setSearched(true);
      setRepair(null);
      return;
    }

    try {
      const parsed = JSON.parse(stored);

      setRepairNumber(parsed.repairNumber);
      setRepair(parsed);
      setSearched(true);
    } catch {
      setRepair(null);
      setSearched(true);
    }
  };

  const currentStage = repair
    ? getStageIndex(repair.status)
    : 0;

  return (
    <>
      <Navbar />

      <main className="track-repair-page">

        {/* HERO */}
        <section className="track-repair-hero">
          <div className="container">
            <Link
              href="/repair"
              className="track-repair-back"
            >
              <ArrowLeft size={16} />
              Repair
            </Link>

            <div className="track-repair-hero__content">
              <div>
                <p className="section__eyebrow">
                  REPAIR TRACKING
                </p>

                <h1>
                  Know where your
                  <span> repair stands.</span>
                </h1>

                <p>
                  Use your repair number to follow the
                  progress of your device from request
                  through diagnosis, approval, repair and
                  handover.
                </p>
              </div>

              <div className="track-repair-hero__icon">
                <Wrench size={30} />
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH */}
        <section className="track-repair-search">
          <div className="container">
            <div className="track-repair-search__card">

              <div className="track-repair-search__heading">
                <div className="track-repair-search__icon">
                  <Search size={19} />
                </div>

                <div>
                  <span>
                    FIND YOUR REPAIR
                  </span>

                  <h2>
                    Enter your repair number.
                  </h2>

                  <p>
                    Your repair number was provided when
                    your request was submitted.
                  </p>
                </div>
              </div>

              <div className="track-repair-search__form">
                <div className="track-repair-search__input">
                  <input
                    type="text"
                    placeholder="e.g. REP-123456"
                    value={repairNumber}
                    onChange={(event) =>
                      setRepairNumber(
                        event.target.value
                      )
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        findRepair();
                      }
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={findRepair}
                  disabled={!repairNumber.trim()}
                >
                  Track repair
                  <ArrowRight size={16} />
                </button>
              </div>

              <button
                type="button"
                className="track-repair-demo"
                onClick={useLatestRepair}
              >
                Use my latest mock repair
              </button>
            </div>
          </div>
        </section>

        {/* NOT FOUND */}
        {searched && !repair && (
          <section className="track-repair-result">
            <div className="container">
              <div className="track-repair-not-found">
                <div className="track-repair-not-found__icon">
                  <Search size={22} />
                </div>

                <p className="section__eyebrow">
                  REPAIR NOT FOUND
                </p>

                <h2>
                  We couldn&apos;t find that repair.
                </h2>

                <p>
                  Check the repair number and try again.
                  For this frontend prototype, only the
                  latest locally stored mock repair is
                  available.
                </p>

                <Link
                  href="/repair"
                  className="track-repair-primary"
                >
                  Submit a repair request
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* RESULT */}
        {repair && (
          <section className="track-repair-result">
            <div className="container">

              <div className="track-repair-result__header">
                <div>
                  <p className="section__eyebrow">
                    REPAIR REQUEST
                  </p>

                  <h2>
                    {repair.repairNumber}
                  </h2>

                  <p>
                    Submitted{" "}
                    {formatDate(repair.createdAt)}
                  </p>
                </div>

                <div className="track-repair-status">
                  <Clock3 size={16} />
                  {getStatusLabel(repair.status)}
                </div>
              </div>

              <div className="track-repair-layout">

                {/* TIMELINE */}
                <div className="track-repair-main">

                  <div className="track-repair-panel">
                    <div className="track-repair-panel__header">
                      <div>
                        <span>
                          REPAIR PROGRESS
                        </span>

                        <h3>
                          Your device journey
                        </h3>
                      </div>

                      <ShieldCheck size={19} />
                    </div>

                    <div className="track-repair-timeline">
                      {stages.map(
                        (stage, index) => {
                          const Icon = stage.icon;

                          const complete =
                            index < currentStage;

                          const active =
                            index === currentStage;

                          return (
                            <div
                              key={stage.id}
                              className={
                                active
                                  ? "repair-timeline-item repair-timeline-item--active"
                                  : complete
                                  ? "repair-timeline-item repair-timeline-item--complete"
                                  : "repair-timeline-item"
                              }
                            >
                              <div className="repair-timeline-marker">
                                {complete ? (
                                  <Check size={14} />
                                ) : (
                                  <Icon size={15} />
                                )}
                              </div>

                              {index <
                                stages.length - 1 && (
                                <div
                                  className={
                                    complete
                                      ? "repair-timeline-line repair-timeline-line--complete"
                                      : "repair-timeline-line"
                                  }
                                />
                              )}

                              <div className="repair-timeline-content">
                                <strong>
                                  {stage.label}
                                </strong>

                                <p>
                                  {stage.description}
                                </p>

                                {active && (
                                  <span>
                                    Current stage
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* DEVICE */}
                  <div className="track-repair-panel">
                    <div className="track-repair-panel__header">
                      <div>
                        <span>
                          DEVICE
                        </span>

                        <h3>
                          Repair details
                        </h3>
                      </div>

                      <Smartphone size={19} />
                    </div>

                    <div className="repair-details-grid">
                      <div>
                        <span>
                          Device
                        </span>

                        <strong>
                          {repair.deviceName}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Type
                        </span>

                        <strong>
                          {repair.deviceType}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Issue
                        </span>

                        <strong>
                          {repair.issue}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Serial number
                        </span>

                        <strong>
                          {repair.serialNumber ||
                            "Not provided"}
                        </strong>
                      </div>
                    </div>

                    {repair.description && (
                      <div className="repair-details-description">
                        <span>
                          Customer description
                        </span>

                        <p>
                          {repair.description}
                        </p>
                      </div>
                    )}
                  </div>

                </div>

                {/* SIDEBAR */}
                <aside className="track-repair-sidebar">

                  <div className="track-repair-sidebar__card">
                    <p>
                      CUSTOMER
                    </p>

                    <h3>
                      {repair.customerName}
                    </h3>

                    <span>
                      {repair.phone}
                    </span>

                    <span>
                      {repair.email}
                    </span>
                  </div>

                  <div className="track-repair-sidebar__card">
                    <p>
                      INTAKE
                    </p>

                    <div className="track-repair-sidebar__detail">
                      <span>
                        Preferred date
                      </span>

                      <strong>
                        {repair.preferredDate ||
                          "Not specified"}
                      </strong>
                    </div>

                    <div className="track-repair-sidebar__detail">
                      <span>
                        Preferred time
                      </span>

                      <strong>
                        {repair.preferredTime ||
                          "Not specified"}
                      </strong>
                    </div>

                    <div className="track-repair-sidebar__detail">
                      <span>
                        Accessories
                      </span>

                      <strong>
                        {repair.accessories ||
                          "None listed"}
                      </strong>
                    </div>
                  </div>

                  <div className="track-repair-sidebar__card track-repair-sidebar__card--dark">
                    <ShieldCheck size={20} />

                    <h3>
                      Your repair should stay transparent.
                    </h3>

                    <p>
                      Diagnosis comes before repair work,
                      and applicable repair work should be
                      approved before it begins.
                    </p>

                    <Link href="/repair">
                      Repair support
                      <ChevronRight size={15} />
                    </Link>
                  </div>

                </aside>
              </div>

              <div className="track-repair-bottom">
                <Link
                  href="/"
                  className="track-repair-secondary"
                >
                  Back to home
                </Link>

                <Link
                  href="/repair"
                  className="track-repair-primary"
                >
                  Request another repair
                  <ArrowRight size={16} />
                </Link>
              </div>

            </div>
          </section>
        )}

        {/* DEFAULT TRUST */}
        {!searched && !repair && (
          <section className="track-repair-info">
            <div className="container">
              <div className="track-repair-info__grid">
                <div>
                  <ClipboardCheck size={19} />
                  <strong>
                    Documented intake
                  </strong>
                  <p>
                    Device condition, serial details and
                    accessories can be recorded at intake.
                  </p>
                </div>

                <div>
                  <FileText size={19} />
                  <strong>
                    Quote before repair
                  </strong>
                  <p>
                    Applicable repair work and pricing should
                    be approved before work begins.
                  </p>
                </div>

                <div>
                  <ShieldCheck size={19} />
                  <strong>
                    Quality check
                  </strong>
                  <p>
                    Completed repairs move through a quality
                    check before handover.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}