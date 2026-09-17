"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Laptop,
  BriefcaseBusiness,
  GraduationCap,
  Gamepad2,
  Palette,
  Smartphone,
  Tablet,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import "./guidance.css";

type Question = {
  id: "use" | "device" | "budget";
  eyebrow: string;
  title: string;
  description: string;
};

const questions: Question[] = [
  {
    id: "use",
    eyebrow: "01 · YOUR NEED",
    title: "What will you mainly use your device for?",
    description:
      "Choose the option that best describes what you need your device to do.",
  },
  {
    id: "device",
    eyebrow: "02 · DEVICE TYPE",
    title: "What kind of device are you looking for?",
    description:
      "You can change this later. We’re using your answer to narrow the recommendations.",
  },
  {
    id: "budget",
    eyebrow: "03 · BUDGET",
    title: "What’s your budget?",
    description:
      "We’ll prioritize options that fit within the range you’re comfortable spending.",
  },
];

const useCases = [
  {
    id: "study",
    title: "Study",
    description:
      "Classes, research, assignments and everyday learning.",
    icon: GraduationCap,
  },
  {
    id: "work",
    title: "Work",
    description:
      "Office work, meetings, productivity and remote work.",
    icon: BriefcaseBusiness,
  },
  {
    id: "create",
    title: "Create",
    description:
      "Design, content creation, development and creative work.",
    icon: Palette,
  },
  {
    id: "play",
    title: "Play",
    description:
      "Gaming, entertainment and performance-heavy tasks.",
    icon: Gamepad2,
  },
];

const deviceTypes = [
  {
    id: "laptop",
    title: "Laptop",
    description:
      "Portable computing for work, study and creation.",
    icon: Laptop,
  },
  {
    id: "phone",
    title: "Phone",
    description:
      "Communication, content, apps and everyday life.",
    icon: Smartphone,
  },
  {
    id: "tablet",
    title: "Tablet",
    description:
      "A flexible screen for learning, work and entertainment.",
    icon: Tablet,
  },
];

const budgets = [
  {
    id: "under-100",
    title: "Under ₣100,000",
    description:
      "Keep the upfront cost as low as possible.",
  },
  {
    id: "100-200",
    title: "₣100,000 – ₣200,000",
    description:
      "A balanced range for everyday technology.",
  },
  {
    id: "200-350",
    title: "₣200,000 – ₣350,000",
    description:
      "More capability and performance.",
  },
  {
    id: "350-plus",
    title: "₣350,000+",
    description:
      "Premium and performance-focused options.",
  },
];

type Answers = {
  use: string;
  device: string;
  budget: string;
};

