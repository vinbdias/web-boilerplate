import { Indicator, SrOnly } from "./styles";

export interface InlineLoaderProps {
  size?: number;
  label?: string;
}

/** Compact loading indicator for counters, badges, cells and other inline content. */
export function InlineLoader({ size = 16, label = "Loading" }: InlineLoaderProps) {
  return (
    <span role="status" aria-label={label}>
      <Indicator $size={size} aria-hidden="true" />
      <SrOnly>{label}</SrOnly>
    </span>
  );
}
