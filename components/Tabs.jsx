const Tabs = ({ tabs, activeKey, onChange }) => {
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2 mb-3">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`px-3 py-1 rounded-full text-xs md:text-sm border ${
              activeKey === t.key
                ? "bg-ocean text-white border-ocean"
                : "border-fog text-stone hover:bg-beige/60"
            }`}
            onClick={() => onChange(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="rounded-2xl bg-white border border-fog/40 p-4 text-sm text-stone">
        {tabs.find((t) => t.key === activeKey)?.content}
      </div>
    </div>
  );
};

export default Tabs;
