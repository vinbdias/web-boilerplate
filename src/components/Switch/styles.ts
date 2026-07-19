import styled from "styled-components";

export const Root = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.sm};
`;

export const Thumb = styled.span`
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: transform ${({ theme }) => theme.transition.fast};
`;

export const Track = styled.span`
  width: 36px;
  height: 20px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.borderStrong};
  padding: 2px;
  transition: background ${({ theme }) => theme.transition.fast};
  flex-shrink: 0;
`;

export const NativeInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;

  &:checked + ${Track} {
    background: ${({ theme }) => theme.colors.accent};
  }

  &:checked + ${Track} ${Thumb} {
    transform: translateX(16px);
  }

  &:focus-visible + ${Track} {
    box-shadow: ${({ theme }) => theme.focusRing};
  }

  &:disabled + ${Track} {
    opacity: 0.55;
  }
`;
