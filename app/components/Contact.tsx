'use client';
import React from "react";

type Card = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
};

const CARDS: Card[] = [
  {
    id: "linkedin",
    title: "LinkedIn",
    subtitle: "Connect and view my profile",
    href: "https://www.linkedin.com/in/ayoub-el-ayouk/",
    icon: (
      <svg aria-hidden="true" className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-12h4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="8" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="4" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "email",
    title: "Email",
    subtitle: "Send me a message",
    href: "mailto:ayoubelayouk1@gmail.com", // replace with your email
    icon: (
      <svg aria-hidden="true" className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M3 8.5v7a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 8.5l-9 6-9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 md:scroll-mt-24 px-4 md:px-10 mt-20">
      <h2 className="text-center text-3xl font-bold mb-2">CONTACT</h2>
      <p className="text-center text-green-400 mb-8">Feel free to contact me!</p>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {CARDS.map((card) => (
          <a
            key={card.id}
            href={card.href}
            target={card.href.startsWith("mailto:") ? "_self" : "_blank"}
            rel={card.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className="relative group block bg-[#0f1114] border border-[#1a1a1f] rounded-xl p-6 overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer focus:outline-none"
            aria-label={`${card.title} — ${card.subtitle}`}
          >
            <div className="flex items-start gap-4">
              <div className="rounded-md bg-[#0b0d0f] p-3 flex items-center justify-center text-green-400 group-hover:bg-green-400/10 group-hover:text-green-300 transition-colors">
                {card.icon}
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{card.subtitle}</p>
              </div>
            </div>

            {/* Arrow icon top-right */}
            <span
              className="absolute top-3 right-3 text-gray-400 group-hover:text-green-400 transition-transform transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
              aria-hidden
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M7 7h10v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}