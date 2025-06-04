'use client';

import React from 'react';
import { SiGmail, SiGithub, SiLinkedin } from 'react-icons/si';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl mb-8 text-center">
          Connect with me
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="p-8 border-2 border-[var(--color-primary)] dark:border-[var(--color-primary)] bg-white/5 backdrop-blur-sm shadow-lg">
            <p className="text-2xl mb-8">
              I&apos;m always open to new opportunities and collaborations. Feel free to reach out through any of the channels below.
            </p>
            <div className="flex flex-col gap-6">
              <a
                href="mailto:your.email@example.com"
                className="flex items-center gap-4 p-4 border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
              >
                <SiGmail className="w-6 h-6" />
                <span>your.email@example.com</span>
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
              >
                <SiGithub className="w-6 h-6" />
                <span>github.com/yourusername</span>
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
              >
                <SiLinkedin className="w-6 h-6" />
                <span>linkedin.com/in/yourusername</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 