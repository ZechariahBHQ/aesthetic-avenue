/* ============================================================
   SERVICES PAGE — Aesthetic Avenue
   Design: Warm Travertine Editorial
   Full service menu with pricing from Timely booking system
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BOOKING_URL = "https://bookings.gettimely.com/aestheticavenuensw/bb/book";

interface Service {
  name: string;
  duration: string;
  price: string;
  description?: string;
  highlight?: boolean;
}

interface Category {
  id: string;
  name: string;
  tagline: string;
  services: Service[];
  image?: string;
}

const IMGS = {
  reception: "/manus-storage/reception_b76bc51a.webp",
  reception2: "/manus-storage/reception2_de75b9b0.webp",
  flowers: "/manus-storage/studio_flowers2_b92aae29.webp",
  products: "/manus-storage/products_fc4f20ab.webp",
  treatment: "/manus-storage/treatment_3289ebb4.webp",
  wide: "/manus-storage/hero_04e23112.webp",
};

const categories: Category[] = [
  {
    id: "brows",
    name: "Brows",
    tagline: "Perfectly shaped and tailored to enhance your natural features.",
    image: IMGS.reception2,
    services: [
      { name: "Brow Shape", duration: "20 mins", price: "$45", description: "Includes a standard eyebrow wax." },
      { name: "Brow Shape & Tint", duration: "45 mins", price: "$70", description: "Includes an eyebrow wax & tint application." },
      { name: "Brow Shape & Stain", duration: "45 mins", price: "$85", description: "Includes an eyebrow wax & stain application. Our hybrid stain can last up to 4–6 weeks on the hair and 1–2 weeks on the skin.", highlight: true },
      { name: "Brow Lamination", duration: "45 mins", price: "$95", description: "Includes an eyebrow lamination only." },
      { name: "Brow Lamination + Shape & Stain", duration: "1 hour", price: "$125", description: "Includes an eyebrow lamination with a shape and your choice of stain or tint application.", highlight: true },
    ],
  },
  {
    id: "lashes",
    name: "Lashes",
    tagline: "Effortless beauty with lash services that elevate your everyday look.",
    image: IMGS.flowers,
    services: [
      { name: "Lash Tint", duration: "20 mins", price: "$30" },
      { name: "Lash Lift", duration: "40 mins", price: "$90", description: "Includes a lash lift only." },
      { name: "Lash Lift & Tint", duration: "45 mins", price: "$115", highlight: true },
    ],
  },
  {
    id: "waxing",
    name: "Facial Waxing",
    tagline: "Smooth, professional waxing services designed for comfort and precision.",
    image: IMGS.reception,
    services: [
      { name: "Lip Wax", duration: "10 mins", price: "$15" },
      { name: "Chin Wax", duration: "10 mins", price: "$15" },
      { name: "Sides of Face", duration: "15 mins", price: "$20" },
    ],
  },
  {
    id: "facials",
    name: "Standard Facials",
    tagline: "Customised facial treatments focused on hydration, skin health, and glow.",
    image: IMGS.treatment,
    services: [
      {
        name: "Express Refresh Facial",
        duration: "30 mins",
        price: "$169",
        description: "Our 30-minute facial is the ultimate skin refresh — designed for those seeking visible results in minimal time. Thoughtfully tailored to your individual skin concerns, this revitalising treatment delivers a moment of relaxation while restoring your skin's natural glow. Includes a double cleanse, gentle exfoliation, customised treatment mask, and finishing products.",
      },
      {
        name: "Enzyme Facial",
        duration: "45 mins",
        price: "$189",
      },
      {
        name: "Signature Facial",
        duration: "1 hour",
        price: "$220",
        description: "Indulge in a results-driven luxury facial experience designed to restore radiance, elevate skin health, and promote deep relaxation. Combining advanced medical-grade skincare with a refined treatment experience, this comprehensive facial leaves your skin visibly rejuvenated, luminous, and refreshed. Includes double cleanse, steam, exfoliation, facial/neck/décolletage massage, hydrating mask, scalp massage, and finishing products.",
        highlight: true,
      },
    ],
  },
  {
    id: "addons",
    name: "Facial Add-Ons",
    tagline: "Enhance your facial treatment for maximum results.",
    image: IMGS.products,
    services: [
      {
        name: "LED Light Therapy Add-On",
        duration: "25 mins",
        price: "$45",
        description: "LED light therapy is the perfect addition to any facial service to maximise results.",
      },
    ],
  },
  {
    id: "hydrafacial",
    name: "HydraFacial",
    tagline: "Deep cleansing, hydration, and rejuvenation for instantly refreshed skin.",
    image: IMGS.wide,
    services: [
      {
        name: "Signature Hydrafacial",
        duration: "30 mins",
        price: "$239",
        description: "Reveal your most radiant skin with our Signature HydraFacial — a results-driven treatment designed to deeply cleanse, hydrate and rejuvenate the complexion in one luxurious experience. Using advanced vortex fusion technology, this multi-step facial gently exfoliates, removes impurities and infuses the skin with intensive hydrating and antioxidant-rich serums. Perfect for dullness, dehydration, congestion and uneven texture.",
      },
      {
        name: "Deluxe Hydrafacial",
        duration: "45 mins",
        price: "$299",
        description: "A step up from our Signature Hydrafacial treatment, the Deluxe Hydrafacial includes personalised booster infusion + LED light therapy.",
        highlight: true,
      },
      {
        name: "Platinum Hydrafacial",
        duration: "1 hour",
        price: "$349",
        description: "Includes lymphatic drainage, personalised booster infusion and LED light therapy.",
        highlight: true,
      },
    ],
  },
  {
    id: "peels",
    name: "Herbs2Peel Herbal Aktiv Peels",
    tagline: "Advanced skin treatments designed to target texture, pigmentation, and dullness.",
    image: IMGS.flowers,
    services: [
      {
        name: "Beauty Peel",
        duration: "30 mins",
        price: "$249",
        description: "Our entry level herbal peel treatment. An advanced plant-based corrective treatment designed to work in harmony with the skin's natural renewal and regeneration processes. Formulated with a pure botanical blend free from harsh chemicals — delivers powerful skin rejuvenation without toxic side effects. No harsh peeling or downtime.",
      },
      {
        name: "Phyto Peel",
        duration: "45 mins",
        price: "$299",
        description: "Our mid level herbal peel treatment. An advanced herbal skin revision treatment designed to stimulate the skin's natural renewal process from within. Ideal for acne, pigmentation, congestion, scarring, uneven texture, dullness and signs of ageing. Note: 3–5 day downtime period.",
        highlight: true,
      },
      {
        name: "Corrective Peel",
        duration: "1 hour",
        price: "$649",
        description: "Our highest level, most corrective Herbal Aktiv Peel. If you are new to this treatment please book a skin consultation before booking.",
        highlight: true,
      },
    ],
  },
  {
    id: "needling",
    name: "Dermapen Skin Needling",
    tagline: "Collagen-stimulating treatments designed to improve skin texture, scarring, and overall skin quality.",
    image: IMGS.treatment,
    services: [
      {
        name: "Signature Skin Needling",
        duration: "45 mins",
        price: "$299",
        description: "Reveal smoother, firmer, more radiant skin with our powerhouse skin rejuvenation treatment. Our advanced Dermapen 4 skin needling treatment creates precise micro-channels within the skin using ultra-fine needles, stimulating your skin's natural healing response, boosting collagen and elastin production. Ideal for improving skin texture, fine lines, acne scarring, pigmentation, and overall skin vitality. *New clients: please also book a skin consultation prior to your appointment.",
      },
      {
        name: "Advanced Skin Needling",
        duration: "45 mins",
        price: "$369",
        description: "Enhance our signature skin needling treatment with targeted meso-glide serum infusion.",
        highlight: true,
      },
      {
        name: "Platinum Skin Needling",
        duration: "45 mins",
        price: "$599",
        description: "The ultimate treatment in advanced skin correction and rejuvenation. Dermapen 4 skin needling elevated with the infusion of cutting-edge EXOSOME serum technology — a concentrated blend of growth factors, peptides, antioxidants and lipids for accelerated healing, enhanced cellular regeneration and intensive skin renewal.",
        highlight: true,
      },
      {
        name: "Course of 3 — Signature Skin Needling",
        duration: "3 sessions",
        price: "$805",
        description: "The perfect opportunity to bundle up your treatments and save. Ideal for those ready to commit to their skin journey. Please contact us directly after purchasing to schedule your treatments.",
      },
      {
        name: "Course of 6 — Signature Skin Needling",
        duration: "6 sessions",
        price: "$1,499",
        description: "The ultimate investment in your skin health journey. Please contact us directly after purchasing to schedule your treatments.",
        highlight: true,
      },
      {
        name: "Advanced Add-On — Uber Pro Peel",
        duration: "15 mins",
        price: "$59",
        description: "Enhance your skin needling treatment results with our Uber Pro Peel addition.",
      },
    ],
  },
];

function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const children = Array.from(e.target.querySelectorAll(".aa-fade-up"));
            children.forEach((child, i) => {
              setTimeout(() => child.classList.add("aa-visible"), i * 60);
            });
            if ((e.target as HTMLElement).classList.contains("aa-fade-up")) {
              (e.target as HTMLElement).classList.add("aa-visible");
            }
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    const children = el.querySelectorAll(".aa-fade-up");
    children.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);
  return ref;
}

function ServiceRow({ service }: { service: Service }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b"
      style={{ borderColor: "rgba(184,154,122,0.2)" }}
    >
      <button
        className="w-full text-left py-4 flex items-start justify-between gap-4 group"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="aa-title text-lg"
              style={{ color: "var(--aa-espresso)" }}
            >
              {service.name}
            </span>
            {service.highlight && (
              <span
                className="aa-label px-2 py-0.5"
                style={{
                  background: "var(--aa-bronze)",
                  color: "var(--aa-parchment)",
                  fontSize: "0.55rem",
                  borderRadius: "1px",
                }}
              >
                Popular
              </span>
            )}
          </div>
          <span
            className="text-xs mt-0.5 block"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-text-muted)", fontWeight: 300 }}
          >
            {service.duration}
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span
            className="aa-title text-xl"
            style={{ color: "var(--aa-bronze)" }}
          >
            {service.price}
          </span>
          {service.description && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 shrink-0"
              style={{
                color: "var(--aa-bronze)",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          )}
        </div>
      </button>
      {service.description && open && (
        <div
          className="pb-5 pr-8"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "var(--aa-text-muted)",
            fontSize: "0.875rem",
            lineHeight: "1.7",
            fontWeight: 300,
          }}
        >
          {service.description}
        </div>
      )}
    </div>
  );
}

function CategorySection({ cat, index }: { cat: Category; index: number }) {
  const ref = useFadeUp();
  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      id={cat.id}
      className="py-16 md:py-24"
      style={{ background: index % 2 === 0 ? "var(--aa-parchment)" : "var(--aa-travertine)" }}
    >
      <div className="container">
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-12 items-start ${isEven ? "" : "lg:flex-row-reverse"}`}>
          {/* Image column */}
          <div className={`lg:col-span-2 aa-fade-up ${!isEven ? "lg:order-2" : ""}`}>
            <div className="overflow-hidden sticky top-24" style={{ borderRadius: "2px" }}>
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-72 md:h-96 object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Services column */}
          <div className={`lg:col-span-3 ${!isEven ? "lg:order-1" : ""}`}>
            <div className="aa-fade-up mb-8">
              <p className="aa-label mb-2" style={{ color: "var(--aa-bronze)", fontSize: "0.65rem" }}>
                Treatment
              </p>
              <h2 className="aa-display text-3xl md:text-4xl mb-3" style={{ color: "var(--aa-espresso)" }}>
                {cat.name}
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--aa-text-muted)", fontWeight: 300 }}
              >
                {cat.tagline}
              </p>
              <div className="aa-rule mt-6" style={{ opacity: 1, background: "var(--aa-bronze)", width: "2rem" }} />
            </div>

            <div className="aa-fade-up">
              {cat.services.map((service) => (
                <ServiceRow key={service.name} service={service} />
              ))}
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll to category if hash in URL
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--aa-parchment)" }}>
      <Navbar />

      {/* ── PAGE HERO ── */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
        style={{ background: "var(--aa-espresso)" }}
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url(${IMGS.wide})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 container">
          <p className="aa-label mb-4" style={{ color: "var(--aa-bronze-light)" }}>
            Services & Pricing
          </p>
          <h1
            className="aa-brand text-5xl md:text-6xl lg:text-7xl mb-6"
            style={{ color: "#FAF7F3" }}
          >
            Our Treatments
          </h1>
          <p
            className="text-base max-w-lg leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(250,247,243,0.7)", fontWeight: 300 }}
          >
            Every treatment at Aesthetic Avenue is thoughtfully tailored to your individual skin and beauty needs. Browse our full menu below.
          </p>

          {/* Category nav pills */}
          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="aa-label px-4 py-2 border transition-all duration-200 hover:bg-[rgba(250,247,243,0.1)]"
                style={{
                  borderColor: "rgba(250,247,243,0.2)",
                  color: "rgba(250,247,243,0.7)",
                  fontSize: "0.65rem",
                  borderRadius: "1px",
                }}
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY SECTIONS ── */}
      {categories.map((cat, i) => (
        <CategorySection key={cat.id} cat={cat} index={i} />
      ))}

      {/* ── BOTTOM CTA ── */}
      <section
        className="py-20 text-center"
        style={{ background: "var(--aa-espresso)" }}
      >
        <div className="container">
          <p className="aa-label mb-4" style={{ color: "var(--aa-bronze-light)" }}>
            Ready to begin?
          </p>
          <h2
            className="aa-brand text-4xl md:text-5xl mb-8"
            style={{ color: "#FAF7F3" }}
          >
            Book Online
          </h2>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="aa-btn-filled"
          >
            Book Your Appointment
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
