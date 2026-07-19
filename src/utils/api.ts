/**
 * Flattens nested/array backend validation payloads into `field.path` → message.
 * Compatible with CakePHP-style nested errors and flat `{ field: "msg" }` maps.
 */
export interface FormatBackendErrorsOptions {
  prefix?: string;
  fieldLabels?: Record<string, string>;
  errorMessages?: Record<string, string>;
}

const DEFAULT_MESSAGES: Record<string, string> = {
  _empty: "This field is required",
  _required: "This field is required",
  _isUnique: "This value is already in use",
  _invalid: "Invalid value",
};

export function formatBackendErrors(
  errors: unknown,
  options: FormatBackendErrorsOptions = {},
): Record<string, string> {
  const result: Record<string, string> = {};
  const messages = { ...DEFAULT_MESSAGES, ...options.errorMessages };

  function walk(node: unknown, path: string) {
    if (node == null) return;

    if (typeof node === "string") {
      const key = options.prefix ? `${options.prefix}.${path}` : path;
      const label = options.fieldLabels?.[path] ?? path;
      result[key || path] = messages[node] ?? node.replace(/\{field\}/g, label);
      return;
    }

    if (Array.isArray(node)) {
      node.forEach((item, index) => walk(item, path ? `${path}[${index}]` : `[${index}]`));
      return;
    }

    if (typeof node === "object") {
      for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
        walk(value, path ? `${path}.${key}` : key);
      }
    }
  }

  walk(errors, "");
  return result;
}
