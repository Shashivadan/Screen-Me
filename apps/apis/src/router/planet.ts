import type { IncomingHttpHeaders } from "node:http";
import { ORPCError, os } from "@orpc/server";
import * as z from "zod";

const PlanetSchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
  description: z.string().optional(),
});

export const listPlanet = os
  .input(
    z.object({
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.number().int().min(0).default(0),
    })
  )
  .output(z.array(PlanetSchema))
  .handler(async ({ input }) => {
    // your list code here
    return [{ id: 1, name: "name" }];
  });

export const findPlanet = os
  .input(PlanetSchema.pick({ id: true }))
  .output(PlanetSchema)
  .handler(async ({ input }) => {
    // your find code here
    return { id: 1, name: "name" };
  });

export const createPlanet = os
  .$context<{ headers: IncomingHttpHeaders }>()
  .output(z.object({ id: z.number().int().min(1), name: z.string() }))
  .input(PlanetSchema.omit({ id: true }))
  .handler(async ({ input }) => {
    // your create code here
    return { id: 1, name: input.name };
  });
