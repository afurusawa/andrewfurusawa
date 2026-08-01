import type { Metadata } from "next";
import PrototypeHost from "./PrototypeHost";

export const metadata: Metadata = {
  title: "PROTOTYPE: /90s frames-feel shell",
  description:
    "Throwaway UI prototype exploring Neon Cyber Basement shell variants for the /90s experiment.",
  robots: { index: false, follow: false },
};

export default function Prototype90sShellPage() {
  return <PrototypeHost />;
}
