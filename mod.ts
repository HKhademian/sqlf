import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import { SelectQueryBuilder } from "./select.ts";
import { InsertQueryBuilder } from "./insert.ts";
import { UpdateQueryBuilder } from "./update.ts";
import { DefaultTable } from "./base.ts";

interface Client {
  selectFrom<T = DefaultTable>(...tables: string[]): SelectQueryBuilder<T>;
  insertInto<T = DefaultTable>(table: string): InsertQueryBuilder<T>;
  updateTable<T = DefaultTable>(table: string): UpdateQueryBuilder<T>;
}

export function createClient(pool?: Pool): Client {
  return {
    selectFrom: (...tables: string[]) => new SelectQueryBuilder(tables, pool),
    insertInto: (table: string) => new InsertQueryBuilder(table, pool),
    updateTable: (table: string) => new UpdateQueryBuilder(table, pool),
  };
}
