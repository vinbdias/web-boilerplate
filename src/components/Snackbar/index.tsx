export type { SnackbarVariant } from "./type";
export { Snackbar } from "./Snackbar";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Snackbar } from "./Snackbar";
import type { SnackbarVariant } from "./type";

interface SnackbarEntry {
  id: number;
  message: string;
  variant: SnackbarVariant;
  duration: number;
}

interface SnackbarContextValue {
  showSnackbar: (message: string, variant?: SnackbarVariant, duration?: number) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbars, setSnackbars] = useState<SnackbarEntry[]>([]);

  const showSnackbar = useCallback(
    (message: string, variant: SnackbarVariant = "error", duration = 3000) => {
      const id = Date.now() + Math.random();
      setSnackbars((current) => [...current, { id, message, variant, duration }]);
      setTimeout(() => {
        setSnackbars((current) => current.filter((snack) => snack.id !== id));
      }, duration + 500);
    },
    [],
  );

  const value = useMemo(() => ({ showSnackbar }), [showSnackbar]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        {snackbars.map((snack) => (
          <Snackbar
            key={snack.id}
            message={snack.message}
            variant={snack.variant}
            duration={snack.duration}
          />
        ))}
      </div>
    </SnackbarContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSnackbar(): SnackbarContextValue {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error("useSnackbar must be used within SnackbarProvider");
  return context;
}
