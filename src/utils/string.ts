const PREPOSITIONS = new Set(["da", "de", "do", "das", "dos", "e", "a", "o"]);

export function onlyNumbers(value: string): string {
  return value.replace(/\D/g, "");
}

export function onlyLetters(value: string): string {
  return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
}

export function onlyAlphaNumeric(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, "");
}

export function capitalizeFirstLetter(value: string): string {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function capitalizeWords(value: string): string {
  return value
    .split(/\s+/)
    .map((word) => {
      if (/^[IVXLCDM]+$/i.test(word) && word.length <= 6) return word.toUpperCase();
      return capitalizeFirstLetter(word.toLowerCase());
    })
    .join(" ");
}

/** Title-cases a person name, keeping Portuguese prepositions lowercase. */
export function capitalizeName(value: string): string {
  return value
    .split(/\s+/)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && PREPOSITIONS.has(lower)) return lower;
      return capitalizeFirstLetter(lower);
    })
    .join(" ");
}

export function truncateText(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1)}…`;
}

export function hideEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}***@${domain}`;
}

export function downloadFile(url?: string | null, filename?: string): void {
  if (!url) return;
  const anchor = document.createElement("a");
  anchor.href = url;
  if (filename) anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
