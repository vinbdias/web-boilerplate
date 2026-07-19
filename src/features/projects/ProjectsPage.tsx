import { useState } from "react";
import {
  Badge,
  Button,
  ConfirmDialog,
  PaginationControls,
  Skeleton,
  Table,
  useToast,
  type Column,
} from "@/components";
import { ApiError } from "@/api/callApi";
import type { Project } from "./api";
import { useDeleteProject, useProjects } from "./queries";
import { ProjectFormModal } from "./ProjectFormModal";
import "./ProjectsPage.css";

const statusTone = {
  draft: "neutral",
  active: "success",
  archived: "warning",
} as const;

export function ProjectsPage() {
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<Project | null>(null);

  const { data, isPending, isError, error } = useProjects({ page, limit: 10, sort: "name" });
  const deleteMutation = useDeleteProject();
  const { showToast } = useToast();

  const columns: Column<Project>[] = [
    { key: "name", header: "Name", render: (project) => project.name },
    {
      key: "status",
      header: "Status",
      width: "120px",
      render: (project) => <Badge tone={statusTone[project.status]}>{project.status}</Badge>,
    },
    {
      key: "description",
      header: "Description",
      render: (project) => project.description || <span className="projects__muted">—</span>,
    },
    {
      key: "actions",
      header: "",
      width: "160px",
      render: (project) => (
        <div className="projects__row-actions">
          <Button variant="ghost" size="sm" onClick={() => setEditing(project)}>
            Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleting(project)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="projects">
      <div className="projects__header">
        <h1 className="projects__title">Projects</h1>
        <Button onClick={() => setCreating(true)}>New project</Button>
      </div>

      {isPending ? (
        <div className="projects__loading">
          <Skeleton height="2.5rem" />
          <Skeleton height="2.5rem" />
          <Skeleton height="2.5rem" />
        </div>
      ) : isError ? (
        <p role="alert" className="projects__error">
          {error instanceof ApiError ? error.message : "Failed to load projects."}
        </p>
      ) : (
        <>
          <Table columns={columns} rows={data.items} rowKey={(project) => project.id} />
          {data.pagination && (
            <PaginationControls
              page={data.pagination.page}
              limit={data.pagination.limit}
              total={data.pagination.total}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      <ProjectFormModal open={creating} project={null} onClose={() => setCreating(false)} />
      <ProjectFormModal
        open={editing !== null}
        project={editing}
        onClose={() => setEditing(null)}
      />

      <ConfirmDialog
        open={deleting !== null}
        title="Delete project"
        message={`Are you sure you want to delete "${deleting?.name}"? This cannot be undone.`}
        confirmLabel="Delete"
        danger
        loading={deleteMutation.isPending}
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (!deleting) return;
          deleteMutation.mutate(deleting.id, {
            onSuccess: () => {
              showToast("Project deleted.", "success");
              setDeleting(null);
            },
            onError: () => showToast("Failed to delete project.", "danger"),
          });
        }}
      />
    </div>
  );
}
