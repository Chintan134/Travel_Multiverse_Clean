// pages/tributaries.js
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import styles from "../styles/Home.module.css";

// Static hero background: vibrant image + soft gradient
function getHeroBackground() {
  return "linear-gradient(to bottom right,rgba(15,23,42,0.1),rgba(15,23,42,0.9)), url('/hero.jpg')";
}

function getModeLabel(mode, flavor) {
  const m = (mode || "").toLowerCase();
  const f = (flavor || "").toLowerCase();

  if (m === "classic") return "Classic Itinerary";
  if (f === "vibetrip") return "VibeTrip";
  if (f === "parallel") return "Parallel Universe Trip";
  if (f === "onephoto") return "One Photo → One Trip";
  if (f === "multiverse") return "Multiverse Generator";
  if (f === "antiitinerary") return "Anti-Itinerary";
  return "Creative Multiverse Mode";
}

function getModeNote({ mode, flavor, detail }) {
  const m = (mode || "").toLowerCase();
  const f = (flavor || "").toLowerCase();

  if (m === "classic") {
    return "You chose Classic Mode, so this itinerary focuses on a clean, logical flow with reliable time blocks and essential highlights.";
  }
  if (f === "vibetrip") {
    const mood = detail || "your selected mood";
    return `Your mood was ${mood}, so this itinerary leans into neighborhoods, time slots, and experiences that reflect that emotional tone.`;
  }
  if (f === "parallel") {
    const persona = detail || "your chosen persona";
    return `As ${persona}, this trip emphasizes bold, character-driven choices that version of you would naturally make.`;
  }
  if (f === "onephoto") {
    const ref = detail ? `the image “${detail}”` : "your uploaded image";
    return `The colors and feel of ${ref} inspired the aesthetic and pacing of this journey.`;
  }
  if (f === "multiverse") {
    return "You unlocked three parallel versions of the same destination — realistic, dream/unlimited, and vibe/cinematic. Switch between them like timelines.";
  }
  if (f === "antiitinerary") {
    return "You selected Anti-Itinerary mode, so the plan acts as light guidance only. The real magic comes from wandering, curiosity, and happy accidents.";
  }
  return "";
}

// Build up to 14 days, so long trips still look smooth.
function buildSingleItinerary(daysCount) {
  const baseDays = [
    [
      "Arrive and take a gentle orientation walk.",
      "Visit a calm sunset viewpoint.",
      "Dinner at a cozy local spot.",
    ],
    [
      "Visit a major landmark in the morning.",
      "Explore hidden alleys or a local market.",
      "Evening at a recommended café or bar.",
    ],
    [
      "Morning walk through a peaceful district.",
      "Pick up meaningful souvenirs.",
      "Relax with a waterfront or rooftop sunset.",
    ],
  ];

  const count = Math.max(1, Math.min(14, Number(daysCount) || 3));
  const days = [];
  for (let i = 0; i < count; i++) {
    days.push({
      title: `Day ${i + 1}`,
      items: baseDays[i] || [
        "Explore freely at your own pace.",
        "Follow spontaneous discoveries or local tips.",
        "End the day with reflection and a relaxed meal.",
      ],
    });
  }
  return days;
}

function buildMultiverseItinerary(daysCount) {
  const base = buildSingleItinerary(daysCount);
  const tweak = (suffix) =>
    base.map((day) => ({
      title: day.title,
      items: day.items.map((item) => `${item} (${suffix})`),
    }));

  return {
    realistic: tweak("realistic"),
    dream: tweak("dream / unlimited"),
    vibe: tweak("vibe / cinematic"),
  };
}

