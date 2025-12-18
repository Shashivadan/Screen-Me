import type { Context as HonoContext } from "hono";

export function createContext(c: HonoContext) {
  const cookie = c.req.header("Cookie");
  const authorization = c.req.header("Authorization");

  const headers: Record<string, string | undefined> = {};

  if (cookie) headers["cookie"] = cookie;

  if (authorization) headers["authorization"] = authorization;

  return {
    headers,
    setHeader: (key: string, value: string) => {
      c.res.headers.set(key, value);
    },
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
