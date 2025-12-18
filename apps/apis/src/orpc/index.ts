import type { Context } from "./context";
import { os } from "@orpc/server";

export const orpc = os.$context<Context>();
