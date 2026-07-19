import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import dayjs, { type Dayjs } from "dayjs";
import { MONTHS_PT, WEEKDAYS_PT } from "@/config/constants";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { usePortalAnchor } from "@/hooks/usePortalAnchor";
import { formatToDDMMYYYY, parseDate } from "@/utils/date";
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
} from "../DatePicker/styles";

export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onClose?: (range: DateRange) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
  name?: string;
}

/** Two-click date range picker. Values are DD/MM/YYYY strings. */
export function DateRangePicker({
  value = { startDate: null, endDate: null },
  onClose,
  placeholder = "Select period",
  disabled,
  minDate,
  maxDate,
  name,
}: DateRangePickerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<DateRange>(value);
  const start = parseDate(draft.startDate);
  const [cursor, setCursor] = useState<Dayjs>(start ?? dayjs());
  const lastEmitted = useRef<string>("");

  const min = parseDate(minDate ?? null);
  const max = parseDate(maxDate ?? null);
  const position = usePortalAnchor(inputRef, open);
  useOnClickOutside(rootRef, () => {
    if (open) {
      emitIfChanged(draft);
      setOpen(false);
    }
  });

  const days = useMemo(() => {
    const begin = cursor.startOf("month").startOf("week");
    return Array.from({ length: 42 }, (_, i) => begin.add(i, "day"));
  }, [cursor]);

  function emitIfChanged(range: DateRange) {
    const key = `${range.startDate}|${range.endDate}`;
    if (key === lastEmitted.current) return;
    lastEmitted.current = key;
    onClose?.(range);
  }

  function pick(day: Dayjs) {
    if (min && day.isBefore(min, "day")) return;
    if (max && day.isAfter(max, "day")) return;

    if (!draft.startDate || (draft.startDate && draft.endDate)) {
      setDraft({ startDate: formatToDDMMYYYY(day), endDate: null });
      return;
    }

    const startDay = parseDate(draft.startDate)!;
    let next: DateRange;
    if (day.isBefore(startDay, "day")) {
      next = { startDate: formatToDDMMYYYY(day), endDate: draft.startDate };
    } else {
      next = { startDate: draft.startDate, endDate: formatToDDMMYYYY(day) };
    }
    setDraft(next);
    emitIfChanged(next);
    setOpen(false);
  }

  const display =
    draft.startDate && draft.endDate
      ? `${draft.startDate} - ${draft.endDate}`
      : draft.startDate
        ? `${draft.startDate} - …`
        : "";

  const end = parseDate(draft.endDate);

  return (
    <Root ref={rootRef}>
      <InputWrap>
        <Field
          ref={inputRef}
          name={name}
          readOnly
          disabled={disabled}
          placeholder={placeholder}
          value={display}
          onFocus={() => {
            if (disabled) return;
            setDraft(value);
            setOpen(true);
          }}
        />
        <IconButton
          type="button"
          disabled={disabled}
          aria-label="Open date range calendar"
          onClick={() => {
            setDraft(value);
            setOpen((v) => !v);
          }}
        >
          <FaIcon name="calendarDays" size="sm" />
        </IconButton>
      </InputWrap>

      {open &&
        position &&
        createPortal(
          <Calendar $top={position.top} $left={position.left}>
            <CalendarHeader>
              <NavButton type="button" onClick={() => setCursor((c) => c.subtract(1, "month"))}>
                <FaIcon name="chevronLeft" size="sm" />
              </NavButton>
              <MonthLabel>
                {MONTHS_PT[cursor.month()]} {cursor.year()}
              </MonthLabel>
              <NavButton type="button" onClick={() => setCursor((c) => c.add(1, "month"))}>
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
                const rangeStart = start?.isSame(day, "day") ?? false;
                const rangeEnd = end?.isSame(day, "day") ?? false;
                const inRange =
                  Boolean(start && end) &&
                  day.isAfter(start!, "day") &&
                  day.isBefore(end!, "day");
                const disabledDay =
                  (min && day.isBefore(min, "day")) || (max && day.isAfter(max, "day"));
                return (
                  <DayCell
                    key={day.toISOString()}
                    type="button"
                    disabled={Boolean(disabledDay)}
                    $outside={outside}
                    $rangeStart={rangeStart}
                    $rangeEnd={rangeEnd}
                    $inRange={inRange}
                    $today={day.isSame(dayjs(), "day")}
                    onClick={() => pick(day)}
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
