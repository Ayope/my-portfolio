import fs from "fs";
import path from "path";
import Certifications from "./components/Certifications";
import Navbar from "./components/Navbar";
import Experience from "./components/Experience";
import LatestBlogs from "./components/LatestBlogs";
import Contact from "./components/Contact";
import Hero from "./components/Hero";

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
      <Hero />

      {/* CERTIFICATIONS */}
      <Certifications certFiles={certFiles} />

      {/* EXPERIENCE */}
      <Experience />

      {/* LATEST BLOGS */}
      {/* <LatestBlogs /> */}

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
