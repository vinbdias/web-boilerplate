import "./Spinner.css";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function Spinner({ size = "md", label }: SpinnerProps) {
  return (
    <span className={`ui-spinner ui-spinner--${size}`} role="status" aria-live="polite">
      <span className="ui-spinner__circle" aria-hidden="true" />
      {label ? <span className="ui-spinner__label">{label}</span> : <span className="sr-only">Loading</span>}
    </span>
  );
}
