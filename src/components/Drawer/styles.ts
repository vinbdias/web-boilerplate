import styled from "styled-components";

export const Dialog = styled.dialog<{ $side: "left" | "right" }>`
  padding: 0;
  border: none;
  margin: 0;
  max-height: 100vh;
  height: 100vh;
  width: min(380px, 90vw);
  box-shadow: ${({ theme }) => theme.shadow.lg};
  margin-left: ${({ $side }) => ($side === "right" ? "auto" : "0")};
  margin-right: ${({ $side }) => ($side === "left" ? "auto" : "0")};

  &::backdrop {
    background: rgb(0 0 0 / 0.4);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
  overflow-y: auto;
  flex: 1;
`;
