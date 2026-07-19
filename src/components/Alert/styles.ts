import styled, { css } from "styled-components";

type Tone = "info" | "success" | "warning" | "danger";

const tones = {
  info: css`
    background: ${({ theme }) => theme.colors.infoSubtle};
    border-color: ${({ theme }) => theme.colors.info};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.successSubtle};
    border-color: ${({ theme }) => theme.colors.success};
  `,
  warning: css`
    background: ${({ theme }) => theme.colors.warningSubtle};
    border-color: ${({ theme }) => theme.colors.warning};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.dangerSubtle};
    border-color: ${({ theme }) => theme.colors.danger};
  `,
};

export const Root = styled.div<{ $tone: Tone }>`
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid;
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.text};
  ${({ $tone }) => tones[$tone]}
`;

export const Title = styled.p`
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  margin-bottom: ${({ theme }) => theme.space[1]};
`;
