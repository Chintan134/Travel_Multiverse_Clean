import PhotoUpload from "./PhotoUpload";

const pillBase =
  "px-3 py-1 rounded-full border text-xs md:text-sm cursor-pointer transition";

export const ModeSelector = ({
  mode,
  setMode,
  mood,
  setMood,
  persona,
  setPersona,
  setUploadedPhoto,
}) => {
  return (
    <div className="space-y-6">

      {/* CLASSIC */}
      <ModeCard
        title="Classic Itinerary"
        subtitle="A clean, structured itinerary based on your details."
        active={mode === "classic"}
        onSelect={() => setMode("classic")}
      />

      {/* VIBETRIP */}
      <ModeCard
        title="VibeTrip"
        subtitle="Travel by mood — AI shapes the trip around how you feel."
        active={mode === "vibetrip"}
        onSelect={() => setMode("vibetrip")}
      >
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            "Stressed",
            "Curious",
            "Romantic",
            "Adventurous",
            "Bored",
            "Peaceful",
          ].map((m) => (
            <button
              key={m}
              type="button"
              className={`${pillBase} ${
                mood === m
                  ? "bg-sage text-white border-sage"
                  : "border-fog text-stone hover:bg-beige/60"
              }`}
              onClick={() => setMood(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </ModeCard>

      {/* PARALLEL UNIVERSE */}
      <ModeCard
        title="Parallel Universe Trip"
        subtitle="Choose an alternate version of yourself and explore the world through them."
        active={mode === "parallel"}
        onSelect={() => setMode("parallel")}
      >
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            "Adventurer Me",
            "Rich Me",
            "Minimalist Me",
            "Bollywood Star Me",
            "Monk Me",
            "Historian Me",
          ].map((p) => (
            <button
              key={p}
              type="button"
              className={`${pillBase} ${
                persona === p
                  ? "bg-sunset text-white border-sunset"
                  : "border-fog text-stone hover:bg-beige/60"
              }`}
              onClick={() => setPersona(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </ModeCard>

      {/* ONE PHOTO → ONE TRIP */}
      <ModeCard
        title="One Photo → One Trip"
        subtitle="Upload a photo — we match the trip to its vibe."
        active={mode === "onephoto"}
        onSelect={() => setMode("onephoto")}
      >
        <div className="mt-3 space-y-3">
          <PhotoUpload onUpload={(url) => setUploadedPhoto(url)} />
        </div>
      </ModeCard>

      {/* MULTIVERSE GENERATOR */}
      <ModeCard
        title="Multiverse Generator"
        subtitle="Get three parallel versions of the same destination: realistic, dream, and cinematic."
        active={mode === "multiverse"}
        onSelect={() => setMode("multiverse")}
      />

      {/* ANTI ITINERARY */}
      <ModeCard
        title="Anti-Itinerary"
        subtitle="Minimal structure — a spontaneous, unpredictable adventure."
        active={mode === "anti"}
        onSelect={() => setMode("anti")}
      />
    </div>
  );
};

const ModeCard = ({ title, subtitle, active, onSelect, children }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className={`section-card cursor-pointer transition ${
        active ? "ring-2 ring-ocean/80 shadow-soft" : "hover:shadow-soft"
      }`}
      onClick={onSelect}
      onKeyPress={(e) => e.key === "Enter" && onSelect?.()}
    >
      <h3 className="font-heading text-base md:text-lg font-semibold text-stone">
        {title}
      </h3>

      {subtitle && <p className="text-sm text-fog mt-1">{subtitle}</p>}

      {children && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default ModeSelector;
