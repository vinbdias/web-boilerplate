import { useCallback, useState } from "react";
import { formatBackendErrors } from "@/utils/api";

interface HandleBackendErrorsOptions {
  fieldLabels?: Record<string, string>;
  onNotify?: (title: string) => void;
}

/**
 * Normalizes API error envelopes into a flat field→message map.
 * Pair with `formatBackendErrors` and optionally a snackbar notifier.
 */
export function useBackendErrors() {
  const [backendErrors, setBackendErrors] = useState<Record<string, string>>({});

  const handleBackendErrors = useCallback(
    (payload: unknown, options: HandleBackendErrorsOptions = {}) => {
      const errors =
        payload && typeof payload === "object" && "details" in (payload as object)
          ? formatBackendErrors((payload as { details: unknown }).details, {
              fieldLabels: options.fieldLabels,
            })
          : formatBackendErrors(payload, { fieldLabels: options.fieldLabels });

      setBackendErrors(errors);
      if (options.onNotify && Object.keys(errors).length > 0) {
        options.onNotify("Please fix the highlighted fields");
      }
      return errors;
    },
    [],
  );

  return { backendErrors, setBackendErrors, handleBackendErrors };
}
