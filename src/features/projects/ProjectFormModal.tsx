import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, FormField, Input, Modal, Select, TextArea, useSnackbar } from "@/components";
import { ApiError } from "@/api/callApi";
import type { Project } from "./api";
import { useCreateProject, useUpdateProject } from "./queries";

const projectSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  status: z.enum(["draft", "active", "archived"]),
  description: z.string().max(2000).optional(),
});

type ProjectValues = z.infer<typeof projectSchema>;

interface ProjectFormModalProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
}

export function ProjectFormModal({ open, project, onClose }: ProjectFormModalProps) {
  const isEdit = project !== null;
  const { showSnackbar } = useSnackbar();

  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject(project?.id ?? 0);
  const mutation = isEdit ? updateMutation : createMutation;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: "", status: "draft", description: "" },
  });

  useEffect(() => {
    if (open) {
      reset(
        project
          ? { name: project.name, status: project.status, description: project.description }
          : { name: "", status: "draft", description: "" },
      );
    }
  }, [open, project, reset]);

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values, {
      onSuccess: () => {
        showSnackbar(isEdit ? "Project updated." : "Project created.", "success");
        onClose();
      },
      onError: (error) => {
        // Map API field errors back onto the form when possible.
        if (error instanceof ApiError && error.fields) {
          for (const [field, rules] of Object.entries(error.fields)) {
            const message = Object.values(rules)[0];
            if (message && (field === "name" || field === "status" || field === "description")) {
              setError(field, { type: "server", message });
            }
          }
        } else {
          showSnackbar("Failed to save project.", "error");
        }
      },
    });
  });

  return (
    <Modal
      open={open}
      title={isEdit ? "Edit project" : "New project"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button type="submit" form="project-form" loading={mutation.isPending}>
            {isEdit ? "Save changes" : "Create"}
          </Button>
        </>
      }
    >
      <form
        id="project-form"
        onSubmit={onSubmit}
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}
      >
        <FormField label="Name" error={errors.name?.message} required>
          {(fieldProps) => <Input {...fieldProps} {...register("name")} />}
        </FormField>

        <FormField label="Status" error={errors.status?.message} required>
          {(fieldProps) => (
            <Select {...fieldProps} {...register("status")}>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </Select>
          )}
        </FormField>

        <FormField label="Description" error={errors.description?.message}>
          {(fieldProps) => <TextArea {...fieldProps} rows={3} {...register("description")} />}
        </FormField>
      </form>
    </Modal>
  );
}
