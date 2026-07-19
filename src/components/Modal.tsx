import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import "./Modal.css";

export interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  footer?: ReactNode;
  children: ReactNode;
}

/**
 * Dialog built on the native <dialog> element: focus trapping, Escape and
 * ::backdrop come for free from the platform.
 */
export function Modal({ open, title, onClose, footer, children }: ModalProps) {
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
      className="ui-modal"
      aria-labelledby="ui-modal-title"
      onClose={onClose}
      onClick={(event) => {
        // Click on the backdrop (the dialog element itself) closes.
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="ui-modal__content">
        <div className="ui-modal__header">
          <h2 className="ui-modal__title" id="ui-modal-title">
            {title}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close dialog">
            ✕
          </Button>
        </div>
        <div className="ui-modal__body">{children}</div>
        {footer && <div className="ui-modal__footer">{footer}</div>}
      </div>
    </dialog>,
    document.body,
  );
}
