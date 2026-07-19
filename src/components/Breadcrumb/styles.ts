import { Link } from "react-router-dom";
import styled from "styled-components";

export const List = styled.ol`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: ${({ theme }) => theme.font.size.sm};
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.textSecondary};

  &:last-child {
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.font.weight.medium};
  }
`;

export const CrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Separator = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`;
