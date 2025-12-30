'use client';
import React, { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // close on Escape and click outside
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (!open) return;
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  // detect scroll to change nav background / shadow
  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { label: "Home", href: "#home" },
    { label: "Certifications", href: "#certifications" },
    { label: "Experience", href: "#experience" },
    // { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

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
    setOpen(false);
    // optionally update url hash without jumping
    if (history.pushState) history.pushState(null, "", anchor);
  }

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "md:bg-[#0e0e11]/95 md:shadow-md md:backdrop-blur-sm bg-[#0e0e11] shadow-md"
          : "md:bg-transparent bg-[#0e0e11] md:shadow-none shadow-none"
      }`}
    >
      <div className="w-full py-5 px-4 md:px-10 flex justify-end items-center">

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-8 text-sm">
          {items.map((it) => (
            <li key={it.label}>
              <a
                href={it.href}
                onClick={(e) => handleNavClick(e, it.href)}
                className="cursor-pointer hover:text-green-400"
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button (mobile) */}
        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="md:hidden p-2 rounded-md text-white"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="w-6 h-6 relative">
            <span
              className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ${
                open ? "rotate-45 top-2.5" : "top-1"
              }`}
            />
            <span
              className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ${
                open ? "opacity-0" : "top-3"
              }`}
            />
            <span
              className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ${
                open ? "-rotate-45 top-2.5" : "top-5"
              }`}
            />
          </div>
        </button>

        {/* Mobile slide-in panel */}
        <div
          className={`fixed inset-0 z-50 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
          {/* overlay */}
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
            onClick={() => setOpen(false)}
          />
          {/* panel */}
          <div
            ref={menuRef}
            className={`absolute right-0 top-0 h-full w-72 bg-[#0e0e11] p-6 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-white text-2xl">
                ×
              </button>
            </div>
            <ul className="flex flex-col gap-6 mt-8 text-base">
              {items.map((it) => (
                <li key={it.label}>
                  <a
                    href={it.href}
                    onClick={(e) => handleNavClick(e, it.href)}
                    className="block cursor-pointer hover:text-green-400"
                  >
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}