import { useCallback, useState } from "react";

/** Tracks form validity + per-field error map for multi-section forms. */
export function useFormValidationState() {
  const [isFormValid, setIsFormValid] = useState(true);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleFormValidChange = useCallback((valid: boolean) => {
    setIsFormValid(valid);
  }, []);

  const handleFormValidError = useCallback((errors: Record<string, string>) => {
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, []);

  return { isFormValid, formErrors, handleFormValidChange, handleFormValidError, setFormErrors };
}
