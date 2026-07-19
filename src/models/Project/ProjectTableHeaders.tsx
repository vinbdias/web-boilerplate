import { Badge } from "@/components";
import type { TableHeaders } from "@/components/TableData";
import type { ProjectTableRow } from "./ProjectTableRow";

const STATUS_TONE = {
  draft: "neutral",
  active: "success",
  archived: "warning",
} as const;

/** Column config for the projects example table. */
export const ProjectTableHeaders: TableHeaders = [
  { name: "name", label: "Name", sortable: true },
  {
    name: "status",
    label: "Status",
    width: "120px",
    sortable: true,
    renderCell: (row) => {
      const project = row as ProjectTableRow;
      return <Badge tone={STATUS_TONE[project.status]}>{project.statusLabel}</Badge>;
    },
  },
  { name: "description", label: "Description", wrap: true },
  { name: "createdAt", label: "Created", width: "120px", sortable: true },
];
