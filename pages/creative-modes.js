// pages/creative-modes.js
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const creativeFlavors = [
  {
    id: "vibetrip",
    title: "VibeTrip — Travel by Mood: Pick One",
    description:
      "AI designs your destination tone and activities around how you feel right now.",
    icon: "💫",
    type: "chips",
    prompt: "What best describes your current mood?",
    options: [
      "Stressed",
      "Curious",
      "Romantic",
      "Adventurous",
      "Bored",
      "Peaceful",
    ],
  },
  {
    id: "parallel",
    title: "Parallel Universe Trip — Alternate You: Pick One",
    description:
      "Pick an alternate version of yourself and see the world through their eyes.",
    icon: "🌌",
    type: "chips",
    prompt: "Which version of you is traveling?",
    options: [
      "Adventurer Me",
      "Rich Me",
      "Minimalist Me",
      "Bollywood Star Me",
      "Monk Me",
      "Historian Me",
    ],
  },
  {
    id: "onephoto",
    title: "One Photo → One Trip",
    description:
      "Upload a photo; AI senses the vibe, color and emotion, and builds a matching trip.",
    icon: "📷",
    type: "upload",
    prompt: "Upload a photo whose vibe you’d like to travel into.",
  },
  {
    id: "multiverse",
    title: "Multiverse Generator — Three Worlds",
    description:
      "Generates three versions of the same destination: realistic, dream/unlimited, and cinematic.",
    icon: "🪐",
    type: "info",
    prompt:
      "We’ll automatically create three parallel versions of your trip — no extra choices needed.",
  },
  {
    id: "antiitinerary",
    title: "Anti-Itinerary — Surprise Mode",
    description:
      "A loose, spontaneous adventure with minimal structure and curated surprises.",
    icon: "🎲",
    type: "info",
    prompt:
      "Tell us as little as possible; we’ll lean into spontaneity while keeping it safe and fun.",
  },
];

