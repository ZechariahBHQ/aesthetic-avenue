/* ============================================================
   CONTACT PAGE — Aesthetic Avenue
   Design: Warm Travertine Editorial
   Purpose: Location, hours, booking CTA, Instagram, enquiry info
   ============================================================ */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BOOKING_URL = "https://bookings.gettimely.com/aestheticavenuensw/bb/book";

const IMGS = {
  hero: "/manus-storage/treatment_3289ebb4.webp",
  wide: "/manus-storage/hero_04e23112.webp",
};

const hours = [
  { day: "Monday", time: "By appointment" },
  { day: "Tuesday", time: "By appointment" },
  { day: "Wednesday", time: "By appointment" },
  { day: "Thursday", time: "By appointment" },
  { day: "Friday", time: "By appointment" },
  { day: "Saturday", time: "By appointment" },
  { day: "Sunday", time: "Closed" },
];

export default function Contact() {
  return (
    <div className="min-h-screen" style={{ background: "var(--aa-parchment)" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-[55vh] min-h-[420px] max-h-[640px] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img
            src={IMGS.hero}
            alt="Aesthetic Avenue treatment room"
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(44,37,32,0.08) 0%, rgba(44,37,32,0.55) 70%, rgba(44,37,32,0.78) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 container pb-14 md:pb-20">
          <p className="aa-label mb-3" style={{ color: "var(--aa-bronze-light)", opacity: 0.9 }}>
            Get In Touch
          </p>
          <h1 className="aa-brand text-5xl sm:text-6xl md:text-7xl" style={{ color: "#FAF7F3" }}>
            Contact
          </h1>
        </div>
      </section>

      {/* ── MAIN CONTENT — booking + location + hours ── */}
      <section className="py-20 md:py-32" style={{ background: "var(--aa-parchment)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left — Book & Connect */}
            <div>
              <p className="aa-label mb-4" style={{ color: "var(--aa-bronze)" }}>Book Online</p>
              <div className="aa-rule mb-8 w-12" style={{ opacity: 1, background: "var(--aa-bronze)" }} />
              <h2 className="aa-display text-4xl md:text-5xl mb-8" style={{ color: "var(--aa-espresso)" }}>
                Ready to visit
                <br />
                <em>the studio?</em>
              </h2>
              <p className="text-base leading-relaxed mb-10" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-espresso-mid)", fontWeight: 300 }}>
                All appointments are booked online through our booking system. Select your service, choose a time that suits you, and we'll take care of the rest. If you have any questions before booking, feel free to reach out via Instagram.
              </p>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="aa-btn-filled inline-block mb-12"
              >
                Book Your Appointment
              </a>

              <div className="aa-rule mb-8" style={{ opacity: 0.3 }} />

              {/* Instagram */}
              <p className="aa-label mb-4" style={{ color: "var(--aa-bronze)" }}>Follow & Connect</p>
              <a
                href="https://www.instagram.com/aestheticavenuensw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center"
                  style={{ border: "1px solid rgba(184,154,122,0.4)", borderRadius: "2px" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--aa-bronze)" }}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                </div>
                <div>
                  <p className="aa-title text-base" style={{ color: "var(--aa-espresso)" }}>@aestheticavenuensw</p>
                  <p className="text-xs mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-text-muted)", fontWeight: 300 }}>Follow us on Instagram</p>
                </div>
              </a>
            </div>

            {/* Right — Location + Hours */}
            <div>
              <p className="aa-label mb-4" style={{ color: "var(--aa-bronze)" }}>Find Us</p>
              <div className="aa-rule mb-8 w-12" style={{ opacity: 1, background: "var(--aa-bronze)" }} />

              {/* Address */}
              <div className="mb-10">
                <h3 className="aa-title text-xl mb-4" style={{ color: "var(--aa-espresso)" }}>Studio Address</h3>
                <p className="text-base leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-espresso-mid)", fontWeight: 300 }}>
                  4 George Hunter Drive<br />
                  Narellan NSW 2567<br />
                  Australia
                </p>
                <a
                  href="https://maps.google.com/?q=4+George+Hunter+Drive+Narellan+NSW+2567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 aa-label hover:opacity-70 transition-opacity"
                  style={{ color: "var(--aa-bronze)" }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  Get Directions
                </a>
              </div>

              <div className="aa-rule mb-8" style={{ opacity: 0.3 }} />

              {/* Hours */}
              <div>
                <h3 className="aa-title text-xl mb-6" style={{ color: "var(--aa-espresso)" }}>Hours</h3>
                <div className="flex flex-col gap-3">
                  {hours.map((h) => (
                    <div
                      key={h.day}
                      className="flex justify-between items-center pb-3"
                      style={{ borderBottom: "1px solid rgba(184,154,122,0.15)" }}
                    >
                      <span className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-espresso)", fontWeight: 400 }}>
                        {h.day}
                      </span>
                      <span className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: h.time === "Closed" ? "var(--aa-text-muted)" : "var(--aa-espresso-mid)", fontWeight: 300 }}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-4" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-text-muted)", fontWeight: 300 }}>
                  Hours may vary on public holidays. Book online to confirm availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STUDIO IMAGE — visual break before footer ── */}
      <section className="h-72 md:h-96 overflow-hidden">
        <img
          src={IMGS.wide}
          alt="Aesthetic Avenue studio interior"
          className="w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
          width="1280"
          height="384"
        />
      </section>

      <Footer />
    </div>
  );
}
