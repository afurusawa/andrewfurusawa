import type { IconType } from "react-icons";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub, SiGmail } from "react-icons/si";

export type ProfileLink = {
  href: string;
  ariaLabel: string;
  label: string;
  Icon: IconType;
  openInNewTab: boolean;
};

/** Professional social profiles used in contact clusters. */
export const socialProfileLinks: readonly ProfileLink[] = [
  {
    href: "https://github.com/afurusawa",
    ariaLabel: "Andrew Furusawa on GitHub",
    label: "github.com/afurusawa",
    Icon: SiGithub,
    openInNewTab: true,
  },
  {
    href: "https://linkedin.com/in/afurusawa",
    ariaLabel: "Andrew Furusawa on LinkedIn",
    label: "linkedin.com/in/afurusawa",
    Icon: FaLinkedin,
    openInNewTab: true,
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
