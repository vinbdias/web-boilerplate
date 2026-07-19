import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
`;

export const Root = styled.span<{ $width: string; $height: string; $rounded: boolean }>`
  display: inline-block;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: ${({ theme, $rounded }) => ($rounded ? "999px" : theme.radius.sm)};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surfaceHover} 25%,
    ${({ theme }) => theme.colors.border} 50%,
    ${({ theme }) => theme.colors.surfaceHover} 75%
  );
  background-size: 200% 100%;
  animation: ${pulse} 1.4s ease infinite;
`;
