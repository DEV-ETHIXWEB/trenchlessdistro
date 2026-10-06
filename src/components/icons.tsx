import type { SVGProps } from "react";

/*
 * Trenchless Distribution icon set, drawn for this project.
 *
 * No stock library ships an inversion drum, a UV cure train or a calibration
 * tube, so these are built on a 24x24 grid with a 1.6 stroke, round caps and
 * round joins, matching the weight of IBM Plex Sans at body sizes.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

/** A coil of liner tube: how material is stocked and sold by the foot. */
export const LinerRoll = (p: IconProps) => (
  <Icon {...p}>
    <ellipse cx="12" cy="8" rx="8.5" ry="3.6" />
    <path d="M3.5 8v7.6c0 2 3.8 3.6 8.5 3.6s8.5-1.6 8.5-3.6V8" />
    <ellipse cx="12" cy="8" rx="2.7" ry="1.1" />
  </Icon>
);

/** MaxLiner-style inversion drum on its cart. */
export const InversionDrum = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="10.5" cy="9.5" r="6.3" />
    <circle cx="10.5" cy="9.5" r="2.1" />
    <path d="M16.8 9.5h2.9a1.3 1.3 0 0 1 0 2.6h-2.3" />
    <path d="M4.5 16.6h12.8" />
    <circle cx="7" cy="19.6" r="1.6" />
    <circle cx="15.6" cy="19.6" r="1.6" />
  </Icon>
);

/** An LED cure train lit inside a host pipe. */
export const UvCure = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2 6.5h20M2 17.5h20" />
    <circle cx="12" cy="12" r="2.9" />
    <path d="M12 6.9v1.3M12 15.8v1.3M7.6 12h1.4M15 12h1.4" />
    <path d="M8.9 8.9l.9.9M14.2 14.2l.9.9M15.1 8.9l-.9.9M9.8 14.2l-.9.9" />
  </Icon>
);

/** Robotic reinstatement cutter: tracked body, arm, cutting head. */
export const RoboticCutter = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 14.4h8.2a1.8 1.8 0 0 1 1.8 1.8v1.6a1.8 1.8 0 0 1-1.8 1.8H3a1.8 1.8 0 0 1-1.8-1.8v-1.6A1.8 1.8 0 0 1 3 14.4Z" />
    <path d="M12.6 15.1 15 10.9" />
    <circle cx="17.4" cy="7.6" r="3.6" />
    <path d="M17.4 4v1.2M17.4 10v1.2M13.8 7.6H15M19.8 7.6H21" />
  </Icon>
);

/** Push camera: cable reel and camera head. */
export const PushCamera = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="7.6" cy="14.4" r="5.4" />
    <circle cx="7.6" cy="14.4" r="1.7" />
    <path d="M12.8 12.8c2.4-1.6 3.2-4 6-4.6" />
    <rect x="17.4" y="4.4" width="5.2" height="4.4" rx="1.3" />
    <path d="M19.4 6.6h1.2" />
  </Icon>
);

/** Resin pail. Sold by weight, mixed on site. */
export const ResinPail = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5.6 8.6h12.8l-1.3 10.8a1.4 1.4 0 0 1-1.4 1.2H8.3a1.4 1.4 0 0 1-1.4-1.2Z" />
    <ellipse cx="12" cy="8.6" rx="6.4" ry="1.7" />
    <path d="M7.6 6.6a4.6 4.6 0 0 1 8.8 0" />
    <path d="M7.1 14.2h9.8" />
  </Icon>
);

/** Sectional point repair: a patch band set into a run of pipe. */
export const PatchRepair = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2 7.4h20M2 16.6h20" />
    <rect x="8.6" y="5.4" width="6.8" height="13.2" rx="1.4" />
    <path d="M10.9 9.6h2.2M10.9 12h2.2M10.9 14.4h2.2" />
  </Icon>
);

/** Host pipe in section: wall, lined bore, and the wall thickness between. */
export const PipeDiameter = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9.2" />
    <circle cx="12" cy="12" r="5.4" />
    <path d="M12 2.8v3.8M12 17.4v3.8M2.8 12h3.8M17.4 12h3.8" />
  </Icon>
);

/** Installer training and certification. */
export const HardHat = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.6 17.6h18.8" />
    <path d="M5.4 17.6a6.6 6.6 0 0 1 13.2 0" />
    <path d="M10.3 11.6V8.4a1.7 1.7 0 0 1 3.4 0v3.2" />
    <path d="M4.2 17.6v1.4a1.4 1.4 0 0 0 1.4 1.4h12.8a1.4 1.4 0 0 0 1.4-1.4v-1.4" />
  </Icon>
);

