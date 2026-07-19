import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ConfirmDialog as ConfirmDialogView } from "@/components/ConfirmDialog";

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
}

interface ConfirmDialogContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextValue | null>(null);

/**
 * Promise-based confirm dialog. Usage:
 *   const ok = await confirm({ message: "Delete this item?" });
 */
export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({ message: "" });
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((next: ConfirmOptions) => {
    setOptions(next);
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const settle = useCallback((value: boolean) => {
    setOpen(false);
    resolverRef.current?.(value);
    resolverRef.current = null;
  }, []);

  const value = useMemo(() => ({ confirm }), [confirm]);

  return (
    <ConfirmDialogContext.Provider value={value}>
      {children}
      <ConfirmDialogView
        open={open}
        title={options.title ?? "Confirm"}
        message={options.message}
        confirmLabel={options.confirmLabel}
        cancelLabel={options.cancelLabel}
        danger={options.danger}
        onConfirm={() => settle(true)}
        onCancel={() => settle(false)}
      />
    </ConfirmDialogContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useConfirmDialog(): ConfirmDialogContextValue {
  const context = useContext(ConfirmDialogContext);
  if (!context) throw new Error("useConfirmDialog must be used within ConfirmDialogProvider");
  return context;
}
