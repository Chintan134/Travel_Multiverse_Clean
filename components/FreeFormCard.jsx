const FreeFormCard = ({ children, title, subtitle, selected, onClick }) => {
  return (
    <div
      className={`section-card cursor-pointer transition bg-cloud ${
        selected ? "ring-2 ring-sage/70 shadow-soft" : "hover:shadow-soft"
      }`}
      onClick={onClick}
    >
      <h2 className="font-heading text-lg font-semibold text-stone mb-1">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-fog mb-4">
          {subtitle}
        </p>
      )}
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default FreeFormCard;
