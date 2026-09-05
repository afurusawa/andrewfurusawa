"use client";

import { useEffect, useState, type ReactNode } from "react";
import { homepageSections } from "../../config/homepage";

/**
 * Scroll-driven colour-panel state. The per-section colour change *is* the
 * register; this island writes the active section and identity visibility.
 * Each section still paints its own field colour statically, so the page is
 * complete without the observer.
 */
export function ColourPanelObserver({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(homepageSections[0].id);
  const [panelIdentityVisible, setPanelIdentityVisible] = useState(false);

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

    const identity = document.querySelector<HTMLElement>("[data-homepage-identity]");
    const desktopQuery = window.matchMedia("(min-width: 64rem)");
    let identityObserver: IntersectionObserver | null = null;

    const updateIdentityObservation = () => {
      identityObserver?.disconnect();
      identityObserver = null;

      if (!identity || !desktopQuery.matches) {
        setPanelIdentityVisible(false);
        return;
      }

      identityObserver = new IntersectionObserver(
        ([entry]) => setPanelIdentityVisible(!entry.isIntersecting),
        { threshold: 0 },
      );
      identityObserver.observe(identity);
    };

    updateIdentityObservation();
    desktopQuery.addEventListener("change", updateIdentityObservation);

    return () => {
      observer.disconnect();
      identityObserver?.disconnect();
      desktopQuery.removeEventListener("change", updateIdentityObservation);
    };
  }, []);

  return (
    <div
      className="homepage font-sans antialiased"
      data-section={active}
      data-panel-identity={panelIdentityVisible ? "visible" : "hidden"}
    >
      {children}
    </div>
  );
}
