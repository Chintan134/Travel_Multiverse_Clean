import { useRouter } from "next/router";
import { useTrip } from "../context/TripContext";

const ActionButtons = () => {
  const router = useRouter();
  const { regenerateTrip, resetTrip } = useTrip();

  const handlePdf = () => {
    // Fallback: native print dialog (can upgrade later)
    window.print();
  };

  const handleEdit = () => {
    router.push("/trip");
  };

  const handlePlanAnother = () => {
    resetTrip();
    router.push("/trip");
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {/* PRIMARY – darkest blue */}
      <button type="button" className="summaryButtonPrimary" onClick={handlePdf}>
        📄 Download PDF
      </button>

      {/* SECONDARY – mid blue */}
      <button
        type="button"
        className="summaryButtonSecondary"
        onClick={() => regenerateTrip && regenerateTrip()}
      >
        🔄 Regenerate
      </button>

      {/* SECONDARY – mid blue */}
      <button type="button" className="summaryButtonSecondary" onClick={handleEdit}>
        ✏️ Edit Trip
      </button>

      {/* GHOST – lightest */}
      <button
        type="button"
        className="summaryButtonGhost"
        onClick={handlePlanAnother}
      >
        🏠 Plan Another Trip
      </button>
    </div>
  );
};

export default ActionButtons;
