import type { CSSProperties } from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
`;

function dimension(value: CSSProperties["width"]) {
  return typeof value === "number" ? `${value}px` : value;
}

export const Placeholder = styled.span<{
  $width: CSSProperties["width"];
  $height: CSSProperties["height"];
  $radius: CSSProperties["borderRadius"];
}>`
  display: block;
  width: ${({ $width }) => dimension($width)};
  height: ${({ $height }) => dimension($height)};
  border-radius: ${({ $radius, theme }) =>
    $radius === undefined ? theme.radius.sm : dimension($radius)};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surfaceHover} 25%,
    ${({ theme }) => theme.colors.border} 50%,
    ${({ theme }) => theme.colors.surfaceHover} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
