import { useState } from "react";

export default function PhotoUpload({ onUpload }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png"];
    const extOk = /\.(jpg|jpeg|png)$/i.test(file.name || "");

    if (!validTypes.includes(file.type) && !extOk) {
      alert("Please upload a JPG or PNG image.");
      e.target.value = "";
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    onUpload(url);
  };

  return (
    <div className="space-y-3">
      {/* Minimal, clean label */}
      <label className="block cursor-pointer">
        <span className="text-sm text-fog">Upload a photo</span>

        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          className="mt-2 block text-sm"
          onChange={handleFileChange}
        />
      </label>

      {preview && (
        <img
          src={preview}
          alt="Uploaded preview"
          className="h-36 w-full object-cover rounded-xl border border-fog/60 shadow-sm"
        />
      )}
    </div>
  );
}
