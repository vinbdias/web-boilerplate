import { Component, type ErrorInfo, type ReactNode } from "react";
import { Alert } from "./Alert";
import { Button } from "./Button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Hook your observability tool here (e.g. Sentry.captureException).
    console.error("Unhandled render error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div style={{ padding: "var(--space-6)" }}>
            <Alert tone="danger" title="Something went wrong">
              <p>An unexpected error occurred while rendering this section.</p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => this.setState({ hasError: false })}
                style={{ marginTop: "var(--space-3)" }}
              >
                Try again
              </Button>
            </Alert>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
