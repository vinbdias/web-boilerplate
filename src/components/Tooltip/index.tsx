import { useId, type ReactNode } from "react";
import { Bubble, Root } from "./styles";

export interface TooltipProps {
  content: string;
  children: ReactNode;
}

/** Shows on hover and keyboard focus; content is announced via aria-describedby. */
export function Tooltip({ content, children }: TooltipProps) {
  const id = useId();

  return (
    <Root aria-describedby={id}>
      {children}
      <Bubble role="tooltip" id={id}>
        {content}
      </Bubble>
    </Root>
  );
}
