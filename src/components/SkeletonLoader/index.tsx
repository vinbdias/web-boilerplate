import type { CSSProperties } from "react";
import { Placeholder } from "./styles";

export interface SkeletonLoaderProps {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  radius?: CSSProperties["borderRadius"];
}

/** Layout-preserving placeholder for content that is still loading. */
export function SkeletonLoader({
  width = "100%",
  height = "1rem",
  radius,
}: SkeletonLoaderProps) {
  return (
    <Placeholder
      $width={width}
      $height={height}
      $radius={radius}
      aria-hidden="true"
    />
  );
}
