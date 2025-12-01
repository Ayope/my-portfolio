import React from "react";

type ExperienceItem = {
  dates: string;
  title: string;
  company: string;
  location: string;
  description: string;
};

const EXPERIENCES: ExperienceItem[] = [
  {
    dates: "févr. 2024 - aujourd'hui",
    title: "ServiceNow Technical Consultant",
    company: "UX4MATION",
    location: "Maroc · Hybride",
    description:
      "Design and implement ServiceNow workflows, scalable applications, and integrations to improve client and employee experiences. Areas: ServiceNow Administration, ITSM, CSM, and App Development.",
  },
  {
    dates: "sept. 2022 - mars 2024",
    title: "Apprenant développeur web et mobile",
    company: "YouCode Maroc",
    location: "Youssoufia, Marrakech-Safi · Sur site",
    description:
      "Full-stack & mobile development training — built practical projects, worked with Scrum, and focused on frontend/backend integration and responsive UI.",
  },
  {
    dates: "mai 2023 - juin 2023",
    title: "Développeur Full Stack (Stage)",
    company: "FOODEALS",
    location: "Fès, Fès-Meknès · Sur site",
    description:
      "Contributed to a web app reducing food waste by connecting restaurants and supermarkets with citizens. Implemented features across the stack and improved UI/UX.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 md:scroll-mt-24 px-10 mt-20">
      <h2 className="text-center text-3xl font-bold mb-10">EXPERIENCE</h2>

      <div className="max-w-6xl mx-auto space-y-6">
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 py-4 border-b border-[#1a1a1f] last:border-b-0"
          >
            {/* top row: title (left) and dates (right) */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h3 className="text-lg md:text-xl font-semibold text-white flex items-center gap-3">
                {exp.title}
              </h3>

              <div className="text-sm text-green-400 font-medium">
                {exp.dates}
              </div>
            </div>

            {/* company/location/mode under the title */}
            <div className="text-sm text-gray-400">
              {exp.company} · {exp.location}
            </div>

            {/* description */}
            <p className="text-gray-300 mt-2 leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}