import React from "react";

type ExperienceItem = {
  dates: string;
  title: string;
  company: string;
  companyLink: string;
  location: string;
  description: string;
  startDate: Date;
  endDate?: Date;
};

// Helper: calculate duration between two dates
function calculateDuration(start: Date, end: Date = new Date()): string {
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Approximate months (average 30.44 days per month)
  const totalMonths = diffDays / 30.44;
  const years = Math.floor(totalMonths / 12);
  const remainingMonths = Math.round(totalMonths % 12);

  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
  }
  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  }
  return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
}

// Helper: format date range with duration
function formatDateRange(start: Date, end?: Date): string {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" };
  const startStr = start.toLocaleDateString("en-US", options);
  const endStr = end ? end.toLocaleDateString("en-US", options) : "Today";
  const duration = calculateDuration(start, end);
  return `${startStr} - ${endStr} · ${duration}`;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    dates: formatDateRange(new Date("2024-02-01")), // Feb 2024 - today
    title: "ServiceNow Technical Consultant",
    company: "UX4MATION",
    companyLink: "https://www.linkedin.com/company/ux4mation/",
    location: "Morocco · Hybrid",
    description:
      "Design and implement custom ServiceNow workflows, scalable applications, and seamless integrations to improve operational efficiency and customer/employee experiences. Key areas: ServiceNow Administration, ITSM, CSM, and Application Development.",
    startDate: new Date("2024-02-01"),
  },
  {
    dates: formatDateRange(new Date("2022-09-01"), new Date("2024-03-31")), // Sept 2022 - Mar 2024
    title: "Web & Mobile Developer Apprentice",
    company: "YouCode Maroc",
    companyLink: "https://www.linkedin.com/company/youcode-maroc/",
    location: "Youssoufia, Marrakech-Safi · On-site",
    description:
      "Full-stack and mobile development training with hands-on projects. Worked with Scrum methodology, focused on frontend/backend integration, responsive UI design, and collaborative development practices.",
    startDate: new Date("2022-09-01"),
    endDate: new Date("2024-03-31"),
  },
  {
    dates: formatDateRange(new Date("2023-05-01"), new Date("2023-06-30")), // May 2023 - Jun 2023
    title: "Full Stack Developer",
    company: "FOODEALS",
    companyLink: "https://www.linkedin.com/company/foodeals/",
    location: "Fès, Fès-Meknès · On-site",
    description:
      "Contributed to a web application reducing food waste by connecting restaurants and supermarkets with citizens. Implemented features across the full stack, improved user experience, and collaborated with the team on product development.",
    startDate: new Date("2023-05-01"),
    endDate: new Date("2023-06-30"),
  },
];

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 md:scroll-mt-24 px-10 mt-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">EXPERIENCE</h2>
        <p className="text-sm text-green-400 tracking-wide">
          Here is what I experienced !
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 py-4 border-b border-[#8f8f92] last:border-b-0"
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

            {/* company/location/mode under the title - company is now a link */}
            <div className="text-sm text-gray-400">
              <a
                href={exp.companyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 max-sm:text-gray-200 transition-colors cursor-pointer"
              >
                {exp.company}
              </a>
              {" · "}
              {exp.location}
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