export default function TributariesSummary() {
  const router = useRouter();
  const [openTimeline, setOpenTimeline] = useState("realistic");

  const query = router.query || {};

  // Raw values from query (to detect if user actually provided them)
  const rawDestination = query.destination || "";
  const rawDays = query.days || "";
  const rawCompanion = query.companion || "";
  const rawMode = query.mode || "";
  const rawFlavor = query.flavor || "";
  const rawDetail = query.detail || "";

  const mode = rawMode || "classic";
  const flavor = rawFlavor || "";
  const detail = rawDetail || "";

  // Safe values with fallbacks for display / logic
  const destination = rawDestination || "Your Destination";
  const duration = rawDays || "3";
  const companion = rawCompanion || "Solo";

  const isMultiverse =
    String(flavor).toLowerCase() === "multiverse" &&
    String(mode).toLowerCase() !== "classic";

  const itineraries = useMemo(
    () =>
      isMultiverse
        ? buildMultiverseItinerary(duration)
        : buildSingleItinerary(duration),
    [isMultiverse, duration]
  );

  const modeLabel = getModeLabel(mode, flavor);
  const modeDisplay = detail ? `${modeLabel} — ${detail}` : modeLabel;
  const heroBackground = getHeroBackground();
  const specialNote = getModeNote({ mode, flavor, detail });

  const handlePdf = () => {
    if (typeof window !== "undefined") {
      window.print(); // browser → Save as PDF
    }
  };

  const handleRegenerate = () =>
    router.replace({
      pathname: "/tributaries",
      query: { ...query, rev: Date.now() },
    });

  const handleEdit = () =>
    router.push({
      pathname: "/trip-details",
      query,
    });

  const handleNew = () => router.push("/");

  const durationNumber = Number(duration) || 0;
  const durationLabel =
    durationNumber > 0
      ? `${durationNumber} day${durationNumber > 1 ? "s" : ""}`
      : "Flexible length";

  // For overview text
  const overviewParts = [];
  if (rawDestination) overviewParts.push(`to ${destination}`);
  if (durationNumber > 0 && rawDays) overviewParts.push(`for ${durationLabel}`);
  if (rawCompanion) overviewParts.push(`with ${companion.toLowerCase()}`);
  if (rawMode || rawFlavor || rawDetail)
    overviewParts.push(`in ${modeDisplay} mode`);

  const overviewSentence =
    overviewParts.length > 0
      ? `A ${overviewParts.join(" ")}.`
      : "A personalized journey shaped around your preferences.";

  // Dynamic chip visibility (only show if user provided that piece)
  const showDestinationChip = !!rawDestination;
  const showDaysChip = !!rawDays;
  const showCompanionChip = !!rawCompanion;
  const showModeChip = !!(rawMode || rawFlavor || rawDetail);

  return (
    <div className={styles.page}>
      <Head>
        <title>Your Trip | Travel Multiverse</title>
      </Head>

      {/* Global header now comes from Layout.jsx */}

      <main className={styles.tripMain}>
        <section className={styles.tripContainer}>
          {/* HERO: static image, criteria chips, and quote */}
          <div
            className={styles.summaryHero}
            style={{ backgroundImage: heroBackground }}
          >
            <div className={styles.summaryHeroOverlay} />
            <div className={styles.summaryHeroContent}>
              <div className={styles.summaryHeroTagline}>
                AI-CRAFTED TRAVEL STORY
              </div>
              <h1 className={styles.summaryHeroTitle}>
                Trip to {destination}
              </h1>

              <div className={styles.summaryHeroChips}>
                {showDestinationChip && (
                  <span className={styles.summaryHeroChip}>
                    Destination: {destination}
                  </span>
                )}
                {showDaysChip && (
                  <span className={styles.summaryHeroChip}>
                    Duration: {durationLabel}
                  </span>
                )}
                {showCompanionChip && (
                  <span className={styles.summaryHeroChip}>
                    Companion: {companion}
                  </span>
                )}
                {showModeChip && (
                  <span className={styles.summaryHeroChip}>
                    Mode: {modeDisplay}
                  </span>
                )}
              </div>

              <p className={styles.summaryHeroQuote}>
                “Trips change places. Great trips change people. Your story
                begins now — enjoy the journey.”
              </p>
            </div>
          </div>

          {/* FULL-WIDTH SPECIAL MODE STRIP */}
          {specialNote && (
            <div className={styles.summaryModeStrip}>
              <div className={styles.summaryModeStripLabel}>
                Special Mode Notes
              </div>
              <p className={styles.summaryModeStripText}>{specialNote}</p>
            </div>
          )}

          {/* FULL-WIDTH ITINERARY TIMELINE */}
          <div
            className={`${styles.summaryCard} ${styles.summaryItineraryCard}`}
          >
            <h2 className={styles.summaryTimelineTitle}>Your Trip Timeline</h2>
            <p className={styles.summaryIntro}>{overviewSentence}</p>

            {isMultiverse && (
              <div className={styles.multiverseTabs}>
                {["realistic", "dream", "vibe"].map((key) => (
                  <button
                    key={key}
                    type="button"
                    className={`${styles.multiverseTab} ${
                      openTimeline === key ? styles.multiverseTabActive : ""
                    }`}
                    onClick={() => setOpenTimeline(key)}
                  >
                    {key === "realistic" && "Realistic"}
                    {key === "dream" && "Dream / Unlimited"}
                    {key === "vibe" && "Vibe / Cinematic"}
                  </button>
                ))}
              </div>
            )}

            {(isMultiverse
              ? itineraries[openTimeline] || []
              : itineraries || []
            ).map((day) => (
              <div key={day.title} className={styles.itineraryDay}>
                <div className={styles.itineraryDayMarker} />
                <div>
                  <div className={styles.itineraryDayTitle}>{day.title}</div>
                  <ul className={styles.itineraryItemList}>
                    {day.items.map((item, index) => (
                      <li key={index} className={styles.itineraryItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* ACTIONS – unified color family */}
          <div className={styles.summaryActions}>
            <button
              type="button"
              className={styles.summaryButtonPrimary}
              onClick={handlePdf}
            >
              📄 Download PDF
            </button>
            <button
              type="button"
              className={styles.summaryButtonSecondary}
              onClick={handleRegenerate}
            >
              🔄 Regenerate
            </button>
            <button
              type="button"
              className={styles.summaryButtonSecondary}
              onClick={handleEdit}
            >
              ✏️ Edit Trip
            </button>
            <button
              type="button"
              className={styles.summaryButtonGhost}
              onClick={handleNew}
            >
              🏠 Plan Another Trip
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
