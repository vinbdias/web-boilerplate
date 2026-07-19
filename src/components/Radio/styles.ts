import styled from "styled-components";

export const Root = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.sm};
`;

export const NativeInput = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${({ theme }) => theme.colors.accent};
  cursor: pointer;
`;

export const Group = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`;

export const Legend = styled.legend`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  padding: 0;
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

export const Options = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[4]};
  flex-wrap: wrap;
`;
