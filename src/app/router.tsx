import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RequireAuth } from "@/auth/RequireAuth";
import { Spinner } from "@/components";
import { AppShell } from "./AppShell";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

const ProjectsPage = lazy(() =>
  import("@/features/projects/ProjectsPage").then((module) => ({ default: module.ProjectsPage })),
);
const ShowcasePage = lazy(() =>
  import("@/pages/ShowcasePage").then((module) => ({ default: module.ShowcasePage })),
);

function LazyFallback() {
  return (
    <div className="splash">
      <Spinner size="lg" />
    </div>
  );
}

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: "/", element: <DashboardPage /> },
          {
            path: "/projects",
            element: (
              <Suspense fallback={<LazyFallback />}>
                <ProjectsPage />
              </Suspense>
            ),
          },
          {
            path: "/showcase",
            element: (
              <Suspense fallback={<LazyFallback />}>
                <ShowcasePage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
