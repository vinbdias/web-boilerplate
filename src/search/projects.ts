import { fetchProjects, type Project } from "@/features/projects/api";

/**
 * Search factory pattern:
 *   searchProjectsFn(config) => (query) => Promise<Project[]>
 *
 * Factories know services only — never UI. Mapping happens at the call site
 * (or in a dedicated mapper) so the same searchFn can feed different components.
 */
export interface SearchProjectsConfig {
  limit?: number;
  status?: Project["status"];
}

export function searchProjectsFn(config: SearchProjectsConfig = {}) {
  const { limit = 10, status } = config;

  return async (query: string): Promise<Project[]> => {
    const term = query.trim();
    if (!term) return [];

    try {
      const { items } = await fetchProjects({ page: 1, limit, sort: "name", direction: "asc" });
      return items.filter((project) => {
        if (status && project.status !== status) return false;
        return project.name.toLowerCase().includes(term.toLowerCase());
      });
    } catch {
      return [];
    }
  };
}
