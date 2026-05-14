/* ============================================================
   FOOTER — Aesthetic Avenue
   Design: Warm Travertine Editorial
   ============================================================ */

const BOOKING_URL = "https://bookings.gettimely.com/aestheticavenuensw/bb/book";

export default function Footer() {
  return (
    <footer style={{ background: "var(--aa-espresso)", color: "var(--aa-parchment)" }} className="pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="aa-display text-3xl mb-4" style={{ color: "var(--aa-bronze-light)" }}>
              Aesthetic Avenue
            </h3>
            <p className="text-sm leading-relaxed opacity-70 max-w-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              A refined beauty destination in the heart of Narellan, where confidence, skin, and self-care come together.
            </p>
            <a
              href="https://www.instagram.com/aestheticavenuensw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 transition-opacity duration-200 hover:opacity-70"
              style={{ color: "var(--aa-bronze-light)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
              <span className="aa-label" style={{ fontSize: "0.7rem" }}>@aestheticavenuensw</span>
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="aa-label mb-5" style={{ color: "var(--aa-bronze)", fontSize: "0.65rem" }}>Navigate</p>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Home", href: "/" },
                { label: "Services & Pricing", href: "/services" },
                { label: "About Rachael", href: "/#about" },
                { label: "Contact", href: "/#contact" },
                { label: "Book Online", href: BOOKING_URL },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm opacity-60 hover:opacity-100 transition-opacity duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-parchment)" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="aa-label mb-5" style={{ color: "var(--aa-bronze)", fontSize: "0.65rem" }}>Find Us</p>
            <address className="not-italic flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 shrink-0 opacity-50" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="text-sm opacity-60 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  4 George Hunter Drive<br />Narellan NSW 2567
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="opacity-50 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
                <a
                  href="https://www.instagram.com/aestheticavenuensw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm opacity-60 hover:opacity-100 transition-opacity duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Instagram
                </a>
              </div>
            </address>
            <div className="mt-6">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="aa-btn" style={{ borderColor: "var(--aa-bronze-light)", color: "var(--aa-parchment)" }}>
                <span>Book Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="aa-rule" style={{ opacity: 0.15 }} />
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs opacity-30" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            © {new Date().getFullYear()} Aesthetic Avenue. All rights reserved.
          </p>
          <p className="text-xs opacity-30" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Narellan, NSW 2567
          </p>
        </div>
      </div>
    </footer>
  );
}
