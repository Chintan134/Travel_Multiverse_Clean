import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function TripDetails() {
  const router = useRouter();

  // Option selector
  const [selectedOption, setSelectedOption] = useState("A");

  // Option A fields
  const [destination, setDestination] = useState("");
  const [companion, setCompanion] = useState("");
  const [days, setDays] = useState("");
  const [customDays, setCustomDays] = useState("");

  // Option B prompt
  const [prompt, setPrompt] = useState("");

  // Validation logic
  const isOptionAValid =
    destination.trim().length > 0 &&
    companion.trim().length > 0 &&
    ((days !== "custom" && days !== "") ||
      (days === "custom" && customDays >= 1 && customDays <= 14));

  const isOptionBValid = prompt.trim().length >= 5;

  const isContinueEnabled =
    (selectedOption === "A" && isOptionAValid) ||
    (selectedOption === "B" && isOptionBValid);

  const handleContinue = () => {
    router.push({
      pathname: "/creative-modes",
      query: { mode: selectedOption },
    });
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>Trip Details | Travel Multiverse</title>
        <meta
          name="description"
          content="Choose a structured trip planner or a free-form smart prompt to plan your multiverse trip."
        />
      </Head>

      <main className={styles.tripMain}>
        <section className={styles.tripContainer}>
          <h1 className={styles.tripTitle}>How do you want to plan your trip?</h1>
          <p className={styles.tripSubtitle}>
            Choose a guided, structured planner or a free-form smart prompt.
          </p>

          <div className={styles.tripOptionsLayout}>
            {/* OPTION A – STRUCTURED PLANNER */}
            <div
              className={`${styles.tripCard} ${
                selectedOption === "A"
                  ? styles.tripCardActive
                  : styles.tripCardInactive
              }`}
              onClick={() => setSelectedOption("A")}
            >
              <div className={styles.tripCardHeaderRow}>
                <h2 className={styles.tripCardTitle}>
                  Option A — Structured Trip Planner (Easy Mode)
                </h2>
                {selectedOption === "A" && (
                  <span className={styles.tripBadge}>Selected</span>
                )}
              </div>

              <p className={styles.tripCardSubtitle}>
                Perfect if you want guided inputs.
              </p>

              <div className={styles.tripFormGrid}>
                {/* 1. Destination */}
                <div className={styles.tripFieldGroup}>
                  <label className={styles.tripLabel}>Where do you want to go?</label>
                  <input
                    className={styles.tripInput}
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder='e.g. "Japan", "Italy", "New York City, USA"'
                  />
                </div>

                {/* 2. Companion – moved above Days */}
                <div className={styles.tripFieldGroup}>
                  <label className={styles.tripLabel}>
                    Who are you traveling with?
                  </label>
                  <select
                    className={styles.tripSelect}
                    value={companion}
                    onChange={(e) => setCompanion(e.target.value)}
                  >
                    <option value="" disabled>
                      Select option
                    </option>
                    <option value="solo">Solo</option>
                    <option value="couple">Couple</option>
                    <option value="friends">Friends</option>
                    <option value="family">Family</option>
                  </select>
                </div>

                {/* 3. Days */}
                <div className={styles.tripFieldGroup}>
                  <label className={styles.tripLabel}>
                    How many days will you stay?
                  </label>
                  <select
                    className={styles.tripSelect}
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                  >
                    <option value="" disabled>
                      Select days
                    </option>
                    <option value="1">1 day</option>
                    <option value="2">2 days</option>
                    <option value="3">3 days</option>
                    <option value="5">5 days</option>
                    <option value="7">7 days</option>
                    <option value="custom">Custom</option>
                  </select>

                  {days === "custom" && (
                    <input
                      className={styles.tripInput}
                      type="number"
                      min="1"
                      max="14"
                      placeholder="Enter days (1–14)"
                      value={customDays}
                      onChange={(e) => setCustomDays(e.target.value)}
                    />
                  )}
                </div>
              </div>

              <button
                type="button"
                className={styles.tripButtonPrimary}
                disabled={!isOptionAValid}
                onClick={handleContinue}
              >
                Continue to Creative Modes
              </button>
            </div>

            {/* OPTION B – FREE-FORM SMART PROMPT */}
            <div
              className={`${styles.tripCard} ${
                selectedOption === "B"
                  ? styles.tripCardActive
                  : styles.tripCardInactive
              }`}
              onClick={() => setSelectedOption("B")}
            >
              <div className={styles.tripCardHeaderRow}>
                <h2 className={styles.tripCardTitle}>
                  Option B — Free-Form Smart Prompt (Advanced Mode)
                </h2>
                {selectedOption === "B" && (
                  <span className={styles.tripBadge}>Selected</span>
                )}
              </div>

              <p className={styles.tripCardSubtitle}>
                For users who prefer natural, free-form input.
              </p>

              <textarea
                className={styles.tripTextarea}
                rows={9}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`“I want to travel to Japan with my spouse for 5 days.
We love nature, culture, and peaceful places.”`}
              />

              <button
                type="button"
                className={styles.tripButtonSecondary}
                disabled={!isOptionBValid}
                onClick={handleContinue}
              >
                Continue to Creative Modes
              </button>
            </div>
          </div>

          <div className={styles.tripBackRow}>
            <Link href="/" className={styles.tripBackLink}>
              ← Back to Home
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
