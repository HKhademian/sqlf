import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import { SelectQueryBuilder } from "./select.ts";
import { InsertQueryBuilder } from "./insert.ts";
import { UpdateQueryBuilder } from "./update.ts";

export const selectFrom = <T>(...tables: string[]) =>
  new SelectQueryBuilder<T>(tables);
export const insertInto = <T>(table: string) =>
  new InsertQueryBuilder<T>(table);
export const updateTable = <T>(table: string) =>
  new UpdateQueryBuilder<T>(table);

export class PgClient {
  constructor(public pool: Pool) {}
  selectFrom = <T>(...tables: string[]) =>
    new SelectQueryBuilder<T>(tables, this.pool);
  insertInto = <T>(table: string) =>
    new InsertQueryBuilder<T>(table, this.pool);
  updateTable = <T>(table: string) =>
    new UpdateQueryBuilder<T>(table, this.pool);
}
