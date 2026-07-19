import type { TestContext } from "yup";
import {
  PASSWORD_HAS_NUMBER,
  PASSWORD_HAS_SPECIAL_CHARACTER,
  PASSWORD_HAS_UPPERCASE,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "@/config/constants";
import { validateCpf, validateDateString, validateEmailString } from ".";

type YupTest = (value: string | undefined, context: TestContext) => true | ReturnType<TestContext["createError"]>;

export const isValidCpf: YupTest = (value, { createError }) => {
  if (!value?.trim()) return true;
  if (value.replace(/\D/g, "").length !== 11) {
    return createError({ message: "CPF must have 11 digits" });
  }
  if (!validateCpf(value)) return createError({ message: "Invalid CPF" });
  return true;
};

export const isValidDate: YupTest = (value, { createError }) => {
  if (!value?.trim()) return true;
  if (value.length >= 8 && value.length < 10) {
    return createError({ message: "Use format dd/mm/yyyy" });
  }
  if (value.length >= 10 && !validateDateString(value)) {
    return createError({ message: "Invalid date" });
  }
  return true;
};

export const isValidFutureDate: YupTest = (value, { createError }) => {
  if (!value?.trim() || value.length !== 10) return true;
  const [day, month, year] = value.split("/");
  const date = new Date(`${year}-${month}-${day}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) return createError({ message: "Date must be today or in the future" });
  return true;
};

export const isValidPastDate: YupTest = (value, { createError }) => {
  if (!value?.trim() || value.length !== 10) return true;
  const [day, month, year] = value.split("/");
  const date = new Date(`${year}-${month}-${day}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date > today) return createError({ message: "Date must be today or in the past" });
  return true;
};

export const isValidBirthDate: YupTest = (value, { createError }) => {
  if (!value?.trim() || value.length !== 10) return true;
  if (!validateDateString(value)) return createError({ message: "Invalid date" });
  const [day, month, year] = value.split("/");
  const birth = new Date(`${year}-${month}-${day}T00:00:00`);
  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - 16);
  if (birth > cutoff) return createError({ message: "Must be at least 16 years old" });
  return true;
};

export const isValidEmail: YupTest = (value, { createError }) => {
  if (!value?.trim()) return true;
  if (!validateEmailString(value)) return createError({ message: "Invalid email" });
  return true;
};

export const isValidTelephone: YupTest = (value, { createError }) => {
  if (!value?.trim()) return true;
  const digits = value.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) {
    return createError({ message: "Invalid phone number" });
  }
  return true;
};

export const isValidPassword: YupTest = (value, { createError }) => {
  if (!value) return true;
  if (value.length < PASSWORD_MIN_LENGTH || value.length > PASSWORD_MAX_LENGTH) {
    return createError({
      message: `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters`,
    });
  }
  if (PASSWORD_HAS_NUMBER && !/\d/.test(value)) {
    return createError({ message: "Password must contain a number" });
  }
  if (PASSWORD_HAS_UPPERCASE && !/[A-Z]/.test(value)) {
    return createError({ message: "Password must contain an uppercase letter" });
  }
  if (PASSWORD_HAS_SPECIAL_CHARACTER && !/[^A-Za-z0-9]/.test(value)) {
    return createError({ message: "Password must contain a special character" });
  }
  return true;
};
