import React from 'react';
import type { Metadata } from "next";
import "./globals.css";
import { fonts } from './config/fonts';
import BackgroundAnimation from './components/BackgroundAnimation';
import ThemeToggle from './components/ThemeToggle';

export const metadata: Metadata = {
  metadataBase: new URL('https://andrewfurusawa.com'),
  title: "Andrew Furusawa - personal website",
  description: "Portfolio website for Andrew Furusawa, front-end developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={Object.values(fonts).map(font => font.variable).join(' ')}>
      <body>
      <BackgroundAnimation />
        <main className="min-h-screen p-16">
          <ThemeToggle />
          {children}
        </main>
      </body>
    </html>
  );
}
