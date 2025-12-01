import Image from "next/image";
import fs from "fs";
import path from "path";
import Certifications from "./components/Certifications";
import Navbar from "./components/Navbar";
import Experience from "./components/Experience";
import LatestBlogs from "./components/LatestBlogs";
import Contact from "./components/Contact";

// read cert files from public/certifs at build time
const certsDir = path.join(process.cwd(), "public", "certifs");
const certFiles = fs.existsSync(certsDir)
  ? fs.readdirSync(certsDir).filter((f) => /\.(png|jpe?g|svg|webp)$/i.test(f))
  : [];

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="scroll-smooth bg-[#0e0e11] text-white min-h-screen px-4 md:px-10">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="scroll-mt-20 md:scroll-mt-24 px-10 py-20 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-lg">
          <h1 className="text-5xl font-extrabold flex items-baseline gap-3 mb-2">
            Hello, I’m Ayoub
          </h1>
          <h2 className="text-green-400 text-3xl mb-4">
            Servicenow Technical Consultant
          </h2>
          <p className="text-gray-300 mb-8">
            A <strong>Certified ServiceNow Technical Consultant & Developer</strong> with solid experience designing and implementing custom workflows, scalable applications, and integrated solutions that elevate client and employee experiences.
          </p>
          <div className="flex gap-4">  
            <button className="bg-green-500 px-6 py-3 rounded-full text-black font-semibold hover:bg-green-400 cursor-pointer">
              Contact
            </button>
            <button className="bg-green-500 px-6 py-3 rounded-full text-black font-semibold hover:bg-green-400 cursor-pointer">
              See Resume
            </button>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative mt-10 md:mt-0">
          <div className="bg-green-500 w-64 h-64 rounded-full absolute -z-10 top-6 left-6 blur-sm opacity-80" />
          <img
            src="portfolio-img.png"
            alt="Profile"
            className="rounded-xl object-cover shadow-lg"
          />
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <Certifications certFiles={certFiles} />

      {/* EXPERIENCE */}
      <Experience />

      {/* LATEST BLOGS */}
      <LatestBlogs />

      {/* CONTACT */}
      <Contact />

      {/* FOOTER */}
      <footer className="mt-20 border-t border-[#1a1a1f]">
        <div className="max-w-6xl mx-auto py-8 px-4 md:px-10 text-center text-sm text-gray-400">
          © {currentYear} | Ayoub El Ayouk
        </div>
      </footer>
    </main>
  );
}
