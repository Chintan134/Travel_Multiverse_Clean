const InputCard = ({ children, title, subtitle, selected, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className={`section-card transition cursor-pointer select-none ${
        selected
          ? "ring-2 ring-ocean/70 shadow-soft"
          : "hover:shadow-soft"
      }`}
      onClick={onClick}
      onKeyPress={(e) => {
        if (e.key === "Enter") onClick?.();
      }}
    >
      {/* Title */}
      <h2 className="font-heading text-lg font-semibold text-stone mb-1">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm text-fog mb-4">{subtitle}</p>
      )}

      {/* Children (inputs, selectors, etc.) */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevents accidental card re-selection
        className="mt-2"
      >
        {children}
      </div>
    </div>
  );
};

export default InputCard;
