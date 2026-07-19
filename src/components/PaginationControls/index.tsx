import { Button } from "../Button";
import { Buttons, Info, Nav } from "./styles";

export interface PaginationControlsProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({ page, limit, total, onPageChange }: PaginationControlsProps) {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <Nav aria-label="Pagination">
      <Info>
        Page {page} of {totalPages} ({total} items)
      </Info>
      <Buttons>
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </Buttons>
    </Nav>
  );
}
