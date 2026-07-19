import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import dayjs, { type Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { MONTHS_PT, WEEKDAYS_PT } from "@/config/constants";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { usePortalAnchor } from "@/hooks/usePortalAnchor";
import { formatToDDMMYYYY, parseDate } from "@/utils/date";
import { maskDateDMY } from "@/utils/mask";
import { FaIcon } from "../FaIcon";
import {
  Calendar,
  CalendarHeader,
  DayCell,
  Days,
  Field,
  IconButton,
  InputWrap,
  MonthLabel,
  NavButton,
  Root,
  Weekday,
  Weekdays,
} from "./styles";

dayjs.extend(customParseFormat);

export type DateRestrictionMode = "none" | "pastOnly" | "futureOnly";

export interface DatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  minDate?: string;
  maxDate?: string;
  restrictionMode?: DateRestrictionMode;
  name?: string;
}

function isDisabledDay(day: Dayjs, min?: Dayjs | null, max?: Dayjs | null, mode?: DateRestrictionMode) {
  const today = dayjs().startOf("day");
  if (mode === "pastOnly" && day.isAfter(today, "day")) return true;
  if (mode === "futureOnly" && day.isBefore(today, "day")) return true;
  if (min && day.isBefore(min, "day")) return true;
  if (max && day.isAfter(max, "day")) return true;
  return false;
}

/** Single-date picker. Value format: DD/MM/YYYY. Calendar portals to document.body. */
export function DatePicker({
  value = "",
  onChange,
  placeholder = "DD/MM/YYYY",
  disabled,
  readOnly,
  minDate,
  maxDate,
  restrictionMode = "none",
  name,
}: DatePickerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const selected = parseDate(value);
  const [cursor, setCursor] = useState<Dayjs>(selected ?? dayjs());

  const min = parseDate(minDate ?? null);
  const max = parseDate(maxDate ?? null);
  const position = usePortalAnchor(inputRef, open);
  useOnClickOutside(rootRef, () => setOpen(false));

  const days = useMemo(() => {
    const start = cursor.startOf("month").startOf("week");
    return Array.from({ length: 42 }, (_, i) => start.add(i, "day"));
  }, [cursor]);

  function commit(day: Dayjs) {
    onChange?.(formatToDDMMYYYY(day));
    setOpen(false);
  }

  return (
    <Root ref={rootRef}>
      <InputWrap>
        <Field
          ref={inputRef}
          name={name}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            if (readOnly) return;
            onChange?.(maskDateDMY(event.target.value));
          }}
          onFocus={() => !disabled && !readOnly && setOpen(true)}
          onBlur={() => {
            if (value && value.length === 10 && !parseDate(value)) onChange?.("");
          }}
        />
        <IconButton
          type="button"
          disabled={disabled || readOnly}
          aria-label="Open calendar"
          onClick={() => setOpen((v) => !v)}
        >
          <FaIcon name="calendar" size="sm" />
        </IconButton>
      </InputWrap>

      {open &&
        position &&
        createPortal(
          <Calendar $top={position.top} $left={position.left}>
            <CalendarHeader>
              <NavButton
                type="button"
                aria-label="Previous month"
                onClick={() => setCursor((c) => c.subtract(1, "month"))}
              >
                <FaIcon name="chevronLeft" size="sm" />
              </NavButton>
              <MonthLabel>
                {MONTHS_PT[cursor.month()]} {cursor.year()}
              </MonthLabel>
              <NavButton
                type="button"
                aria-label="Next month"
                onClick={() => setCursor((c) => c.add(1, "month"))}
              >
                <FaIcon name="chevronRight" size="sm" />
              </NavButton>
            </CalendarHeader>
            <Weekdays>
              {WEEKDAYS_PT.map((label) => (
                <Weekday key={label}>{label}</Weekday>
              ))}
            </Weekdays>
            <Days>
              {days.map((day) => {
                const outside = day.month() !== cursor.month();
                const selectedDay = selected?.isSame(day, "day") ?? false;
                const today = day.isSame(dayjs(), "day");
                const disabledDay = isDisabledDay(day, min, max, restrictionMode);
                return (
                  <DayCell
                    key={day.toISOString()}
                    type="button"
                    disabled={disabledDay}
                    $outside={outside}
                    $selected={selectedDay}
                    $today={today}
                    onClick={() => commit(day)}
                  >
                    {day.date()}
                  </DayCell>
                );
              })}
            </Days>
          </Calendar>,
          document.body,
        )}
    </Root>
  );
}
