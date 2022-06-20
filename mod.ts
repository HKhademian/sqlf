import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import { SelectQueryBuilder } from "./select.ts";
import { InsertQueryBuilder } from "./insert.ts";
import { UpdateQueryBuilder } from "./update.ts";

export const selectFrom = <T>(...f: string[]) => new SelectQueryBuilder<T>(f);
export const insertInto = <T>(t: string) => new InsertQueryBuilder<T>(t);
export const updateTable = <T>(t: string) => new UpdateQueryBuilder<T>(t);

export class PgClient {
  #pool: Pool;

  constructor(p: Pool) {
    this.#pool = p;
  }

  selectFrom = <T>(...f: string[]) => new SelectQueryBuilder<T>(f, this.#pool);
  insertInto = <T>(t: string) => new InsertQueryBuilder<T>(t, this.#pool);
  updateTable = <T>(t: string) => new UpdateQueryBuilder<T>(t, this.#pool);
}
