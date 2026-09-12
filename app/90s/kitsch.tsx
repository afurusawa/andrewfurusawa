import {
  COMING_SOON,
  HIT_COUNT,
  HIT_SINCE,
  PACK_BADGE_NS,
  PACK_BADGE_SITE,
  WEBRING,
} from "./copy";
import styles from "./nineties.module.css";

const PACK_TAPE = { src: "/90s/under-construction.svg", width: 480, height: 44 };

const PACK_BADGES = [
  { src: "/90s/badge-html.png" },
  { src: "/90s/badge-cool.png" },
  { src: "/90s/badge-hack.png" },
] as const;

export function HitCounter() {
  return (
    <div className={styles.hitCounter} aria-hidden="true">
      <span className={styles.hitDigits}>
        {HIT_COUNT.split("").map((digit, index) => (
          <span key={`${digit}-${index}`}>{digit}</span>
        ))}
      </span>
      <span className={styles.hitCaption}>
        You are visitor number {HIT_COUNT} since {HIT_SINCE}
      </span>
    </div>
  );
}

export function PackBadges() {
  return (
    <div className={styles.pack}>
      {PACK_BADGES.map((badge) => (
        <img
          key={badge.src}
          className={styles.packBadge}
          src={badge.src}
          alt=""
          width={88}
          height={31}
        />
      ))}
      <span className={`${styles.packChip} ${styles.packChipNs}`}>
        {PACK_BADGE_NS}
      </span>
      <span className={`${styles.packChip} ${styles.packChipSite}`}>
        {PACK_BADGE_SITE}
      </span>
    </div>
  );
}

export function ConstructionBanner() {
  return (
    <div className={styles.construction}>
      <img
        className={styles.caution}
        src="/90s/caution.png"
        alt=""
        width={56}
        height={56}
      />
      <span className={styles.workerClip}>
        <img src="/90s/worker.png" alt="" width={48} height={48} />
      </span>
      <img
        className={styles.packTape}
        src={PACK_TAPE.src}
        alt=""
        width={PACK_TAPE.width}
        height={PACK_TAPE.height}
      />
      <span className={styles.stamp}>{COMING_SOON}</span>
    </div>
  );
}

export function ChromeDivider() {
  return (
    <p className={styles.chrome} aria-hidden="true">
      <img src="/90s/chrome-bar.jpg" alt="" width={780} height={120} />
    </p>
  );
}

export function WebRing() {
  return (
    <div className={styles.ring} aria-hidden="true">
      <img src="/90s/globe.png" alt="" width={48} height={36} />
      <div>
        <p className={styles.ringKicker}>{WEBRING.kicker}</p>
        <p className={styles.ringName}>{WEBRING.name}</p>
        <p className={styles.ringNav}>{WEBRING.nav}</p>
      </div>
    </div>
  );
}

export function HubKitsch() {
  return (
    <div className={styles.kit} aria-hidden="true">
      <ConstructionBanner />
      <PackBadges />
    </div>
  );
}
