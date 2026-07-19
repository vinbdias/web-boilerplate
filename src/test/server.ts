// MSW server with default handlers matching the API contract.
// Tests override handlers per-case with server.use(...).
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const demoUser = {
  id: 1,
  email: "demo@example.com",
  name: "Demo User",
  roles: ["admin"],
};

export const handlers = [
  http.post("*/auth/refresh", () =>
    HttpResponse.json({ data: { accessToken: "test-token", user: demoUser } }),
  ),
  http.post("*/auth/login", () =>
    HttpResponse.json({ data: { accessToken: "test-token", user: demoUser } }),
  ),
  http.post("*/auth/logout", () => HttpResponse.json({ data: { loggedOut: true } })),
  http.get("*/projects", () =>
    HttpResponse.json({
      data: [
        {
          id: 1,
          name: "Alpha",
          status: "active",
          description: null,
          createdAt: "2026-01-01T00:00:00+00:00",
          updatedAt: "2026-01-01T00:00:00+00:00",
        },
      ],
      meta: { pagination: { page: 1, limit: 10, total: 1, sort: "name", direction: "asc" } },
    }),
  ),
];

export const server = setupServer(...handlers);
