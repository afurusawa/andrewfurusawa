import React from "react";
import { SiGmail, SiGithub, SiLinkedin } from "react-icons/si";

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
              <a
                href="mailto:andrewfurusawa@gmail.com"
                className="flex items-center gap-4 p-4 border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 min-w-0"
              >
                <SiGmail className="w-6 h-6 shrink-0" aria-hidden="true" />
                <span className="break-all">andrewfurusawa@gmail.com</span>
              </a>
              <a
                href="https://github.com/afurusawa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 min-w-0"
              >
                <SiGithub className="w-6 h-6 shrink-0" aria-hidden="true" />
                <span className="break-all">github.com/afurusawa</span>
              </a>
              <a
                href="https://linkedin.com/in/afurusawa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 min-w-0"
              >
                <SiLinkedin className="w-6 h-6 shrink-0" aria-hidden="true" />
                <span className="break-all">linkedin.com/in/afurusawa</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
