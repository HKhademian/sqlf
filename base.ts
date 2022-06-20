import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import { assert } from "https://deno.land/std@0.144.0/testing/asserts.ts";

type KeyOf<T> = keyof T extends never ? (string | number) : keyof T;
export type Column<T> = KeyOf<T> & string;
export type Operator = "=" | ">" | "<";
export type Mutation = Record<string, unknown>;

export interface Where {
  where(col: string, op: string, val: unknown): Where;
  whereRef(col: string, op: string, ref: string): Where;
}

export abstract class Builder<T> {
  #sql: string;
  #args: unknown[];
  #pool?: Pool;

  constructor(pool?: Pool) {
    this.#sql = "";
    this.#args = [];
    this.#pool = pool;
  }

  protected includes = (s: string) => this.#sql.includes(s);
  protected replace = (s: string, r: string) =>
    this.#sql = this.#sql.replace(s, r);
  protected append = (...sql: string[]) => this.#sql += sql.join(" ") + " ";
  protected arg = (val: unknown) => "$" + this.#args.push(val);

  protected onBuild() {}

  build() {
    this.onBuild();
    const sql = this.#sql.slice(0, -1).concat(";");
    return { sql, args: this.#args };
  }

  async run(pool = this.#pool) {
    assert(pool);
    const conn = await pool.connect();
    const { sql, args } = this.build();
    const res = await conn.queryObject<T>(sql, args);
    conn.release();
    return res;
  }

  async all(pool = this.#pool) {
    const res = await this.run(pool);
    return res.rows;
  }
}
