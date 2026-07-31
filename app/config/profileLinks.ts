import type { IconType } from "react-icons";
import { SiGithub, SiGmail, SiLinkedin } from "react-icons/si";

export type ProfileLink = {
  href: string;
  ariaLabel: string;
  label: string;
  Icon: IconType;
  openInNewTab: boolean;
  /** Icon-only hero control styling; omitted for contact-only channels. */
  heroClassName?: string;
};

/** Professional social profiles used in the hero and contact section. */
export const socialProfileLinks: readonly ProfileLink[] = [
  {
    href: "https://github.com/afurusawa",
    ariaLabel: "Andrew Furusawa on GitHub",
    label: "github.com/afurusawa",
    Icon: SiGithub,
    openInNewTab: true,
    heroClassName:
      "transition-all duration-300 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200",
  },
  {
    href: "https://linkedin.com/in/afurusawa",
    ariaLabel: "Andrew Furusawa on LinkedIn",
    label: "linkedin.com/in/afurusawa",
    Icon: SiLinkedin,
    openInNewTab: true,
    heroClassName:
      "transition-all duration-300 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
  },
];

/** Contact channels: email plus the shared social profiles. */
export const contactLinks: readonly ProfileLink[] = [
  {
    href: "mailto:andrewfurusawa@gmail.com",
    ariaLabel: "Email Andrew Furusawa",
    label: "andrewfurusawa@gmail.com",
    Icon: SiGmail,
    openInNewTab: false,
  },
  ...socialProfileLinks,
];
