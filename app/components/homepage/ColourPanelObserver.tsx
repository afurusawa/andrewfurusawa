"use client";

import { useEffect, useState, type ReactNode } from "react";
import { homepageSections } from "../../config/homepage";

/**
 * Scroll-driven colour-panel repaint. The per-section colour change *is* the
 * register; this island only writes `data-section`. Each section still paints
 * its own field colour statically, so the page is complete without the observer.
 */
export function ColourPanelObserver({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(homepageSections[0].id);

  useEffect(() => {
    const sections = homepageSections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        setActive(visible.target.id as (typeof homepageSections)[number]["id"]);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="homepage font-sans antialiased" data-section={active}>
      {children}
    </div>
  );
}
