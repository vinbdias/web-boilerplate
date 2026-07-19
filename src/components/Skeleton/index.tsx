import { Root } from "./styles";

export interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: boolean;
}

export function Skeleton({ width = "100%", height = "1rem", rounded = false }: SkeletonProps) {
  return <Root $width={width} $height={height} $rounded={rounded} aria-hidden="true" />;
}
