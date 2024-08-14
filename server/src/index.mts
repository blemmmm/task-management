import process from "node:process";

import Fastify from "fastify";

import cors from "@fastify/cors";

import { pgdb } from "./postgres.mjs";

import type { Task } from "./postgres.mjs";

const fastify = Fastify({ logger: true });

await fastify.register(cors, {
  origin: true,
});

fastify.get("/", () => {
  return { hello: "world" };
});

fastify.get("/api/tasks", async () => {
  const tasks = await pgdb
    .selectFrom("tasks")
    .selectAll()
    .orderBy("created_at", "desc")
    .execute();
  return tasks;
});

fastify.post("/api/tasks", async (request) => {
  const task = await pgdb
    .insertInto("tasks")
    .values(request.body as Task)
    .returningAll()
    .executeTakeFirstOrThrow();

  return task;
});

fastify.put<{ Params: { id: string } }>(
  "/api/tasks/:id",
  {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
    },
  },
  async (request) => {
    const { id } = request.params;
    const task = await pgdb
      .updateTable("tasks")
      .set(request.body as Task)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return task;
  },
);

fastify.delete<{ Params: { id: string } }>(
  "/api/tasks/:id",
  async (request) => {
    const { id } = request.params;
    const task = await pgdb
      .deleteFrom("tasks")
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return task;
  },
);

try {
  await fastify.listen({ port: 8080 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
