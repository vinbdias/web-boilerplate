import type { TableRow } from "@/components/TableData";
import type { ProjectStatus } from "@/features/projects/api";

/** UI-shaped row for TableData — never serialize API DTOs directly into the grid. */
export interface ProjectTableRow extends TableRow {
  id: number;
  name: string;
  status: ProjectStatus;
  statusLabel: string;
  description: string;
  createdAt: string;
}
