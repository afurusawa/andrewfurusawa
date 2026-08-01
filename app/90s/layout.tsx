import type { ReactNode } from "react";
import styles from "./nineties.module.css";
import { ninetiesMetadata } from "./metadata";

export const metadata = ninetiesMetadata;

export default function NinetiesLayout({ children }: { children: ReactNode }) {
  return <div className={styles.experiment}>{children}</div>;
}
