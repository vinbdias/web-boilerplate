import { useId, type ReactNode } from "react";
import "./Tooltip.css";

export interface TooltipProps {
  content: string;
  children: ReactNode;
}

/** Shows on hover and keyboard focus; content is announced via aria-describedby. */
export function Tooltip({ content, children }: TooltipProps) {
  const id = useId();

  return (
    <span className="ui-tooltip" aria-describedby={id}>
      {children}
      <span className="ui-tooltip__bubble" role="tooltip" id={id}>
        {content}
      </span>
    </span>
  );
}
