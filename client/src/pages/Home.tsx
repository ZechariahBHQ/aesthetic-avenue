/* ============================================================
   HOME PAGE — Aesthetic Avenue
   Design: Warm Travertine Editorial
   Clean instant load — no scroll delays
   ============================================================ */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BOOKING_URL = "https://bookings.gettimely.com/aestheticavenuensw/bb/book";

const IMGS = {
  hero: "/manus-storage/hero_04e23112.webp",
  flowers: "/manus-storage/flowers_4d758b46.webp",
  reception: "/manus-storage/reception_b76bc51a.webp",
  reception2: "/manus-storage/reception2_de75b9b0.webp",
  products: "/manus-storage/products_fc4f20ab.webp",
  treatment: "/manus-storage/treatment_3289ebb4.webp",
};

const serviceHighlights = [
  { title: "Brows", desc: "Perfectly shaped and tailored to enhance your natural features." },
  { title: "Lashes", desc: "Effortless beauty with lash services that elevate your everyday look." },
  { title: "Waxing", desc: "Smooth, professional waxing services designed for comfort and precision." },
  { title: "Facials", desc: "Customised facial treatments focused on hydration, skin health, and glow." },
  { title: "HydraFacial", desc: "Deep cleansing, hydration, and rejuvenation for instantly refreshed skin." },
  { title: "Peels", desc: "Advanced skin treatments designed to target texture, pigmentation, and dullness." },
  { title: "Dermapen Needling", desc: "Collagen-stimulating treatments to improve skin texture, scarring, and quality." },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "var(--aa-parchment)" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img
            src={IMGS.hero}
            alt="Aesthetic Avenue studio"
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(44,37,32,0.1) 0%, rgba(44,37,32,0.05) 40%, rgba(44,37,32,0.65) 80%, rgba(44,37,32,0.85) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 container pb-16 md:pb-24">
          <div className="max-w-2xl">
            <p className="aa-label mb-4" style={{ color: "var(--aa-bronze-light)", opacity: 0.9 }}>
              Narellan, NSW
            </p>
            <h1 className="aa-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6" style={{ color: "#FAF7F3" }}>
              Aesthetic
              <br />
              <em>Avenue</em>
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed mb-8 max-w-md"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(250,247,243,0.8)", fontWeight: 300 }}
            >
              A refined beauty destination where confidence, skin, and self-care come together.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="aa-btn-filled">
                Book Your Appointment
              </a>
              <a href="/services" className="aa-btn" style={{ borderColor: "rgba(250,247,243,0.5)", color: "#FAF7F3" }}>
                <span>View Services</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WELCOME ── */}
      <section className="py-20 md:py-32" style={{ background: "var(--aa-parchment)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="aa-label mb-4" style={{ color: "var(--aa-bronze)" }}>Welcome</p>
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
              <a href="/services" className="aa-btn"><span>Explore Services</span></a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden" style={{ borderRadius: "2px" }}>
                <img src={IMGS.reception2} alt="Aesthetic Avenue reception" className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" width="600" height="256" />
              </div>
              <div className="overflow-hidden mt-8" style={{ borderRadius: "2px" }}>
                <img src={IMGS.flowers} alt="Studio flowers" className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" width="600" height="256" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section id="services" className="py-20 md:py-28" style={{ background: "var(--aa-travertine)" }}>
        <div className="container">
          <div className="text-center mb-16">
            <p className="aa-label mb-3" style={{ color: "var(--aa-bronze)" }}>What We Offer</p>
            <h2 className="aa-display text-4xl md:text-5xl" style={{ color: "var(--aa-espresso)" }}>
              Our <em>Services</em>
            </h2>
            <p className="mt-4 text-sm max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-text-muted)", fontWeight: 300 }}>
              Every treatment is thoughtfully tailored to your individual skin and beauty needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {serviceHighlights.map((service) => (
              <a
                key={service.title}
                href="/services"
                className="aa-service-card block"
                style={{ textDecoration: "none" }}
              >
                <span className="block mb-3 text-xs" style={{ color: "var(--aa-bronze)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}>✦</span>
                <h3 className="aa-title text-xl mb-2" style={{ color: "var(--aa-espresso)" }}>{service.title}</h3>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-text-muted)", fontWeight: 300 }}>
                  {service.desc}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="aa-label" style={{ color: "var(--aa-bronze)", fontSize: "0.65rem" }}>View pricing</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--aa-bronze)" }}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
            ))}

            {/* Book CTA card */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-8 flex flex-col items-start justify-between"
              style={{ background: "var(--aa-espresso)", textDecoration: "none" }}
            >
              <div>
                <p className="aa-label mb-3" style={{ color: "var(--aa-bronze-light)", fontSize: "0.65rem" }}>Ready to begin?</p>
                <h3 className="aa-title text-2xl" style={{ color: "var(--aa-parchment)" }}>Book your appointment</h3>
              </div>
              <div className="mt-8 flex items-center gap-2">
                <span className="aa-label" style={{ color: "var(--aa-bronze-light)", fontSize: "0.65rem" }}>Book online</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--aa-bronze-light)" }}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </a>
          </div>

          <div className="text-center mt-12">
            <a href="/services" className="aa-btn"><span>Full Service Menu & Pricing</span></a>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 md:py-32" style={{ background: "var(--aa-parchment)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="overflow-hidden" style={{ borderRadius: "2px" }}>
                <img src={IMGS.reception} alt="Aesthetic Avenue studio interior" className="w-full h-[500px] object-cover" loading="lazy" decoding="async" width="800" height="500" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 overflow-hidden hidden md:block" style={{ borderRadius: "2px" }}>
                <img src={IMGS.products} alt="Skincare products" className="w-full h-full object-cover" loading="lazy" decoding="async" width="160" height="160" />
              </div>
            </div>

            <div className="lg:pl-8">
              <p className="aa-label mb-4" style={{ color: "var(--aa-bronze)" }}>About</p>
              <div className="aa-rule mb-8 w-12" style={{ opacity: 1, background: "var(--aa-bronze)" }} />
              <h2 className="aa-display text-4xl md:text-5xl mb-8" style={{ color: "var(--aa-espresso)" }}>
                More than just
                <br />
                <em>a clinic</em>
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-espresso-mid)", fontWeight: 300 }}>
                At Aesthetic Avenue, every detail has been thoughtfully created to deliver a welcoming and results-focused experience.
              </p>
              <p className="text-base leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-espresso-mid)", fontWeight: 300 }}>
                Whether you're visiting for maintenance, relaxation, or a complete skin refresh, our goal is simple — real results, personalised care, and a space where you can truly unwind.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-espresso-mid)", fontWeight: 300 }}>
                This is your new go-to destination in Narellan for refined beauty and advanced skin treatments.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[{ num: "8+", label: "Services" }, { num: "100%", label: "Personalised" }, { num: "Narellan", label: "NSW" }].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="aa-display text-2xl md:text-3xl" style={{ color: "var(--aa-bronze)" }}>{stat.num}</p>
                    <p className="aa-label mt-1" style={{ color: "var(--aa-text-muted)", fontSize: "0.6rem" }}>{stat.label}</p>
                  </div>
                ))}
              </div>

              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="aa-btn-filled">Book Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section id="contact" className="relative py-24 md:py-36 overflow-hidden" style={{ background: "var(--aa-espresso)" }}>
        <div className="absolute inset-0">
          <img src={IMGS.treatment} alt="Treatment room" className="w-full h-full object-cover opacity-20" loading="lazy" decoding="async" width="1280" height="600" />
          <div className="absolute inset-0" style={{ background: "rgba(44,37,32,0.7)" }} />
        </div>

        <div className="relative z-10 container text-center">
          <p className="aa-label mb-4" style={{ color: "var(--aa-bronze-light)" }}>Your skin journey starts here</p>
          <h2 className="aa-display text-4xl md:text-6xl lg:text-7xl mb-6" style={{ color: "#FAF7F3" }}>
            Ready to feel
            <br />
            <em>your best?</em>
          </h2>
          <p className="text-base max-w-md mx-auto mb-10" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(250,247,243,0.7)", fontWeight: 300 }}>
            Book your appointment at Aesthetic Avenue and experience the difference of truly personalised care.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="aa-btn-filled">Book Your Appointment</a>
            <a
              href="https://www.instagram.com/aestheticavenuensw"
              target="_blank"
              rel="noopener noreferrer"
              className="aa-btn"
              style={{ borderColor: "rgba(250,247,243,0.4)", color: "#FAF7F3" }}
            >
              <span>Follow on Instagram</span>
            </a>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--aa-bronze-light)", opacity: 0.7 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(250,247,243,0.6)", fontWeight: 300 }}>
                4 George Hunter Drive, Narellan NSW 2567
              </span>
            </div>
            <div className="hidden sm:block w-px h-4" style={{ background: "rgba(250,247,243,0.2)" }} />
            <a
              href="https://www.instagram.com/aestheticavenuensw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:opacity-100 transition-opacity"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(250,247,243,0.6)", fontWeight: 300 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
              @aestheticavenuensw
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