export default function GuidancePage() {
  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState<Answers>({
    use: "",
    device: "",
    budget: "",
  });

  const isResult = step >= questions.length;

  const currentQuestion = !isResult
    ? questions[step]
    : null;

  const currentAnswer =
    currentQuestion
      ? answers[currentQuestion.id]
      : "";

  const selectAnswer = (value: string) => {
    if (!currentQuestion) return;

    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: value,
    }));
  };

  const nextStep = () => {
    if (!currentQuestion || !currentAnswer) {
      return;
    }

    if (step < questions.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    setStep(questions.length);
  };

  const previousStep = () => {
    if (step > 0 && !isResult) {
      setStep((current) => current - 1);
    }
  };

  const restart = () => {
    setAnswers({
      use: "",
      device: "",
      budget: "",
    });

    setStep(0);
  };

  return (
    <>
      <Navbar />

      <main className="guidance-page">
        {/* HERO */}
        <section className="guidance-hero">
          <div className="container">
            <Link
              href="/"
              className="guidance-back"
            >
              <ArrowLeft size={16} />
              Back
            </Link>

            <div className="guidance-hero__content">
              <div>
                <p className="section__eyebrow">
                  FIND YOUR DEVICE
                </p>

                <h1>
                  Technology should fit
                  <span> your life.</span>
                </h1>

                <p>
                  Tell us what you need, what you want to
                  spend, and what kind of device you’re
                  looking for. We’ll help narrow it down.
                </p>
              </div>

              <div className="guidance-hero__visual">
                <Sparkles size={28} />
              </div>
            </div>
          </div>
        </section>

        {/* GUIDANCE FLOW */}
        <section className="guidance-flow">
          <div className="container">

            {!isResult && currentQuestion ? (
              <div className="guidance-card">

                {/* PROGRESS */}
                <div className="guidance-progress">
                  <div className="guidance-progress__top">
                    <span>
                      Step {step + 1} of{" "}
                      {questions.length}
                    </span>

                    <span>
                      {Math.round(
                        ((step + 1) /
                          questions.length) *
                          100
                      )}
                      %
                    </span>
                  </div>

                  <div className="guidance-progress__track">
                    <div
                      className="guidance-progress__bar"
                      style={{
                        width: `${
                          ((step + 1) /
                            questions.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* QUESTION */}
                <div className="guidance-question">
                  <p className="guidance-question__eyebrow">
                    {currentQuestion.eyebrow}
                  </p>

                  <h2>
                    {currentQuestion.title}
                  </h2>

                  <p className="guidance-question__description">
                    {currentQuestion.description}
                  </p>
                </div>

                {/* USE CASE OPTIONS */}
                {currentQuestion.id === "use" && (
                  <div className="guidance-options guidance-options--four">
                    {useCases.map((option) => {
                      const Icon = option.icon;

                      const selected =
                        answers.use === option.id;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          className={`guidance-option ${
                            selected
                              ? "guidance-option--selected"
                              : ""
                          }`}
                          onClick={() =>
                            selectAnswer(option.id)
                          }
                        >
                          <div className="guidance-option__icon">
                            <Icon size={22} />
                          </div>

                          <div>
                            <strong>
                              {option.title}
                            </strong>

                            <p>
                              {option.description}
                            </p>
                          </div>

                          <div className="guidance-option__check">
                            {selected && (
                              <Check size={14} />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* DEVICE OPTIONS */}
                {currentQuestion.id === "device" && (
                  <div className="guidance-options guidance-options--three">
                    {deviceTypes.map((option) => {
                      const Icon = option.icon;

                      const selected =
                        answers.device === option.id;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          className={`guidance-option ${
                            selected
                              ? "guidance-option--selected"
                              : ""
                          }`}
                          onClick={() =>
                            selectAnswer(option.id)
                          }
                        >
                          <div className="guidance-option__icon">
                            <Icon size={24} />
                          </div>

                          <div>
                            <strong>
                              {option.title}
                            </strong>

                            <p>
                              {option.description}
                            </p>
                          </div>

                          <div className="guidance-option__check">
                            {selected && (
                              <Check size={14} />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* BUDGET OPTIONS */}
                {currentQuestion.id === "budget" && (
                  <div className="guidance-options guidance-options--budget">
                    {budgets.map((option) => {
                      const selected =
                        answers.budget === option.id;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          className={`guidance-option ${
                            selected
                              ? "guidance-option--selected"
                              : ""
                          }`}
                          onClick={() =>
                            selectAnswer(option.id)
                          }
                        >
                          <div className="guidance-option__budget">
                            <strong>
                              {option.title}
                            </strong>

                            <p>
                              {option.description}
                            </p>
                          </div>

                          <div className="guidance-option__check">
                            {selected && (
                              <Check size={14} />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* ACTIONS */}
                <div className="guidance-actions">
                  <button
                    type="button"
                    className="guidance-secondary-button"
                    onClick={previousStep}
                    disabled={step === 0}
                  >
                    <ArrowLeft size={16} />
                    Previous
                  </button>

                  <button
                    type="button"
                    className="guidance-primary-button"
                    onClick={nextStep}
                    disabled={!currentAnswer}
                  >
                    {step === questions.length - 1
                      ? "See my options"
                      : "Continue"}

                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            ) : (
              /* RESULT */
              <div className="guidance-result">

                <div className="guidance-result__icon">
                  <Sparkles size={25} />
                </div>

                <p className="section__eyebrow">
                  YOUR DEVICE PROFILE
                </p>

                <h2>
                  We have a starting point.
                </h2>

                <p className="guidance-result__intro">
                  Based on your answers, we can narrow the
                  catalogue around your use case, device
                  preference and budget.
                </p>

                <div className="guidance-result__summary">
                  <div>
                    <span>Primary use</span>

                    <strong>
                      {
                        useCases.find(
                          (item) =>
                            item.id === answers.use
                        )?.title
                      }
                    </strong>
                  </div>

                  <div>
                    <span>Device</span>

                    <strong>
                      {
                        deviceTypes.find(
                          (item) =>
                            item.id === answers.device
                        )?.title
                      }
                    </strong>
                  </div>

                  <div>
                    <span>Budget</span>

                    <strong>
                      {
                        budgets.find(
                          (item) =>
                            item.id === answers.budget
                        )?.title
                      }
                    </strong>
                  </div>
                </div>

                <div className="guidance-result__actions">
                  <Link
                    href={`/shop?device=${answers.device}&use=${answers.use}&budget=${answers.budget}`}
                    className="guidance-primary-button"
                  >
                    Explore matching devices
                    <ArrowRight size={17} />
                  </Link>

                  <button
                    type="button"
                    className="guidance-secondary-button"
                    onClick={restart}
                  >
                    Start again
                  </button>
                </div>

                <div className="guidance-result__note">
                  <Sparkles size={16} />

                  <p>
                    Recommendations are currently based
                    on your answers and available catalogue
                    data. A Sanfaani advisor can help when
                    you need more guidance.
                  </p>
                </div>
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}