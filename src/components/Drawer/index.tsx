import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button";
import { Body, Content, Dialog, Header, Title } from "./styles";

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
      $side={side}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <Content>
        <Header>
          <Title id={titleId}>{title}</Title>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close drawer">
            ✕
          </Button>
        </Header>
        <Body>{children}</Body>
      </Content>
    </Dialog>,
    document.body,
  );
}
