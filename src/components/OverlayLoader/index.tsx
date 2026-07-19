import { createPortal } from "react-dom";
import { Backdrop, Content, Indicator, Message } from "./styles";

export interface OverlayLoaderProps {
  loading?: boolean;
  text?: string;
  fullScreen?: boolean;
  zIndex?: number;
}

/** Blocking loading state for a positioned container or the entire viewport. */
export function OverlayLoader({
  loading = false,
  text = "Loading…",
  fullScreen = false,
  zIndex = 1000,
}: OverlayLoaderProps) {
  if (!loading) return null;

  const overlay = (
    <Backdrop
      $fullScreen={fullScreen}
      $zIndex={zIndex}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={text}
    >
      <Content>
        <Indicator aria-hidden="true" />
        <Message>{text}</Message>
      </Content>
    </Backdrop>
  );

  return fullScreen && typeof document !== "undefined"
    ? createPortal(overlay, document.body)
    : overlay;
}
