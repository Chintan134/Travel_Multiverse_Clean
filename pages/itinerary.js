import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTrip } from "../context/TripContext";
import HeroImage from "../components/HeroImage";
import SummaryCard from "../components/SummaryCard";
import ItineraryDay from "../components/ItineraryDay";
import Tabs from "../components/Tabs";
import ActionButtons from "../components/ActionButtons";

export default function Itinerary() {
  const router = useRouter();
  const { trip } = useTrip();
  const [activeTab, setActiveTab] = useState("real");

  // Redirect if user lands here without data
  useEffect(() => {
    if (!trip.destination && !trip.itinerary?.length) {
      router.push("/");
    }
  }, [trip, router]);

  const { heroImage, itinerary, notes, multiverseData, mode } = trip;
  const isMultiverse = mode === "multiverse";

  // Tabs for multiverse summary
  const tabs =
    multiverseData && isMultiverse
      ? [
          {
            key: "real",
            label: "Realistic",
            content: (
              <ul className="list-disc pl-5 space-y-1">
                {multiverseData.realistic.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            ),
          },
          {
            key: "dream",
            label: "Dream",
            content: (
              <ul className="list-disc pl-5 space-y-1">
                {multiverseData.dream.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            ),
          },
          {
            key: "vibe",
            label: "Vibe",
            content: (
              <ul className="list-disc pl-5 space-y-1">
                {multiverseData.vibe.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            ),
          },
        ]
      : [];

  return (
    <div className="space-y-8">
      {/* TITLE */}
      <h1 className="font-heading text-2xl font-semibold text-stone">
        Your Travel Multiverse Itinerary
      </h1>

      {/* HERO SECTION */}
      <HeroImage src={heroImage} />

      {/* SUMMARY CARD */}
      <SummaryCard />

      {/* ITINERARY TIMELINE */}
      <section className="mt-4">
        <h2 className="font-heading text-lg font-semibold text-stone mb-2">
          Your Personalized Itinerary
        </h2>

        {itinerary?.map((day) => (
          <ItineraryDay
            key={day.dayNumber}
            dayNumber={day.dayNumber}
            items={day.items}
          />
        ))}
      </section>

      {/* SPECIAL NOTES + MULTIVERSE */}
      {mode !== "classic" && (
        <section className="mt-6">
          <h2 className="font-heading text-lg font-semibold text-stone mb-2">
            Special Notes
          </h2>

          <p className="text-sm text-stone mb-4">{notes}</p>

          {isMultiverse && tabs.length > 0 && (
            <Tabs tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />
          )}
        </section>
      )}

      {/* FINAL QUOTE */}
      <section className="mt-6 text-center text-stone text-base italic opacity-80">
        “Trips change places. Great trips change people.  
        Your story begins now — enjoy the journey.”
      </section>

      {/* CTA BUTTONS */}
      <ActionButtons />
    </div>
  );
}
