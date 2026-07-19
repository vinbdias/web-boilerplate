import styled, { css, keyframes } from "styled-components";

type Tone = "success" | "danger" | "info";

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const tones = {
  info: css`
    background: ${({ theme }) => theme.colors.text};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
  `,
};

export const Viewport = styled.div`
  position: fixed;
  bottom: ${({ theme }) => theme.space[4]};
  right: ${({ theme }) => theme.space[4]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
  z-index: 1000;
`;

export const ToastItem = styled.div<{ $tone: Tone }>`
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: ${({ theme }) => theme.font.size.sm};
  box-shadow: ${({ theme }) => theme.shadow.md};
  max-width: 360px;
  animation: ${slideIn} 150ms ease;
  ${({ $tone }) => tones[$tone]}
`;
