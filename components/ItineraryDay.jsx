const ItineraryDay = ({ dayNumber, items }) => {
  return (
    <div className="mt-4 rounded-2xl bg-beige/60 p-4">
      <h3 className="font-heading text-md font-semibold text-ocean mb-2">
        Day {dayNumber}
      </h3>
      <ul className="list-disc pl-5 space-y-1 text-sm text-stone">
        {items.map((it, idx) => (
          <li key={idx}>{it}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryDay;
