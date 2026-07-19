// API layer for the example resource: DTOs (wire format), runtime schemas and
// mappers to view models. Replace `projects` with your own domain following
// the same pattern.
import { z } from "zod";
import { callApiOrThrow, type Pagination } from "@/api/callApi";

// --- Wire DTO (matches docs/openapi.yaml of the API) ---------------------
const projectDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(["draft", "active", "archived"]),
  description: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ProjectDto = z.infer<typeof projectDtoSchema>;
export type ProjectStatus = ProjectDto["status"];

// --- View model -----------------------------------------------------------
export interface Project {
  id: number;
  name: string;
  status: ProjectStatus;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export function toProject(dto: ProjectDto): Project {
  return {
    id: dto.id,
    name: dto.name,
    status: dto.status,
    description: dto.description ?? "",
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  };
}

// --- Requests --------------------------------------------------------------
export interface ProjectListParams {
  page?: number;
  limit?: number;
  sort?: "id" | "name" | "status" | "created" | "modified";
  direction?: "asc" | "desc";
}

export interface ProjectInput {
  name: string;
  status: ProjectStatus;
  description?: string;
}

export async function fetchProjects(
  params: ProjectListParams,
  signal?: AbortSignal,
): Promise<{ items: Project[]; pagination?: Pagination }> {
  const result = await callApiOrThrow<ProjectDto[]>("get", "/projects", undefined, {
    params: { ...params },
    signal,
  });

  const items = z.array(projectDtoSchema).parse(result.data).map(toProject);
  return { items, pagination: result.meta?.pagination };
}

export async function fetchProject(id: number, signal?: AbortSignal): Promise<Project> {
  const result = await callApiOrThrow<ProjectDto>("get", `/projects/${id}`, undefined, { signal });
  return toProject(projectDtoSchema.parse(result.data));
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const result = await callApiOrThrow<ProjectDto>("post", "/projects", input);
  return toProject(projectDtoSchema.parse(result.data));
}

export async function updateProject(id: number, input: Partial<ProjectInput>): Promise<Project> {
  const result = await callApiOrThrow<ProjectDto>("put", `/projects/${id}`, input);
  return toProject(projectDtoSchema.parse(result.data));
}

export async function deleteProject(id: number): Promise<void> {
  await callApiOrThrow("delete", `/projects/${id}`);
}
