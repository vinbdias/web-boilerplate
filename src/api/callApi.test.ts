import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/test/server";
import { callApi, ApiError, callApiOrThrow } from "./callApi";

describe("callApi", () => {
  it("returns ok with data and meta on success", async () => {
    const result = await callApi<unknown[]>("get", "/projects");

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toHaveLength(1);
      expect(result.meta?.pagination?.total).toBe(1);
    }
  });

  it("normalizes the error envelope on failure", async () => {
    server.use(
      http.get("*/projects", () =>
        HttpResponse.json(
          { error: { code: "forbidden", message: "You cannot access this." } },
          { status: 403 },
        ),
      ),
    );

    const result = await callApi("get", "/projects");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(403);
      expect(result.error.code).toBe("forbidden");
      expect(result.error.message).toBe("You cannot access this.");
    }
  });

  it("extracts validation field errors", async () => {
    server.use(
      http.post("*/projects", () =>
        HttpResponse.json(
          {
            error: {
              code: "validation_failed",
              message: "The request payload failed validation.",
              details: { fields: { name: { _required: "Name is required" } } },
            },
          },
          { status: 422 },
        ),
      ),
    );

    const result = await callApi("post", "/projects", {});

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.fields?.name?._required).toBe("Name is required");
    }
  });

  it("callApiOrThrow throws ApiError with status and code", async () => {
    server.use(
      http.get("*/projects", () =>
        HttpResponse.json({ error: { code: "not_found", message: "Missing" } }, { status: 404 }),
      ),
    );

    await expect(callApiOrThrow("get", "/projects")).rejects.toMatchObject({
      name: "ApiError",
      status: 404,
      code: "not_found",
    });
    await expect(callApiOrThrow("get", "/projects")).rejects.toBeInstanceOf(ApiError);
  });
});
