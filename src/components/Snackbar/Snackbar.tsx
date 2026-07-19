import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import type { SnackbarVariant } from "./type";

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const tones = {
  success: css`
    background: ${({ theme }) => theme.colors.success};
  `,
  warning: css`
    background: ${({ theme }) => theme.colors.warning};
  `,
  error: css`
    background: ${({ theme }) => theme.colors.danger};
  `,
  info: css`
    background: ${({ theme }) => theme.colors.info};
  `,
};

const Root = styled.div<{ $variant: SnackbarVariant; $leaving: boolean }>`
  margin: ${({ theme }) => theme.space[3]} auto 0;
  max-width: 480px;
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: ${({ theme }) => theme.font.size.sm};
  box-shadow: ${({ theme }) => theme.shadow.md};
  animation: ${slideIn} 150ms ease;
  opacity: ${({ $leaving }) => ($leaving ? 0 : 1)};
  transition: opacity 400ms ease;
  ${({ $variant }) => tones[$variant]}
`;

export interface SnackbarProps {
  message: string;
  variant?: SnackbarVariant;
  duration?: number;
  onClose?: () => void;
}

export function Snackbar({
  message,
  variant = "error",
  duration = 3000,
  onClose,
}: SnackbarProps) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const hide = window.setTimeout(() => setLeaving(true), duration);
    const remove = window.setTimeout(() => onClose?.(), duration + 400);
    return () => {
      clearTimeout(hide);
      clearTimeout(remove);
    };
  }, [duration, onClose]);

  return (
    <Root $variant={variant} $leaving={leaving} role="status">
      {message}
    </Root>
  );
}
