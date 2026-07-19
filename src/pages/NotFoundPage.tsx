import { Link } from "react-router-dom";
import { Button, EmptyState } from "@/components";

export function NotFoundPage() {
  return (
    <div className="splash">
      <EmptyState
        title="Page not found"
        description="The page you are looking for does not exist or has been moved."
        action={
          <Link to="/">
            <Button variant="secondary">Back to dashboard</Button>
          </Link>
        }
      />
    </div>
  );
}
