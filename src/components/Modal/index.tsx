import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button";
import { Body, Content, Dialog, Footer, Header, Title } from "./styles";

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
  const titleId = useId();

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
    <Dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        // Click on the backdrop (the dialog element itself) closes.
        if (event.target === ref.current) onClose();
      }}
    >
      <Content>
        <Header>
          <Title id={titleId}>{title}</Title>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close dialog">
            ✕
          </Button>
        </Header>
        <Body>{children}</Body>
        {footer && <Footer>{footer}</Footer>}
      </Content>
    </Dialog>,
    document.body,
  );
}