/** In-house equipment repair bench. */
export const Wrench = (p: IconProps) => (
  <Icon {...p}>
    <path d="M16.2 2.8a5.4 5.4 0 0 0-6.4 7.1L3.3 16.4a2.2 2.2 0 0 0 3.1 3.1l6.5-6.5a5.4 5.4 0 0 0 7.1-6.4l-3.1 3.1-2.9-.7-.7-2.9Z" />
    <path d="M5.4 17.6h.01" />
  </Icon>
);

/** Shipped nationwide by freight. */
export const Freight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M1.8 6.4h11.6v10H1.8z" />
    <path d="M13.4 10h3.9l2.9 3v3.4h-6.8z" />
    <circle cx="6.2" cy="18.6" r="1.8" />
    <circle cx="16.4" cy="18.6" r="1.8" />
    <path d="M8 18.6h6.6M1.8 16.4h2.6M18.2 16.4h2.6" />
  </Icon>
);

/** Spec sheets, SDS and TDS. */
export const SpecSheet = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14 2.6H6.8a1.8 1.8 0 0 0-1.8 1.8v15.2a1.8 1.8 0 0 0 1.8 1.8h10.4a1.8 1.8 0 0 0 1.8-1.8V7.4Z" />
    <path d="M14 2.6v4.8h5" />
    <path d="M8.4 12.4h7.2M8.4 15.6h7.2M8.4 9.2h2.6" />
  </Icon>
);

/* Interface icons, same grid and weight. */

export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12h15.4M13.6 6.2 19.4 12l-5.8 5.8" />
  </Icon>
);

export const ArrowUpRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6.4 17.6 17.6 6.4M8.6 6.4h9v9" />
  </Icon>
);

export const Check = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.4 12.6 9.4 17.6 19.6 7.4" />
  </Icon>
);

export const Cross = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const Phone = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8.2 3.4 10 7.2 8 9.4a12 12 0 0 0 6.6 6.6l2.2-2 3.8 1.8v3.2a1.6 1.6 0 0 1-1.8 1.6C11.2 20 4 12.8 3.2 5.2A1.6 1.6 0 0 1 4.8 3.4Z" />
  </Icon>
);

export const Mail = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2.4" y="5" width="19.2" height="14" rx="1.8" />
    <path d="m3.4 6.6 8.6 6.2 8.6-6.2" />
  </Icon>
);

export const Pin = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21.4s7-5.8 7-11a7 7 0 1 0-14 0c0 5.2 7 11 7 11Z" />
    <circle cx="12" cy="10.2" r="2.6" />
  </Icon>
);

export const Download = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.4v11.2M7.6 10.4 12 14.8l4.4-4.4" />
    <path d="M4 17.4v1.8a1.6 1.6 0 0 0 1.6 1.6h12.8a1.6 1.6 0 0 0 1.6-1.6v-1.8" />
  </Icon>
);

export const Menu = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.4 7h17.2M3.4 12h17.2M3.4 17h17.2" />
  </Icon>
);

export const Chat = (p: IconProps) => (
  <Icon {...p}>
    <path d="M21 11.6c0 4.2-4 7.6-9 7.6a10 10 0 0 1-2.6-.33L4 21l1.3-3.9A7.1 7.1 0 0 1 3 11.6C3 7.4 7 4 12 4s9 3.4 9 7.6Z" />
    <path d="M8.4 11.6h.01M12 11.6h.01M15.6 11.6h.01" />
  </Icon>
);

export const Send = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.4 11.9 20.6 4l-7.2 17.2-2.3-7.4Z" />
    <path d="m11.1 13.8 9.5-9.8" />
  </Icon>
);

export const StockDot = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.4" />
    <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
  </Icon>
);

/** The international symbol of access, drawn to the same 24px grid. */
export const Accessibility = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9.25" />
    <circle cx="12" cy="6.6" r="1.35" fill="currentColor" stroke="none" />
    <path d="M7.4 9.3c3 .9 6.2.9 9.2 0" />
    <path d="M12 9.6v4.1m0 0 2.4 4.6m-2.4-4.6-2.4 4.6" />
  </Icon>
);

/** Play and pause, for the hero video control. */
export const Play = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 5.2 19 12 8 18.8Z" fill="currentColor" />
  </Icon>
);

export const Pause = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 5.5v13M15 5.5v13" strokeWidth="2.4" />
  </Icon>
);
