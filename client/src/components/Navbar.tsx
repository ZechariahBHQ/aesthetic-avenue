/* ============================================================
   NAVBAR — Aesthetic Avenue
   Design: Warm Travertine Editorial
   Sticky, transparent-to-solid on scroll, mobile drawer
   ============================================================ */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const BOOKING_URL = "https://bookings.gettimely.com/aestheticavenuensw/bb/book";
const LOGO_LIGHT = "/manus-storage/aa_logo_light_d35bc082.webp";
const LOGO_WHITE = "/manus-storage/aa_logo_white_e8381974.webp";
// Preload both logos to avoid flash on scroll
const _preloadLight = new Image(); _preloadLight.src = LOGO_LIGHT;
const _preloadWhite = new Image(); _preloadWhite.src = LOGO_WHITE;

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#F5F0EA]/95 backdrop-blur-sm shadow-[0_1px_0_rgba(184,154,122,0.2)]"
            : isHome ? "bg-transparent" : "bg-[#F5F0EA]/95 backdrop-blur-sm shadow-[0_1px_0_rgba(184,154,122,0.2)]"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src={(!scrolled && isHome) ? LOGO_WHITE : LOGO_LIGHT}
              alt="Aesthetic Avenue"
              className="h-8 md:h-10 w-auto object-contain transition-opacity duration-300"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="aa-nav-link"
                style={{ color: (!scrolled && isHome) ? "rgba(250,247,243,0.9)" : "var(--aa-espresso)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://www.instagram.com/aestheticavenuensw"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity duration-200"
              style={{ color: (!scrolled && isHome) ? "rgba(250,247,243,0.9)" : "var(--aa-espresso)" }}
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="aa-btn"
              style={(!scrolled && isHome) ? { borderColor: "rgba(250,247,243,0.5)", color: "rgba(250,247,243,0.9)" } : {}}
            >
              <span>Book Now</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px bg-[var(--aa-espresso)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-[var(--aa-espresso)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-[var(--aa-espresso)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-400 ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[var(--aa-espresso)] transition-opacity duration-400 ${
            menuOpen ? "opacity-40" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 bg-[var(--aa-parchment)] flex flex-col pt-20 pb-8 px-8 transition-transform duration-400 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ background: "var(--aa-parchment)" }}
        >
          <div className="aa-rule mb-8" />
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="aa-title text-2xl text-[var(--aa-espresso)]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="aa-rule my-8" />
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="aa-btn-filled text-center justify-center"
          >
            Book Now
          </a>
          <a
            href="https://www.instagram.com/aestheticavenuensw"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center gap-2 aa-label text-[var(--aa-bronze)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
            @aestheticavenuensw
          </a>
        </div>
      </div>
    </>
  );
}
