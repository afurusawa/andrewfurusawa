import React from "react";
import SkillsSection from "../components/SkillsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { socialProfileLinks } from "../config/profileLinks";

export default function Home() {
  return (
    <div className="container mx-auto p-4 sm:p-8 lg:p-16 border-2 border-[var(--color-primary)] bg-white/5 backdrop-blur-sm shadow-lg max-w-full">
      <section className="flex flex-col my-8 sm:my-16" aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-7xl mb-6 sm:mb-8 break-words">
          Andrew Furusawa
        </h1>
        <div className="flex flex-wrap items-center mb-6 sm:mb-8 gap-4">
          <p className="hero-role text-2xl sm:text-3xl md:text-4xl leading-none font-bold mr-0 sm:mr-4 mt-1">
            Front-End Developer
          </p>
          {socialProfileLinks.map((link) => {
            const Icon = link.Icon;
            return (
              <a
                key={link.href}
                href={link.href}
                target={link.openInNewTab ? "_blank" : undefined}
                rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                aria-label={link.ariaLabel}
                className={link.heroClassName}
              >
                <Icon className="w-8 h-8" aria-hidden="true" />
              </a>
            );
          })}
        </div>
        <p className="text-lg sm:text-xl md:text-2xl text-[var(--color-primary)]">
          With over 12 years of front-end development experience, I enjoy building web applications from discovery to production. I&apos;ve been a key player in all phases of the development process including discovery and requirements gathering, usability testing, prototyping, development, and deployment as well as release management and maintenance.
        </p>
      </section>

      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