export default function CreativeModes() {
  const router = useRouter();
  const { mode } = router.query; // "A" or "B" from Screen 2

  const [selectedMode, setSelectedMode] = useState("classic"); // "classic" | "creative"
  const [selectedFlavor, setSelectedFlavor] = useState(null); // flavor id
  const [selectedDetail, setSelectedDetail] = useState(null); // mood/persona/file name etc.

  // Set initial selection based on query from Screen 2
  useEffect(() => {
    if (!mode) return;
    if (mode === "B") {
      setSelectedMode("creative");
    } else {
      setSelectedMode("classic");
    }
  }, [mode]);

  const onSelectMode = (modeKey) => {
    setSelectedMode(modeKey);
    if (modeKey === "classic") {
      setSelectedFlavor(null);
      setSelectedDetail(null);
    }
  };

  const onSelectFlavor = (flavorId) => {
    setSelectedMode("creative"); // ensure creative is selected
    setSelectedFlavor(flavorId);
    setSelectedDetail(null); // reset detail when switching flavor
  };

  const activeFlavor = selectedFlavor
    ? creativeFlavors.find((f) => f.id === selectedFlavor)
    : null;

  const flavorRequiresDetail =
    activeFlavor && (activeFlavor.type === "chips" || activeFlavor.type === "upload");

  const canContinue =
    selectedMode === "classic" ||
    (selectedMode === "creative" &&
      !!selectedFlavor &&
      (!flavorRequiresDetail || !!selectedDetail));

  const getDisableReason = () => {
    if (selectedMode === "classic") return "";
    if (!selectedFlavor) return "Please choose one of the creative modes.";
    if (activeFlavor) {
      if (activeFlavor.type === "chips" && !selectedDetail) {
        return "Please choose one of the moods/personas.";
      }
      if (activeFlavor.type === "upload" && !selectedDetail) {
        return "Please upload a photo (JPG or PNG).";
      }
    }
    return "";
  };

const handleContinue = () => {
  if (!canContinue) return;

  const { planner, destination, days, companion, budget, prompt } = router.query;

  router.push({
    pathname: "/tributaries",
    query: {
      mode: selectedMode,
      flavor: selectedMode === "creative" ? selectedFlavor : "",
      detail: selectedDetail || "",

      // Forward ALL earlier inputs
      planner: planner || "",
      destination: destination || "",
      days: days || "",
      companion: companion || "",
      budget: budget || "",
      prompt: prompt || "",
    },
  });
};


  let selectedLabel;
  if (selectedMode === "classic") {
    selectedLabel = "Selected: Classic Mode";
  } else if (activeFlavor) {
    if (selectedDetail) {
      selectedLabel = `Selected: ${activeFlavor.title} — ${selectedDetail}`;
    } else {
      selectedLabel = `Selected: ${activeFlavor.title}`;
    }
  } else {
    selectedLabel =
      "Selected: Creative Multiverse Mode (choose a flavor and style)";
  }

  const disableReason = canContinue ? "" : getDisableReason();

  return (
    <div className={styles.page}>
      <Head>
        <title>Creative Modes | Travel Multiverse</title>
        <meta
          name="description"
          content="Choose between classic or creative itinerary styles for your multiverse trip."
        />
      </Head>

    

      <main className={styles.tripMain}>
        <section className={styles.tripContainer}>
          <h1 className={styles.tripTitle}>Pick your creative mode</h1>
          <p className={styles.tripSubtitle}>
            Start from a dependable Classic itinerary or let Creative Multiverse
            remix your journey with moods, alternate selves, photos, and more.
          </p>

          {/* MAIN MODE CARDS */}
          <div className={styles.tripOptionsLayout}>
            {/* Classic Mode */}
            <div
              className={`${styles.tripCard} ${
                selectedMode === "classic"
                  ? styles.tripCardActive
                  : styles.tripCardInactive
              }`}
              onClick={() => onSelectMode("classic")}
            >
              <div className={styles.tripCardHeaderRow}>
                <h2 className={styles.tripCardTitle}>Classic Mode</h2>
                {selectedMode === "classic" && (
                  <span className={styles.tripBadge}>Selected</span>
                )}
              </div>
              <p className={styles.tripCardSubtitle}>
                A clean, structured itinerary with a logical flow of days and
                time blocks. Best if you want clarity and reliability.
              </p>
              <p className={styles.tripNote}>
                Great for families, first-time visitors, or when you want a
                predictable sequence of must-see experiences.
              </p>
            </div>

            {/* Creative Mode */}
            <div
              className={`${styles.tripCard} ${
                selectedMode === "creative"
                  ? styles.tripCardActive
                  : styles.tripCardInactive
              }`}
              onClick={() => onSelectMode("creative")}
            >
              <div className={styles.tripCardHeaderRow}>
                <h2 className={styles.tripCardTitle}>Creative Multiverse Mode</h2>
                {selectedMode === "creative" && (
                  <span className={styles.tripBadge}>Selected</span>
                )}
              </div>
              <p className={styles.tripCardSubtitle}>
                A more playful itinerary that weaves moods, “what-if” branches,
                and cinematic story beats into your trip.
              </p>
              <p className={styles.tripNote}>
                Ideal when you want inspiration, unexpected ideas, and a
                story-driven journey rather than just a checklist.
              </p>
            </div>
          </div>

          {/* CREATIVE FLAVORS ROW (only when creative is chosen) */}
          {selectedMode === "creative" && (
            <div className={styles.creativeFlavorsRow}>
              <div className={styles.creativeFlavorsHeader}>
                <h3 className={styles.creativeFlavorsTitle}>
                  Creative Multiverse Flavors - Choose One
                </h3>
                <p className={styles.creativeFlavorsSubtitle}>
                  Pick one innovative mode that feels most exciting right now.
                </p>
              </div>

              <div className={styles.creativeFlavorsGrid}>
                {creativeFlavors.map((flavor) => {
                  const active = selectedFlavor === flavor.id;
                  return (
                    <button
                      key={flavor.id}
                      type="button"
                      className={`${styles.creativeFlavorCard} ${
                        active
                          ? styles.creativeFlavorCardActive
                          : styles.creativeFlavorCardInactive
                      }`}
                      onClick={() => onSelectFlavor(flavor.id)}
                    >
                      <div className={styles.creativeFlavorIcon}>
                        {flavor.icon}
                      </div>
                      <div className={styles.creativeFlavorText}>
                        <div className={styles.creativeFlavorTitle}>
                          {flavor.title}
                        </div>
                        <div className={styles.creativeFlavorDescription}>
                          {flavor.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* FLAVOR DETAILS (moods/personas/upload/info) */}
          {selectedMode === "creative" && activeFlavor && (
            <div className={styles.flavorDetailPanel}>
              <div className={styles.flavorDetailHeader}>
                <h3 className={styles.flavorDetailTitle}>
                  {activeFlavor.title}
                </h3>
                <p className={styles.flavorDetailSubtitle}>
                  {activeFlavor.prompt}
                </p>
              </div>

              {activeFlavor.type === "chips" && (
                <div className={styles.flavorDetailChips}>
                  {activeFlavor.options.map((opt) => {
                    const active = selectedDetail === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        className={`${styles.flavorDetailChip} ${
                          active
                            ? styles.flavorDetailChipActive
                            : styles.flavorDetailChipInactive
                        }`}
                        onClick={() => setSelectedDetail(opt)}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {activeFlavor.type === "upload" && (
                <div className={styles.flavorDetailUpload}>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className={styles.flavorDetailFileInput}
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0];
                      if (!file) {
                        setSelectedDetail(null);
                        return;
                      }

                      const validTypes = ["image/jpeg", "image/png"];
                      const extOk = /\.(jpg|jpeg|png)$/i.test(file.name || "");

                      if (!validTypes.includes(file.type) && !extOk) {
                        alert("Please upload a JPG or PNG image.");
                        e.target.value = "";
                        setSelectedDetail(null);
                        return;
                      }

                      setSelectedDetail(file.name);
                    }}
                  />
                  <p className={styles.flavorDetailHint}>
                    (For now we just record the image name; later you can plug in
                    real image analysis here.)
                  </p>
                </div>
              )}

              {activeFlavor.type === "info" && (
                <p className={styles.flavorDetailInfo}>
                  {activeFlavor.prompt}
                </p>
              )}
            </div>
          )}

          {/* CTA ROW */}
          <div className={styles.creativeCtaRow}>
            <div className={styles.creativeSelectedText}>{selectedLabel}</div>

            <button
              type="button"
              className={styles.creativeContinueButton}
              disabled={!canContinue}
              title={disableReason}
              onClick={handleContinue}
            >
              Generate My Trip
            </button>
          </div>

          <div className={styles.tripBackRow}>
            <Link href="/trip-details" className={styles.tripBackLink}>
              ← Back to Trip Details
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
