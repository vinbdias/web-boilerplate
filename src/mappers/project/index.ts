import type { SearchResultItem } from "@/types";
import type { Project } from "@/features/projects/api";
import { formatToDDMMYYYY } from "@/utils/date";
import { truncateText } from "@/utils/string";
import type { ProjectTableRow } from "@/models/Project";

const STATUS_LABEL: Record<Project["status"], string> = {
  draft: "Draft",
  active: "Active",
  archived: "Archived",
};

/** API/view-model → TableData row. Keep formatting here, not in the page. */
export function mapProjectToTableRow(project: Project): ProjectTableRow {
  return {
    id: project.id,
    name: project.name,
    status: project.status,
    statusLabel: STATUS_LABEL[project.status],
    description: truncateText(project.description || "—", 80),
    createdAt: formatToDDMMYYYY(project.createdAt),
  };
}

/** API/view-model → SearchBarAdvanced / SearchBarTable item. */
export function mapProjectToSearchItem(project: Project): SearchResultItem {
  return {
    id: project.id,
    label: project.name,
    description: STATUS_LABEL[project.status],
    payload: project,
  };
}
