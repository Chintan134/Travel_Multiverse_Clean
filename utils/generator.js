export function generateTrip(trip) {
  const {
    destination,
    days,
    budget,
    companion,
    mode,
    mood,
    persona,
  } = trip;

  const safeDestination = destination || "Your Dream Place";
  const safeDays = days || 3;

  // Very simple hero selection
  const heroImage = "/hero-placeholder.jpg"; // you can replace later

  const baseItinerary = Array.from({ length: safeDays }).map((_, i) => ({
    dayNumber: i + 1,
    items: [
      `Slow morning exploring the heart of ${safeDestination}.`,
      `Discover a hidden local gem in the afternoon.`,
      `Evening reflection with a beautiful view.`,
    ],
  }));

  let notes = "";
  let multiverseData = null;

  switch (mode) {
    case "vibetrip":
      notes = `Your mood was "${mood ||
        "Curious"}", so this trip focuses on discovery, gentle surprises, and hidden corners.`;
      break;
    case "parallel":
      notes = `You are traveling as "${persona ||
        "Adventurer Me"}", so the experiences lean into that identity with bolder choices and deeper immersion.`;
      break;
    case "onephoto":
      notes =
        "This itinerary is inspired by the colors and emotion of your photo — translated into landscapes, streets, and moments.";
      break;
    case "multiverse":
      notes =
        "Explore the Real, Dream, and Vibe versions of this journey — three parallel ways to live the same destination.";
      multiverseData = {
        realistic: {
          title: "Realistic",
          items: [
            `Grounded, budget-conscious experiences in ${safeDestination}.`,
            "Classic sights, relaxed pacing, and local comfort food.",
          ],
        },
        dream: {
          title: "Dream",
          items: [
            `Luxury views, curated stays, and premium experiences in ${safeDestination}.`,
            "Massage, fine dining, and once-in-a-lifetime moments.",
          ],
        },
        vibe: {
          title: "Vibe",
          items: [
            `Aesthetic corners, photogenic streets, and mood-rich places in ${safeDestination}.`,
            "Sunsets, cozy cafés, and reflective walks.",
          ],
        },
      };
      break;
    case "anti":
      notes =
        "This flow is intentionally loose. Let the city surprise you — follow your curiosity instead of the schedule.";
      break;
    case "classic":
    default:
      notes =
        "A grounded, realistic itinerary based on your inputs — flexible enough for you to personalize on the go.";
      break;
  }

  // Slightly tweak base itinerary per mode
  const itinerary = baseItinerary.map((day) => {
    const extra =
      mode === "vibetrip"
        ? " Pause for a mindful moment and notice how the place makes you feel."
        : mode === "parallel"
        ? " Ask yourself: how would this version of you choose to spend this hour?"
        : mode === "anti"
        ? " Leave one key part of this day unplanned, on purpose."
        : "";

    return {
      ...day,
      items: day.items.map((item) => item + extra),
    };
  });

  return {
    heroImage,
    itinerary,
    notes,
    multiverseData,
  };
}
