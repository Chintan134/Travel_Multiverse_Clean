import { useRouter } from "next/router";
import { useTrip } from "../context/TripContext";
import { ModeSelector } from "../components/ModeSelector";

export default function TravelStyle() {
  const router = useRouter();
  const { trip, updateTripDetails, regenerateTrip } = useTrip();

  const handleGenerate = () => {
    if (!trip.mode) {
      alert("Please choose a travel style mode.");
      return;
    }
    regenerateTrip();
    router.push("/itinerary");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-stone mb-2">
          Choose Your Travel Style
        </h1>
        <p className="text-sm text-fog">
          Pick how you want the AI to imagine your journey.
        </p>
      </div>

      <ModeSelector
        mode={trip.mode}
        setMode={(mode) => updateTripDetails({ mode })}
        mood={trip.mood}
        setMood={(mood) => updateTripDetails({ mood })}
        persona={trip.persona}
        setPersona={(persona) => updateTripDetails({ persona })}
        setUploadedPhoto={(uploadedPhoto) =>
          updateTripDetails({ uploadedPhoto })
        }
      />

      <button
        type="button"
        className="primary-btn mt-4"
        onClick={handleGenerate}
      >
        Generate My Trip
      </button>
    </div>
  );
}
