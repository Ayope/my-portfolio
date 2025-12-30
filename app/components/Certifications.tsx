'use client';
import React, { useEffect, useState } from "react";

type Props = {
  certFiles: string[];
};

export default function Certifications({ certFiles }: Props) {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const TRANSITION_MS = 600; // modal animation duration

  // keyboard close + disable background scroll while modal open
  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [isModalOpen]);

  function openModal(file: string) {
    setSelectedCert(file);
    requestAnimationFrame(() => setIsModalOpen(true));
  }

  function closeModal() {
    setIsModalOpen(false);
    window.setTimeout(() => setSelectedCert(null), TRANSITION_MS);
  }

  return (
    <section id="certifications" className="scroll-mt-20 md:scroll-mt-24 px-10 mt-20">
      <h2 className="text-center text-3xl font-bold">CERTIFICATIONS</h2>
      <div className="text-center mb-10">
        <p className="text-sm text-green-400 tracking-wide">
          Click any certificate to view it !
        </p>
      </div>

      {certFiles.length === 0 ? (
        <p className="text-center text-gray-400">No certifications added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
          {certFiles.map((file) => (
            <div key={file} className="p-4">
              <img
                src={`/certifs/${file}`}
                alt={file}
                role="button"
                onClick={() => openModal(file)}
                className="max-w-xs w-full h-auto object-contain rounded-lg shadow-md cursor-pointer transition-transform duration-200 ease-out hover:scale-105 hover:shadow-xl"
              />
            </div>
          ))}
        </div>
      )}

      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* overlay */}
          <div
            onClick={closeModal}
            className={`absolute inset-0 bg-black/70 transition-opacity duration-${TRANSITION_MS} ${isModalOpen ? "opacity-100" : "opacity-0"}`}
          />

          {/* modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative z-30 bg-[#0e0e11] w-[80vw] h-[80vh] rounded-lg p-4 flex items-center justify-center transition-all duration-${TRANSITION_MS} ease-out
              ${isModalOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-3 scale-95"}`}
            style={{ overflow: "hidden" }}
          >
            <button
              aria-label="Close"
              onClick={closeModal}
              className="absolute top-3 right-4 text-white text-4xl leading-none p-0 hover:opacity-80 cursor-pointer"
            >
              ×
            </button>

            <img
              src={`/certifs-display/${selectedCert}`}
              alt={selectedCert}
              className="max-w-full max-h-full object-contain rounded-md transition-transform duration-300 ease-out"
            />
          </div>
        </div>
      )}
    </section>
  );
}