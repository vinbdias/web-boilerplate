// Query keys factory + hooks. Keys are hierarchical so invalidation can be as
// broad (all projects) or narrow (one project) as needed.
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { cacheProfiles } from "@/queries/cacheProfiles";
import {
  createProject,
  deleteProject,
  fetchProject,
  fetchProjects,
  updateProject,
  type ProjectInput,
  type ProjectListParams,
} from "./api";

export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  list: (params: ProjectListParams) => [...projectKeys.lists(), params] as const,
  details: () => [...projectKeys.all, "detail"] as const,
  detail: (id: number) => [...projectKeys.details(), id] as const,
};

export function useProjects(params: ProjectListParams) {
  return useQuery({
    queryKey: projectKeys.list(params),
    queryFn: ({ signal }) => fetchProjects(params, signal),
    ...cacheProfiles.medium,
  });
}

export function useProject(id: number) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: ({ signal }) => fetchProject(id, signal),
    ...cacheProfiles.medium,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ProjectInput) => createProject(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

export function useUpdateProject(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Partial<ProjectInput>) => updateProject(id, input),
    onSuccess: (project) => {
      queryClient.setQueryData(projectKeys.detail(id), project);
      void queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProject(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: projectKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}
