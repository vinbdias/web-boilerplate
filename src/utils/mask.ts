import VMasker from "vanilla-masker";

export const masks = {
  cep: "99999-999",
  cnpj: "99.999.999/9999-99",
  cpf: "999.999.999-99",
  phone: "(99) 99999-9999",
  dateDMY: "99/99/9999",
  dateYMD: "9999-99-99",
  time: "99:99",
} as const;

export type MaskName = keyof typeof masks;

export default function applyMask(value: string | null | undefined, pattern: string): string {
  if (!value) return "";
  return VMasker.toPattern(value, pattern);
}

export function maskCPF(value: string): string {
  return applyMask(value, masks.cpf);
}

export function unmaskCPF(value: string): string {
  return value.replace(/\D/g, "");
}

export function maskCNPJ(value: string): string {
  return applyMask(value, masks.cnpj);
}

export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  const pattern = digits.length <= 10 ? "(99) 9999-9999" : masks.phone;
  return applyMask(digits, pattern);
}

export function maskDateDMY(value: string): string {
  return applyMask(value, masks.dateDMY);
}
