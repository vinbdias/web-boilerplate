import type { CSSProperties } from "react";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import type { IconPack, SizeProp } from "@fortawesome/fontawesome-svg-core";

/**
 * Friendly-name → FontAwesome IconDefinition map.
 * Add icons here as the app needs them; keep names semantic, not FA-prefixed.
 */
export const iconMap = {
  bars: fas.faBars,
  bell: fas.faBell,
  calendar: fas.faCalendar,
  calendarDays: fas.faCalendarDays,
  caretDown: fas.faCaretDown,
  caretUp: fas.faCaretUp,
  check: fas.faCheck,
  chevronDown: fas.faChevronDown,
  chevronLeft: fas.faChevronLeft,
  chevronRight: fas.faChevronRight,
  circleCheck: far.faCircleCheck,
  circleExclamation: fas.faCircleExclamation,
  circleInfo: fas.faCircleInfo,
  circleXmark: fas.faCircleXmark,
  clock: fas.faClock,
  copy: fas.faCopy,
  edit: fas.faPenToSquare,
  ellipsis: fas.faEllipsis,
  envelope: fas.faEnvelope,
  eye: fas.faEye,
  eyeSlash: fas.faEyeSlash,
  fileArrowDown: fas.faFileArrowDown,
  filter: fas.faFilter,
  gear: fas.faGear,
  home: fas.faHome,
  lock: fas.faLock,
  magnifyingGlass: fas.faMagnifyingGlass,
  plus: fas.faPlus,
  sort: fas.faSort,
  sortDown: fas.faSortDown,
  sortUp: fas.faSortUp,
  trash: fas.faTrash,
  user: fas.faUser,
  xmark: fas.faXmark,
} as const;

export type IconName = keyof typeof iconMap;

export interface FaIconProps {
  name: IconName;
  size?: SizeProp;
  className?: string;
  color?: string;
  style?: CSSProperties;
}

export interface FaRawIconProps {
  name: string;
  size?: SizeProp;
  className?: string;
  color?: string;
  style?: CSSProperties;
}

/** Accept either a friendly name or a full FaIcon props object. */
export type IconProp = IconName | FaIconProps;

export const byPrefixAndName: Record<"fas" | "far" | "fab", IconPack> = {
  fas,
  far,
  fab,
};

export function normalizeIcon(icon?: IconProp): FaIconProps | null {
  if (!icon) return null;
  if (typeof icon === "string") return { name: icon };
  return icon;
}
