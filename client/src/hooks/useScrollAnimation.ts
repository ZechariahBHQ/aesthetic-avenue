import { useEffect, useRef } from "react";

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aa-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe the element itself and all .aa-fade-up children
    const targets = el.querySelectorAll(".aa-fade-up");
    targets.forEach((t) => observer.observe(t));
    if (el.classList.contains("aa-fade-up")) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}
