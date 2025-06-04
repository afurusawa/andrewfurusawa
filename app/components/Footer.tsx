'use client';

import React from 'react';
import { SiNextdotjs, SiTailwindcss, SiPayloadcms, SiMongodb, SiGraphql } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="py-16 border-t border-[var(--color-primary)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <p className="text-md uppercase tracking-wider p-4">
            Handmade with ❤️ by Me using
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-secondary)] transition-colors duration-200"
              title="Next.js"
            >
              <SiNextdotjs className="w-6 h-6" />
            </a>
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-secondary)] transition-colors duration-200"
              title="Tailwind CSS"
            >
              <SiTailwindcss className="w-6 h-6" />
            </a>
            <a
              href="https://payloadcms.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-secondary)] transition-colors duration-200"
              title="Payload CMS"
            >
              <SiPayloadcms className="w-6 h-6" />
            </a>
            <a
              href="https://www.mongodb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-secondary)] transition-colors duration-200"
              title="MongoDB"
            >
              <SiMongodb className="w-6 h-6" />
            </a>
            <a
              href="https://graphql.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-secondary)] transition-colors duration-200"
              title="GraphQL"
            >
              <SiGraphql className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 