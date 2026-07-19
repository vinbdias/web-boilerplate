import "./Skeleton.css";

export interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: boolean;
}

export function Skeleton({ width = "100%", height = "1rem", rounded = false }: SkeletonProps) {
  return (
    <span
      className={["ui-skeleton", rounded && "ui-skeleton--rounded"].filter(Boolean).join(" ")}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
