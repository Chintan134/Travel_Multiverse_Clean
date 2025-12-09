import { useTrip } from "../context/TripContext";

const modeLabelMap = {
  classic: "Classic",
  vibetrip: "VibeTrip",
  parallel: "Parallel Universe",
  onephoto: "One Photo → One Trip",
  multiverse: "Multiverse",
  anti: "Anti-Itinerary",
};

const SummaryCard = () => {
  const { trip } = useTrip();
  const { destination, days, budget, companion, mode } = trip || {};

  return (
    <div className="section-card rounded-2xl border border-fog/40 bg-white shadow-soft mt-6">
      <h2 className="font-heading text-lg font-semibold text-stone mb-4">
        Trip Summary
      </h2>

      <ul className="space-y-2 text-sm">
        <li className="text-fog">
          <span className="font-medium text-stone">Destination:</span>{" "}
          {destination || "Your Dream Place"}
        </li>

        <li className="text-fog">
          <span className="font-medium text-stone">Duration:</span>{" "}
          {days ? `${days} days` : "Not specified"}
        </li>

        <li className="text-fog">
          <span className="font-medium text-stone">Budget:</span>{" "}
          {budget || "Not specified"}
        </li>

        <li className="text-fog">
          <span className="font-medium text-stone">Companion:</span>{" "}
          {companion || "Not specified"}
        </li>

        <li className="text-fog">
          <span className="font-medium text-stone">Mode:</span>{" "}
          {modeLabelMap[mode] || "Not selected"}
        </li>
      </ul>
    </div>
  );
};

export default SummaryCard;
