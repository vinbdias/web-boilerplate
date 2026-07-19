import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
`;

export const Value = styled.span`
  font-size: ${({ theme }) => theme.font.size["2xl"]};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  line-height: 1.1;
`;

export const Label = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Hint = styled.span`
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;
