import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Backdrop = styled.div<{
  $fullScreen: boolean;
  $zIndex: number;
}>`
  position: ${({ $fullScreen }) => ($fullScreen ? "fixed" : "absolute")};
  inset: 0;
  z-index: ${({ $zIndex }) => $zIndex};
  display: grid;
  place-items: center;
  min-height: ${({ $fullScreen }) => ($fullScreen ? "100dvh" : "100%")};
  background: ${({ theme }) =>
    `color-mix(in srgb, ${theme.colors.surface} 84%, transparent)`};
  backdrop-filter: blur(2px);
  cursor: wait;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[4]};
`;

export const Indicator = styled.span`
  width: ${({ theme }) => theme.space[8]};
  height: ${({ theme }) => theme.space[8]};
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Message = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;
