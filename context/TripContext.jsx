import { createContext, useContext, useState } from "react";
import { generateTrip } from "../utils/generator";

const TripContext = createContext(null);

export const TripProvider = ({ children }) => {
  const [trip, setTrip] = useState({
    destination: "",
    days: "",
    companion: "",
    budget: "",
    freeformInput: "",
    inputMethod: "structured", // or "freeform"
    mode: "", // classic, vibetrip, parallel, onephoto, multiverse, anti
    mood: "",
    persona: "",
    uploadedPhoto: null, // URL
    heroImage: "",
    itinerary: [],
    notes: "",
    multiverseData: null,
  });

  const updateTripDetails = (partial) => {
    setTrip((prev) => ({ ...prev, ...partial }));
  };

  const regenerateTrip = () => {
    const generated = generateTrip(trip);
    setTrip((prev) => ({
      ...prev,
      ...generated,
    }));
  };

  const resetTrip = () => {
    setTrip({
      destination: "",
      days: "",
      companion: "",
      budget: "",
      freeformInput: "",
      inputMethod: "structured",
      mode: "",
      mood: "",
      persona: "",
      uploadedPhoto: null,
      heroImage: "",
      itinerary: [],
      notes: "",
      multiverseData: null,
    });
  };

  const value = {
    trip,
    updateTripDetails,
    regenerateTrip,
    resetTrip,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

export const useTrip = () => useContext(TripContext);
