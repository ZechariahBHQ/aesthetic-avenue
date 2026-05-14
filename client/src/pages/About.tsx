/* ============================================================
   ABOUT PAGE — Aesthetic Avenue
   Design: Warm Travertine Editorial
   Purpose: Rachael's story, brand values, studio imagery, trust signals
   ============================================================ */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BOOKING_URL = "https://bookings.gettimely.com/aestheticavenuensw/bb/book";

const IMGS = {
  hero: "/manus-storage/reception2_de75b9b0.webp",
  flowers: "/manus-storage/flowers_4d758b46.webp",
  products: "/manus-storage/products_fc4f20ab.webp",
  studio: "/manus-storage/studio_flowers2_b92aae29.webp",
};

const values = [
  {
    title: "Results-Driven",
    desc: "Every treatment is selected and tailored to deliver visible, lasting results — not just a relaxing hour.",
  },
  {
    title: "Personalised Care",
    desc: "No two skins are the same. Your experience at Aesthetic Avenue is built around your unique concerns and goals.",
  },
  {
    title: "Elevated Experience",
    desc: "From the moment you walk in, every detail is designed to make you feel welcomed, indulged, and at ease.",
  },
  {
    title: "Ongoing Education",
    desc: "We stay at the forefront of advanced skin science so you always receive the most effective treatments available.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: "var(--aa-parchment)" }}>
      <Navbar />

      {/* ── HERO — editorial header with studio image ── */}
      <section className="relative h-[55vh] min-h-[420px] max-h-[640px] overflow-hidden flex items-end">
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
                "linear-gradient(to bottom, rgba(44,37,32,0.08) 0%, rgba(44,37,32,0.55) 70%, rgba(44,37,32,0.78) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 container pb-14 md:pb-20">
          <p className="aa-label mb-3" style={{ color: "var(--aa-bronze-light)", opacity: 0.9 }}>
            Our Story
          </p>
          <h1 className="aa-brand text-5xl sm:text-6xl md:text-7xl" style={{ color: "#FAF7F3" }}>
            About
          </h1>
        </div>
      </section>

      {/* ── STORY — Rachael's background and brand mission ── */}
      <section className="py-20 md:py-32" style={{ background: "var(--aa-parchment)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Text */}
            <div className="lg:sticky lg:top-32">
              <p className="aa-label mb-4" style={{ color: "var(--aa-bronze)" }}>Founded with purpose</p>
              <div className="aa-rule mb-8 w-12" style={{ opacity: 1, background: "var(--aa-bronze)" }} />
              <h2 className="aa-display text-4xl md:text-5xl mb-8" style={{ color: "var(--aa-espresso)" }}>
                Beauty with a
                <br />
                <em>passion for results</em>
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-espresso-mid)", fontWeight: 300 }}>
                Aesthetic Avenue was born from a genuine passion for skin health and a belief that everyone deserves to feel confident in their own skin. Founded by Rachael, the clinic was built around one core idea — that beauty treatments should do more than look good in the moment. They should create real, lasting change.
              </p>
              <p className="text-base leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-espresso-mid)", fontWeight: 300 }}>
                With a focus on results-driven skin treatments and a commitment to personalised care, Aesthetic Avenue has become a trusted destination for clients who are serious about investing in their skin health. Every service is thoughtfully curated, every client individually assessed.
              </p>
              <p className="text-base leading-relaxed mb-10" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-espresso-mid)", fontWeight: 300 }}>
                The studio itself was designed to feel like a retreat — warm, calm, and elevated. Because the experience you have here should feel as good as the results you leave with.
              </p>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="aa-btn-filled">
                Book Your Appointment
              </a>
            </div>

            {/* Images */}
            <div className="flex flex-col gap-6">
              <div className="overflow-hidden" style={{ borderRadius: "2px" }}>
                <img
                  src={IMGS.flowers}
                  alt="Aesthetic Avenue studio flowers"
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="320"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden" style={{ borderRadius: "2px" }}>
                  <img
                    src={IMGS.products}
                    alt="Aesthetic Avenue skincare products"
                    className="w-full h-52 object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                    width="300"
                    height="208"
                  />
                </div>
                <div className="overflow-hidden" style={{ borderRadius: "2px" }}>
                  <img
                    src={IMGS.studio}
                    alt="Aesthetic Avenue studio detail"
                    className="w-full h-52 object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                    width="300"
                    height="208"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES — 4 brand pillars ── */}
      <section className="py-20 md:py-28" style={{ background: "var(--aa-travertine)" }}>
        <div className="container">
          <div className="mb-14">
            <p className="aa-label mb-3" style={{ color: "var(--aa-bronze)" }}>What We Stand For</p>
            <h2 className="aa-display text-4xl md:text-5xl" style={{ color: "var(--aa-espresso)" }}>
              Our <em>values</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "rgba(184,154,122,0.15)" }}>
            {values.map((v) => (
              <div
                key={v.title}
                className="p-10"
                style={{ background: "var(--aa-travertine)" }}
              >
                <div className="aa-rule mb-6 w-8" style={{ opacity: 1, background: "var(--aa-bronze)" }} />
                <h3 className="aa-title text-xl mb-3" style={{ color: "var(--aa-espresso)" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-text-muted)", fontWeight: 300 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20" style={{ background: "var(--aa-espresso)" }}>
        <div className="container text-center">
          <h2 className="aa-display text-3xl md:text-4xl mb-6" style={{ color: "#FAF7F3" }}>
            Ready to start your <em>skin journey?</em>
          </h2>
          <p className="text-sm mb-8 max-w-md mx-auto" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(250,247,243,0.7)", fontWeight: 300 }}>
            Book a consultation or treatment online — we'd love to welcome you to the studio.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="aa-btn" style={{ borderColor: "rgba(250,247,243,0.4)", color: "#FAF7F3" }}>
            <span>Book Your Appointment</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
