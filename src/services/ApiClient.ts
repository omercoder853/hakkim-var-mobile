import { BASE_URL } from '../constants/ApiConfig';

type RequestOptions = Omit<RequestInit, 'headers' | 'signal'> & {
  headers?: Record<string, string>;
};

export type ApiResponse<T = unknown> = {
  ok: boolean;
  status: number;
  data: T | null;
};

const TIMEOUT = 15_000;

async function request(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    let data: unknown = null;
    const text = await response.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    const isTimeout =
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      error.name === 'AbortError';

    return {
      ok: false,
      status: isTimeout ? 408 : 0,
      data: null,
    };
  } finally {
    clearTimeout(timer);
  }
}

function withJsonBody(body: unknown): { body?: string } {
  if (body === null || body === undefined) {
    return {};
  }

  const serializedBody = JSON.stringify(body);
  return serializedBody === undefined ? {} : { body: serializedBody };
}

export const apiClient = {
  get: (endpoint: string) => request(endpoint, { method: 'GET' }),
  post: (endpoint: string, body: unknown = null) =>
    request(endpoint, { method: 'POST', ...withJsonBody(body) }),
  delete: (endpoint: string, body: unknown = null) =>
    request(endpoint, { method: 'DELETE', ...withJsonBody(body) }),
  patch: (endpoint: string, body: unknown = null) =>
    request(endpoint, { method: 'PATCH', ...withJsonBody(body) }),
};
