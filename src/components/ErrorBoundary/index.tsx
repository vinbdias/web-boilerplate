import { Component, type ErrorInfo, type ReactNode } from "react";
import { Alert } from "../Alert";
import { Button } from "../Button";
import { Fallback, RetryWrapper } from "./styles";

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
          <Fallback>
            <Alert tone="danger" title="Something went wrong">
              <p>An unexpected error occurred while rendering this section.</p>
              <RetryWrapper>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => this.setState({ hasError: false })}
                >
                  Try again
                </Button>
              </RetryWrapper>
            </Alert>
          </Fallback>
        )
      );
    }

    return this.props.children;
  }
}
