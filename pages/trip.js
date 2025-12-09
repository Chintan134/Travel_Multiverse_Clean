import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTrip } from "../context/TripContext";
import InputCard from "../components/InputCard";
import FreeFormCard from "../components/FreeFormCard";

export default function TripInput() {
  const router = useRouter();
  const { trip, updateTripDetails } = useTrip();

  const [selected, setSelected] = useState(trip.inputMethod || "structured");

  const [destination, setDestination] = useState(trip.destination || "");
  const [days, setDays] = useState(trip.days || "");
  const [companion, setCompanion] = useState(trip.companion || "");
  const [budget, setBudget] = useState(trip.budget || "");
  const [freeformInput, setFreeformInput] = useState(trip.freeformInput || "");

  useEffect(() => {
    setSelected(trip.inputMethod || "structured");
  }, [trip.inputMethod]);

  const handleContinue = () => {
    if (selected === "structured") {
      updateTripDetails({
        destination,
        days,
        companion,
        budget,
        inputMethod: "structured",
      });
    } else {
      updateTripDetails({
        freeformInput,
        inputMethod: "freeform",
      });
    }

    router.push("/style");
  };

  return (
    <div className="space-y-8 pt-4">
      {/* INTRO HEADER */}
      <div>
        <h1 className="font-heading text-2xl font-semibold text-stone mb-2">
          How do you want to begin your journey?
        </h1>
        <p className="text-sm text-fog">
          Choose a guided planner or tell your story in your own words.
        </p>
      </div>

      {/* TWO INPUT CARDS */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Structured Card */}
        <InputCard
          title="Structured Planner"
          subtitle="Guided questions for classic travelers."
          selected={selected === "structured"}
          onClick={() => setSelected("structured")}
        >
          <div className="space-y-3 mt-2">
            {/* Destination */}
            <div>
              <label className="block text-xs text-fog mb-1">
                Where do you want to go?
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-fog/70 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ocean"
                placeholder="e.g., New York City, USA or Bali"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* Days + Budget */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-fog mb-1">
                  How many days?
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full rounded-xl border border-fog/70 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ocean"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs text-fog mb-1">Budget</label>
                <select
                  className="w-full rounded-xl border border-fog/70 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ocean"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Unlimited</option>
                </select>
              </div>
            </div>

            {/* Companion */}
            <div>
              <label className="block text-xs text-fog mb-1">
                Who are you traveling with?
              </label>
              <select
                className="w-full rounded-xl border border-fog/70 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ocean"
                value={companion}
                onChange={(e) => setCompanion(e.target.value)}
              >
                <option value="">Select...</option>
                <option>Solo</option>
                <option>Couple</option>
                <option>Friends</option>
                <option>Family</option>
              </select>
            </div>
          </div>
        </InputCard>

        {/* FreeForm Card */}
        <FreeFormCard
          title="Free-Form Story Mode"
          subtitle="Describe your trip. Let AI understand everything."
          selected={selected === "freeform"}
          onClick={() => setSelected("freeform")}
        >
          <label className="block text-xs text-fog mb-2 mt-1">
            Describe your trip:
          </label>
          <textarea
            className="w-full min-h-[160px] rounded-xl border border-fog/70 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sage resize-none"
            placeholder={`I want to travel to Japan with my spouse for 5 days on a medium budget. 
We love nature, culture, and peaceful places.`}
            value={freeformInput}
            onChange={(e) => setFreeformInput(e.target.value)}
          />
        </FreeFormCard>
      </div>

      {/* CONTINUE BUTTON */}
      <button type="button" className="primary-btn" onClick={handleContinue}>
        Continue to Travel Style
      </button>
    </div>
  );
}
