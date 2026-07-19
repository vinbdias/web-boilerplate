import styled, { css } from "styled-components";

type Tone = "neutral" | "success" | "warning" | "danger" | "info";

const tones = {
  neutral: css`
    background: ${({ theme }) => theme.colors.accentSubtle};
    color: ${({ theme }) => theme.colors.textSecondary};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.successSubtle};
    color: ${({ theme }) => theme.colors.success};
  `,
  warning: css`
    background: ${({ theme }) => theme.colors.warningSubtle};
    color: ${({ theme }) => theme.colors.warning};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.dangerSubtle};
    color: ${({ theme }) => theme.colors.danger};
  `,
  info: css`
    background: ${({ theme }) => theme.colors.infoSubtle};
    color: ${({ theme }) => theme.colors.info};
  `,
};

export const Root = styled.span<{ $tone: Tone }>`
  display: inline-flex;
  align-items: center;
  padding: 2px ${({ theme }) => theme.space[2]};
  border-radius: 999px;
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  line-height: 1.5;
  ${({ $tone }) => tones[$tone]}
`;
