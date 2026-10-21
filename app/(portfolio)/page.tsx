import { Homepage } from "../components/homepage/Homepage";
import { HomepagePrototype } from "../components/homepage/prototype/HomepagePrototype";

/** Throwaway comparison on the real route; the public rendering stays the default. */
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  if (process.env.NODE_ENV !== "production") {
    const { variant } = await searchParams;
    if (variant) return <HomepagePrototype variant={variant} />;
  }
  return <Homepage />;
}
