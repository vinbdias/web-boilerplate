import { z } from "zod";
import {
  PASSWORD_HAS_NUMBER,
  PASSWORD_HAS_SPECIAL_CHARACTER,
  PASSWORD_HAS_UPPERCASE,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/config/constants";
import { validateCpf, validateDateString, validateEmailString } from ".";

/** Zod refinements mirroring yupHelpers — use with the project's default Zod stack. */
export const cpfSchema = z
  .string()
  .optional()
  .or(z.literal(""))
  .refine((value) => !value || validateCpf(value), { message: "Invalid CPF" });

export const dateDdMmYyyySchema = z
  .string()
  .optional()
  .or(z.literal(""))
  .refine((value) => !value || value.length < 10 || validateDateString(value), {
    message: "Invalid date",
  });

export const emailSchema = z
  .string()
  .optional()
  .or(z.literal(""))
  .refine((value) => !value || validateEmailString(value), { message: "Invalid email" });

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH)
  .max(PASSWORD_MAX_LENGTH)
  .refine((value) => !PASSWORD_HAS_NUMBER || /\d/.test(value), {
    message: "Password must contain a number",
  })
  .refine((value) => !PASSWORD_HAS_UPPERCASE || /[A-Z]/.test(value), {
    message: "Password must contain an uppercase letter",
  })
  .refine((value) => !PASSWORD_HAS_SPECIAL_CHARACTER || /[^A-Za-z0-9]/.test(value), {
    message: "Password must contain a special character",
  });
