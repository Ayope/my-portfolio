'use client';
import React, { useEffect, useRef, useState } from "react";

export default function Hero() {
  const navRef = useRef<HTMLElement | null>(null); // optional, for nav height
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // ease function and custom smooth scroll so we can control duration
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function smoothScrollTo(targetEl: Element | null, duration = 900) {
    if (!targetEl) return window.scrollTo({ top: 0, behavior: "smooth" });
    const navHeight = navRef.current?.offsetHeight ?? 72;
    const start = window.scrollY || window.pageYOffset;
    const targetTop =
      targetEl.getBoundingClientRect().top + start - Math.max(navHeight, 60) - 12;
    const distance = targetTop - start;
    let startTime: number | null = null;

    function step(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const time = Math.min(1, (timestamp - startTime) / duration);
      const eased = easeInOutCubic(time);
      window.scrollTo(0, Math.round(start + distance * eased));
      if (time < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function handleNavClick(e: React.MouseEvent, href: string) {
    const anchor = href.startsWith("#") ? href : null;
    if (!anchor) return;
    e.preventDefault();
    const target = document.querySelector(anchor);
    smoothScrollTo(target, 900);
    // optionally update url hash without jumping
    if (history.pushState) history.pushState(null, "", anchor);
  }

  const openImage = () => {
    setIsImageOpen(true);
    window.setTimeout(() => setIsVisible(true), 10);
  };

  const closeImage = () => {
    setIsVisible(false);
    window.setTimeout(() => setIsImageOpen(false), 300);
  };

  useEffect(() => {
    if (!isImageOpen) {
      setIsVisible(false);
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeImage();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isImageOpen]);

  return (
    <section
      id="home"
      className="relative rounded-xl scroll-mt-20 md:scroll-mt-24 px-6 md:px-10 sm:py-28 max-md:pb-5 flex flex-col items-center justify-center
                 bg-linear-to-t from-green-900/20 via-green-900/8 to-transparent"
    >
      {/* TEXT (centered block, left-aligned text) */}
      <div className="lg:max-w-1/2">
        <button
          type="button"
          aria-label="Open profile image"
          onClick={openImage}
          className="rounded-full overflow-hidden w-16 h-16 mb-2 border border-green-400/40 shadow-lg shadow-green-900/20 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
        >
          <img src="portfolio-img.png" alt="portfolio image" className="w-full h-full object-cover" />
        </button>
        <h1 className="text-5xl font-extrabold flex flex-wrap items-baseline gap-3 mb-2">
        Hey, I’m <span className="text-green-400 max-sm:mb-3"> Ayoub</span>
        </h1>
        <h2 className="text-green-400 text-3xl mb-4">
        <strong className="text-white">A</strong> ServiceNow Technical Consultant
        </h2>
        <p className="text-gray-300 mb-8">
          A <strong>Certified ServiceNow Technical Consultant & Developer</strong> with solid experience designing and implementing custom workflows, scalable applications, and integrated solutions that elevate client and employee experiences.
        </p>
        <div className="flex gap-4 ">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="bg-green-500 px-6 py-3 rounded-full text-black font-semibold hover:bg-green-400 cursor-pointer inline-block text-center"
          >
            Contact
          </a>
          {/* <button className="bg-green-500 px-6 py-3 rounded-full text-black font-semibold hover:bg-green-400 cursor-pointer">
            See Resume
          </button> */}
        </div>
      </div>

      {isImageOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-[linear-gradient(180deg,rgba(0,0,0,0.95)_0%,rgba(2,6,23,0.9)_45%,rgba(34,197,94,0.22)_100%)] backdrop-blur-sm p-4 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
          onClick={closeImage}
          role="dialog"
          aria-modal="true"
          aria-label="Profile image preview"
        >
          <div
            className={`max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl cursor-pointer transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="portfolio-img.png"
              alt="portfolio image enlarged"
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}