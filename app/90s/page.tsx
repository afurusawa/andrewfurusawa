import { contactLinks } from "../config/profileLinks";

export default function NinetiesExperiment() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl p-6 sm:p-12">
      <h1>Andrew Furusawa /90s</h1>
      <p>
        A small, private portfolio experiment. The full Neon Cyber Basement
        experience is still under construction.
      </p>
      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading">Contact</h2>
        <ul>
          {contactLinks.map((link) => {
            const Icon = link.Icon;

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.openInNewTab ? "_blank" : undefined}
                  rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                  aria-label={link.ariaLabel}
                >
                  <Icon aria-hidden="true" /> {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
