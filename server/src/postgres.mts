import process from "node:process";

import { Kysely } from "kysely";
import { PostgresJSDialect } from "kysely-postgres-js";
import * as luxon from "luxon";
import postgres from "postgres";

const POSTGRES_HOST = process.env.POSTGRES_HOST || "localhost";
const POSTGRES_PORT = Number(process.env.POSTGRES_PORT) || 5432;
const POSTGRES_DB = process.env.POSTGRES_DB || "postgres";
const POSTGRES_USER = process.env.POSTGRES_USER || "postgres";
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "postgres";

export interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  created_at: string;
}

export interface KyselyDatabase {
  tasks: Task;
}

export const pgc = postgres({
  database: POSTGRES_DB,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  max: 10,
  types: {
    date: {
      to: 1082, // date
      from: [1082], // date
      /**
       * TypeScript to PostgreSQL
       */
      serialize: (value: string) => {
        if (typeof value === "string") {
          return luxon.DateTime.fromISO(value).toSQL() as string;
        }
        return value;
      },
      /**
       * PostgreSQL to TypeScript
       */
      parse: (value: string) => {
        if (typeof value === "string") {
          return luxon.DateTime.fromSQL(value).toISODate() as string;
        }
        return value;
      },
    },
    timestamptz: {
      to: 1184, // timestamptz
      from: [1184], // timestamptz
      /**
       * TypeScript to PostgreSQL
       */
      serialize: (value: string) => {
        if (typeof value === "string") {
          return luxon.DateTime.fromISO(value).toSQL() as string;
        }
        return value;
      },
      /**
       * PostgreSQL to TypeScript
       */
      parse: (value: string) => {
        if (typeof value === "string") {
          return luxon.DateTime.fromSQL(value).toISO() as string;
        }
        return value;
      },
    },
  },
});

export const pgd = new PostgresJSDialect({ postgres: pgc });

export const pgdb = new Kysely<KyselyDatabase>({ dialect: pgd });
