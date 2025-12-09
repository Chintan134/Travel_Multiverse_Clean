import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.png";


const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-cloud">
      {/* FULL-WIDTH TOP BANNER */}
      <header className="w-full border-b border-beige/80 bg-[#0c0d0f]">
        <div className="w-full flex items-center justify-between px-4 md:px-10 py-3 md:py-4">
          {/* Logo on the LEFT */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-95 transition"
          >
          <Image
                src={logo}
                alt="Travel Multiverse logo"
                className="h-12 w-auto object-contain"
                priority
            />


            <span className="sr-only">Travel Multiverse</span>
          </Link>

          {/* Tagline on the RIGHT */}
          <div className="text-[0.70rem] md:text-xs tracking-[0.28em] uppercase text-slate-100 whitespace-nowrap text-right">
            MOOD-FIRST JOURNEYS ACROSS INFINITE WORLDS
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA (centered, constrained) */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 pt-4 md:pt-6 pb-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
