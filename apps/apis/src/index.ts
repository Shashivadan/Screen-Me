import { RPCHandler } from "@orpc/server/fetch";
import { CORSPlugin } from "@orpc/server/plugins";
import { onError } from "@orpc/server";
import { router } from "./router/index";
import { Hono } from "hono";
import { createContext } from "./orpc/context";
import consola from "./utils/console";
import { nodeEnv } from "./utils/env";

const app = new Hono();

const handler = new RPCHandler(router, {
  plugins: [new CORSPlugin()],
  interceptors: [
    onError((error: unknown) => {
      console.error(error);
    }),
  ],
});

app.use("/rpc/*", async (c, next) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/rpc",
    context: createContext(c),
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }

  await next();
});


export default {
  fetch: app.fetch,
  port: process.env.PORT
    ? Number(process.env.PORT)
    : nodeEnv === "test"
      ? 3000
      : 3000,
};
