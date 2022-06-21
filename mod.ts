import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import { SelectQueryBuilder } from "./select.ts";
import { InsertQueryBuilder } from "./insert.ts";
import { UpdateQueryBuilder } from "./update.ts";
import { DefaultTable } from "./base.ts";

export const selectFrom = <T = DefaultTable>(...tables: string[]) =>
  new SelectQueryBuilder<T>(tables);
export const insertInto = <T = DefaultTable>(table: string) =>
  new InsertQueryBuilder<T>(table);
export const updateTable = <T = DefaultTable>(table: string) =>
  new UpdateQueryBuilder<T>(table);

export class PgClient {
  constructor(public pool: Pool) {}
  selectFrom = <T = DefaultTable>(...tables: string[]) =>
    new SelectQueryBuilder<T>(tables, this.pool);
  insertInto = <T = DefaultTable>(table: string) =>
    new InsertQueryBuilder<T>(table, this.pool);
  updateTable = <T = DefaultTable>(table: string) =>
    new UpdateQueryBuilder<T>(table, this.pool);
}
