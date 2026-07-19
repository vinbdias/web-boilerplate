// Thin, typed wrapper over the axios client that never throws.
// Every call resolves to a discriminated union, so callers handle failures
// with type narrowing instead of try/catch trees.
import { isAxiosError } from "axios";
import { api } from "./client";

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  sort: string;
  direction: "asc" | "desc";
}

export interface ApiSuccess<T> {
  ok: true;
  status: number;
  data: T;
  meta?: { pagination?: Pagination };
}

export interface ApiFailure {
  ok: false;
  status: number;
  error: {
    code: string;
    message: string;
    /** Present on validation_failed: field name -> rule -> message. */
    fields?: Record<string, Record<string, string>>;
  };
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

type Method = "get" | "post" | "put" | "patch" | "delete";

interface ErrorBody {
  error?: {
    code?: string;
    message?: string;
    details?: { fields?: Record<string, Record<string, string>> };
  };
}

export async function callApi<T>(
  method: Method,
  url: string,
  body?: unknown,
  options?: { params?: Record<string, unknown>; signal?: AbortSignal },
): Promise<ApiResult<T>> {
  try {
    const response = await api.request<{ data: T; meta?: { pagination?: Pagination } }>({
      method,
      url,
      data: body,
      params: options?.params,
      signal: options?.signal,
    });

    return {
      ok: true,
      status: response.status,
      data: response.data.data,
      meta: response.data.meta,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? 0;
      const payload = error.response?.data as ErrorBody | undefined;

      return {
        ok: false,
        status,
        error: {
          code: payload?.error?.code ?? (status === 0 ? "network_error" : "unknown_error"),
          message:
            payload?.error?.message ??
            (status === 0 ? "Could not reach the server." : "An unexpected error occurred."),
          fields: payload?.error?.details?.fields,
        },
      };
    }

    return {
      ok: false,
      status: 0,
      error: { code: "unexpected_error", message: "An unexpected error occurred." },
    };
  }
}

/** Unwraps a result or throws — for TanStack Query, which expects rejections. */
export async function callApiOrThrow<T>(
  method: Method,
  url: string,
  body?: unknown,
  options?: { params?: Record<string, unknown>; signal?: AbortSignal },
): Promise<ApiSuccess<T>> {
  const result = await callApi<T>(method, url, body, options);
  if (!result.ok) {
    throw new ApiError(result);
  }
  return result;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fields?: Record<string, Record<string, string>>;

  constructor(failure: ApiFailure) {
    super(failure.error.message);
    this.name = "ApiError";
    this.status = failure.status;
    this.code = failure.error.code;
    this.fields = failure.error.fields;
  }
}
