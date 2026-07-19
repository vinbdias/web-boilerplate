import styled from "styled-components";

export const Dialog = styled.dialog`
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  width: min(480px, calc(100vw - ${({ theme }) => theme.space[6]}));

  &::backdrop {
    background: rgb(0 0 0 / 0.4);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.space[4]} ${theme.space[5]}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
`;

export const Body = styled.div`
  padding: ${({ theme }) => theme.space[5]};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => `${theme.space[4]} ${theme.space[5]}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
