import React from "react";
import { contactLinks } from "../config/profileLinks";

const contactRowClassName =
  "flex items-center gap-4 p-4 border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 min-w-0";

export default function ContactSection() {
  return (
    <section id="contact" className="py-12 sm:py-20" aria-labelledby="contact-heading">
      <div className="container mx-auto px-0 sm:px-4 max-w-full">
        <h2 id="contact-heading" className="text-4xl sm:text-5xl mb-8 text-center">
          Connect with me
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="p-8 border-2 border-[var(--color-primary)] text-[var(--color-primary)] dark:border-[var(--color-primary)] bg-white/5 backdrop-blur-sm shadow-lg">
            <p className="text-2xl mb-8">
              I&apos;m always open to new opportunities and collaborations. Feel free to reach out through any of the channels below.
            </p>
            <div className="flex flex-col gap-6">
              {contactLinks.map((link) => {
                const Icon = link.Icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.openInNewTab ? "_blank" : undefined}
                    rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                    aria-label={link.ariaLabel}
                    className={contactRowClassName}
                  >
                    <Icon className="w-6 h-6 shrink-0" aria-hidden="true" />
                    <span className="break-all">{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
