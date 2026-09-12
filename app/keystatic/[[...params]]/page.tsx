import { notFound } from "next/navigation";

export default function KeystaticPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return null;
}
