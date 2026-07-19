import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import "./Drawer.css";

export interface DrawerProps {
  open: boolean;
  title: string;
  onClose: () => void;
  side?: "left" | "right";
  children: ReactNode;
}

/** Side panel built on the native <dialog> element (focus trap + Escape). */
export function Drawer({ open, title, onClose, side = "right", children }: DrawerProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  if (!open) return null;

  return createPortal(
    <dialog
      ref={ref}
      className={`ui-drawer ui-drawer--${side}`}
      aria-labelledby="ui-drawer-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="ui-drawer__content">
        <div className="ui-drawer__header">
          <h2 className="ui-drawer__title" id="ui-drawer-title">
            {title}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close drawer">
            ✕
          </Button>
        </div>
        <div className="ui-drawer__body">{children}</div>
      </div>
    </dialog>,
    document.body,
  );
}
