/* ============================================================
   HOME PAGE — Aesthetic Avenue
   Design: Warm Travertine Editorial
   Section map:
     1. HERO         — studio wide shot, tagline, Book CTA
     2. ABOUT        — Rachael's story, 2 portrait photos, View Services CTA
     3. SERVICES     — clean service tile grid, link to full menu
     4. CLOSING CTA  — address + Instagram, no duplicate booking button
   ============================================================ */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BOOKING_URL = "https://bookings.gettimely.com/aestheticavenuensw/bb/book";

const IMGS = {
  hero: "/manus-storage/hero_04e23112.webp",
  flowers: "/manus-storage/flowers_4d758b46.webp",
  reception2: "/manus-storage/reception2_de75b9b0.webp",
  products: "/manus-storage/products_fc4f20ab.webp",
  treatment: "/manus-storage/treatment_3289ebb4.webp",
};

const serviceHighlights = [
  { title: "Brows", desc: "Shaped and tailored to enhance your natural features.", href: "/services#brows" },
  { title: "Lashes", desc: "Lash services that elevate your everyday look.", href: "/services#lashes" },
  { title: "Facial Waxing", desc: "Professional waxing designed for comfort and precision.", href: "/services#waxing" },
  { title: "Facials", desc: "Customised treatments focused on hydration and glow.", href: "/services#facials" },
  { title: "HydraFacial", desc: "Deep cleansing and rejuvenation for instantly refreshed skin.", href: "/services#hydrafacial" },
  { title: "Herbal Peels", desc: "Advanced plant-based peels targeting texture and pigmentation.", href: "/services#peels" },
  { title: "Dermapen Needling", desc: "Collagen-stimulating treatments for texture, scarring, and vitality.", href: "/services#needling" },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "var(--aa-parchment)" }}>
      <Navbar />

      {/* ── 1. HERO ── */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img
            src={IMGS.hero}
            alt="Aesthetic Avenue studio interior"
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(44,37,32,0.05) 0%, rgba(44,37,32,0.05) 40%, rgba(44,37,32,0.6) 75%, rgba(44,37,32,0.82) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 container pb-16 md:pb-24">
          <div className="max-w-2xl">
            <p className="aa-label mb-4" style={{ color: "var(--aa-bronze-light)", opacity: 0.9 }}>
              Narellan, NSW
            </p>
            <h1 className="aa-brand text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6" style={{ color: "#FAF7F3" }}>
              Aesthetic Avenue
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed mb-8 max-w-md"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(250,247,243,0.8)", fontWeight: 300 }}
            >
              A refined beauty destination where confidence, skin, and self-care come together.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="aa-btn-filled">
              Book Your Appointment
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. ABOUT — Rachael's story, two portrait photos ── */}
      <section id="about" className="py-20 md:py-32" style={{ background: "var(--aa-parchment)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p className="aa-label mb-4" style={{ color: "var(--aa-bronze)" }}>About</p>
              <div className="aa-rule mb-8 w-12" style={{ opacity: 1, background: "var(--aa-bronze)" }} />
              <h2 className="aa-display text-4xl md:text-5xl lg:text-6xl mb-8" style={{ color: "var(--aa-espresso)" }}>
                Where beauty meets
                <br />
                <em>intention</em>
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-espresso-mid)", fontWeight: 300 }}>
                Founded by Rachael, Aesthetic Avenue was created to offer a personalised experience that goes beyond beauty treatments. Every service is designed with intention — helping you look and feel your absolute best in a calm, elevated environment.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-espresso-mid)", fontWeight: 300 }}>
                From glowing skin treatments to perfectly sculpted brows and lashes, Aesthetic Avenue combines results-driven care with a luxury experience tailored to you.
              </p>
              <a href="/about" className="aa-btn"><span>Our Story</span></a>
            </div>

            {/* Two portrait photos — unique to this section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden" style={{ borderRadius: "2px" }}>
                <img
                  src={IMGS.reception2}
                  alt="Aesthetic Avenue reception"
                  className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="288"
                />
              </div>
              <div className="overflow-hidden mt-10" style={{ borderRadius: "2px" }}>
                <img
                  src={IMGS.flowers}
                  alt="Studio flowers"
                  className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="288"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SERVICES — tile grid only, link to full menu ── */}
      <section id="services" className="py-20 md:py-28" style={{ background: "var(--aa-travertine)" }}>
        <div className="container">
          <div className="mb-14">
            <p className="aa-label mb-3" style={{ color: "var(--aa-bronze)" }}>What We Offer</p>
            <h2 className="aa-display text-4xl md:text-5xl" style={{ color: "var(--aa-espresso)" }}>
              Our <em>Services</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px" style={{ background: "rgba(184,154,122,0.15)" }}>
            {serviceHighlights.map((service) => (
              <a
                key={service.title}
                href={service.href}
                className="block p-8 transition-colors duration-200"
                style={{ background: "var(--aa-travertine)", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--aa-parchment)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--aa-travertine)")}
              >
                <span className="block mb-3 text-xs" style={{ color: "var(--aa-bronze)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}>✦</span>
                <h3 className="aa-title text-xl mb-2" style={{ color: "var(--aa-espresso)" }}>{service.title}</h3>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-text-muted)", fontWeight: 300 }}>
                  {service.desc}
                </p>
                <div className="mt-5 flex items-center gap-2">
                  <span className="aa-label" style={{ color: "var(--aa-bronze)", fontSize: "0.65rem" }}>View pricing</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--aa-bronze)" }}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <a href="/services" className="aa-btn-filled"><span>Full Service Menu & Pricing</span></a>
          </div>
        </div>
      </section>

      {/* ── 4. CLOSING CTA — teaser for contact page ── */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: "var(--aa-espresso)" }}>
        <div className="absolute inset-0">
          <img
            src={IMGS.treatment}
            alt="Treatment room"
            className="w-full h-full object-cover opacity-15"
            loading="lazy"
            decoding="async"
            width="1280"
            height="600"
          />
          <div className="absolute inset-0" style={{ background: "rgba(44,37,32,0.72)" }} />
        </div>

        <div className="relative z-10 container">
          <div className="max-w-xl">
            <p className="aa-label mb-4" style={{ color: "var(--aa-bronze-light)" }}>Find Us</p>
            <h2 className="aa-display text-4xl md:text-5xl mb-8" style={{ color: "#FAF7F3" }}>
              Come and visit
              <br />
              <em>the studio</em>
            </h2>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <svg className="mt-1 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--aa-bronze-light)", opacity: 0.7 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(250,247,243,0.85)", fontWeight: 300 }}>
                    4 George Hunter Drive
                  </p>
                  <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(250,247,243,0.85)", fontWeight: 300 }}>
                    Narellan NSW 2567
                  </p>
                </div>
              </div>

              <a
                href="https://www.instagram.com/aestheticavenuensw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--aa-bronze-light)", opacity: 0.7 }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
                <span className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(250,247,243,0.85)", fontWeight: 300 }}>
                  @aestheticavenuensw
                </span>
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="aa-btn-filled"
              >
                Book Your Appointment
              </a>
              <a
                href="/contact"
                className="aa-btn"
                style={{ borderColor: "rgba(250,247,243,0.4)", color: "#FAF7F3" }}
              >
                <span>Find the Studio</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
