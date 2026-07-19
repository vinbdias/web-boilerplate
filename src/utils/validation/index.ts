import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

/** Brazilian CPF check-digit validation. Expects digits only (or strips non-digits). */
export function validateCpf(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;

  let sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(digits.substring(i - 1, i), 10) * (11 - i);
  }
  let rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(digits.substring(9, 10), 10)) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(digits.substring(i - 1, i), 10) * (12 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  return rest === parseInt(digits.substring(10, 11), 10);
}

export function validateDateString(dateString: string, format = "DD/MM/YYYY"): boolean {
  return dayjs(dateString, format, true).isValid();
}

export function validateTimeString(timeString: string, format = "HH:mm"): boolean {
  return dayjs(timeString, format, true).isValid();
}

export function validateEmailString(email: string): boolean {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}
