import styled, { css } from "styled-components";

export const Root = styled.div`
  position: relative;
  width: 100%;
`;

export const InputWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const IconButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.space[2]};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  padding: ${({ theme }) => theme.space[1]};
  border-radius: ${({ theme }) => theme.radius.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

export const Field = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
  padding-right: ${({ theme }) => theme.space[8]};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radius.md};

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) => theme.focusRing};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.surfaceHover};
    cursor: not-allowed;
  }
`;

export const Calendar = styled.div<{ $top: number; $left: number }>`
  position: fixed;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  width: 280px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  padding: ${({ theme }) => theme.space[3]};
  z-index: 1000;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

export const MonthLabel = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  font-size: ${({ theme }) => theme.font.size.sm};
`;

export const NavButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.space[1]};
  border-radius: ${({ theme }) => theme.radius.sm};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: ${({ theme }) => theme.space[1]};
`;

export const Weekday = styled.span`
  text-align: center;
  font-size: ${({ theme }) => theme.font.size.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  padding: ${({ theme }) => theme.space[1]};
`;

export const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export const DayCell = styled.button<{
  $outside?: boolean;
  $selected?: boolean;
  $inRange?: boolean;
  $rangeStart?: boolean;
  $rangeEnd?: boolean;
  $today?: boolean;
}>`
  aspect-ratio: 1;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: ${({ theme }) => theme.font.size.sm};
  cursor: pointer;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  ${({ $outside, theme }) =>
    $outside &&
    css`
      color: ${theme.colors.textMuted};
    `}

  ${({ $today, theme }) =>
    $today &&
    css`
      font-weight: ${theme.font.weight.semibold};
      box-shadow: inset 0 0 0 1px ${theme.colors.borderStrong};
    `}

  ${({ $inRange, theme }) =>
    $inRange &&
    css`
      background: ${theme.colors.accentSubtle};
    `}

  ${({ $selected, $rangeStart, $rangeEnd, theme }) =>
    ($selected || $rangeStart || $rangeEnd) &&
    css`
      background: ${theme.colors.accent};
      color: ${theme.colors.textInverse};
    `}

  &:hover:not(:disabled) {
    background: ${({ theme, $selected, $rangeStart, $rangeEnd }) =>
      $selected || $rangeStart || $rangeEnd ? theme.colors.accentHover : theme.colors.surfaceHover};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;
