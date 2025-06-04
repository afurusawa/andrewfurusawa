'use client';

import React from 'react';
export default function Home() {
  return (
    <div className="container mx-auto p-16 border-2 border-[var(--color-primary)]  bg-white/5 backdrop-blur-sm shadow-lg">

      {/* Navbar */}
      <nav>
        <div className="flex justify-between items-center py-8">
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col my-16">
        <h1 className="text-7xl mb-8">
          Andrew Furusawa
        </h1>
        <div className="flex items-center mb-8 gap-4">
          <h3 className="text-4xl leading-none font-bold mr-4 mt-1">
            Front-End Developer
          </h3>
          <a href="https://github.com" className="transition-all duration-300 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
            icon
          </a>
          <a href="https://linkedin.com" className="transition-all duration-300 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            icon
          </a>
        </div>
        <p className="text-2xl">
          With over 12 years of front-end development experience, I enjoy building web applications, from discovery to production. I&apos;ve been a key player in all phases of the development process including usability testing, discovery and requirements gathering, prototyping, development, and deployment as well as release management and maintenance.
        </p>
      </section>
    </div>
  );
}
