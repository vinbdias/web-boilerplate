import styled from "styled-components";

export const Root = styled.span`
  position: relative;
  display: inline-flex;
`;

export const Bubble = styled.span`
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: ${({ theme }) => theme.font.size.xs};
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[2]}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity ${({ theme }) => theme.transition.fast};
  z-index: 100;

  ${Root}:hover &,
  ${Root}:focus-within & {
    opacity: 1;
  }
`;
