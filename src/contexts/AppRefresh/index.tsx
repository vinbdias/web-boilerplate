import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";

interface AppRefreshContextValue {
  refreshKey: number;
  triggerAppRefresh: () => void;
  clearAppCache: () => void;
  reloadApp: () => void;
}

const AppRefreshContext = createContext<AppRefreshContextValue | null>(null);

/**
 * Global SPA reload helpers: bump a key to remount subtrees, clear react-query
 * cache, or hard-reload the window.
 */
export function AppRefreshProvider({ children }: { children: ReactNode }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const queryClient = useQueryClient();

  const clearAppCache = useCallback(() => {
    void queryClient.cancelQueries();
    queryClient.removeQueries();
    queryClient.clear();
  }, [queryClient]);

  const triggerAppRefresh = useCallback(() => {
    clearAppCache();
    setRefreshKey((key) => key + 1);
  }, [clearAppCache]);

  const reloadApp = useCallback(() => {
    clearAppCache();
    window.location.reload();
  }, [clearAppCache]);

  const value = useMemo(
    () => ({ refreshKey, triggerAppRefresh, clearAppCache, reloadApp }),
    [refreshKey, triggerAppRefresh, clearAppCache, reloadApp],
  );

  return <AppRefreshContext.Provider value={value}>{children}</AppRefreshContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppRefresh(): AppRefreshContextValue {
  const context = useContext(AppRefreshContext);
  if (!context) throw new Error("useAppRefresh must be used within AppRefreshProvider");
  return context;
}
