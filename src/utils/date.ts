import dayjs, { type ConfigType, type Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const INPUT_FORMATS = ["DD/MM/YYYY", "YYYY-MM-DD", "YYYY-MM-DDTHH:mm:ss.SSSZ"] as const;

export function parseDate(value: ConfigType): Dayjs | null {
  if (!value) return null;
  if (dayjs.isDayjs(value)) return value.isValid() ? value : null;
  if (value instanceof Date) {
    const parsed = dayjs(value);
    return parsed.isValid() ? parsed : null;
  }
  if (typeof value === "string") {
    for (const format of INPUT_FORMATS) {
      const parsed = dayjs(value, format, true);
      if (parsed.isValid()) return parsed;
    }
    const iso = dayjs(value);
    return iso.isValid() ? iso : null;
  }
  return null;
}

export function formatToDDMMYYYY(value: ConfigType): string {
  const parsed = parseDate(value);
  return parsed ? parsed.format("DD/MM/YYYY") : "";
}

export function formatToYYYYMMDD(value: ConfigType): string {
  const parsed = parseDate(value);
  return parsed ? parsed.format("YYYY-MM-DD") : "";
}

export function isValidDate(value: ConfigType): boolean {
  return parseDate(value) !== null;
}

export function formatDateToLongString(value: ConfigType, locale = "en-US"): string {
  const parsed = parseDate(value);
  if (!parsed) return "";
  return parsed.toDate().toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export { dayjs };
