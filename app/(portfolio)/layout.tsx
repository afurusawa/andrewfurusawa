import type { ReactNode } from "react";
import BackgroundAnimation from "../components/BackgroundAnimation";
import ThemeToggle from "../components/ThemeToggle";

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BackgroundAnimation />
      <main className="min-h-screen p-4 sm:p-8 lg:p-16">
        <ThemeToggle />
        {children}
      </main>
    </>
  );
}
