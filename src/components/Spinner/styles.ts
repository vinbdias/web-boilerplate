import styled, { keyframes } from "styled-components";

type Size = "sm" | "md" | "lg";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const dimensions: Record<Size, { size: string; border: string }> = {
  sm: { size: "14px", border: "2px" },
  md: { size: "20px", border: "2px" },
  lg: { size: "32px", border: "3px" },
};

export const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;

export const Circle = styled.span<{ $size: Size }>`
  width: ${({ $size }) => dimensions[$size].size};
  height: ${({ $size }) => dimensions[$size].size};
  border: ${({ $size }) => dimensions[$size].border} solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

export const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
