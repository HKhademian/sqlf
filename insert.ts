import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import { assert } from "https://deno.land/std@0.144.0/testing/asserts.ts";

export class InsertQueryBuilder<T> {
  #str: string;
  args: unknown[];
  #pool?: Pool;

  constructor(t: string, p?: Pool) {
    this.#str = "insert into " + t;
    this.args = [];
    this.#pool = p;
  }

  #append = (str: string) => this.#str += " " + str;

  get str() {
    return this.#str + ";";
  }

  values(v: Record<string, unknown>) {
    this.#append("(" + Object.keys(v) + ")");
    const vals = Object.values(v);
    this.args.push(...vals);
    const expr = Array.from(vals.keys()).map((i) => "$" + (i + 1));
    this.#append("values (" + expr + ")");
    return this;
  }

  returning(...r: string[]) {
    this.#append("returning " + r);
    return this;
  }

  async run(pool = this.#pool) {
    assert(pool);
    const conn = await pool.connect();
    const res = await conn.queryObject<T>(this.str, this.args);
    conn.release();
    return res;
  }

  async all(pool = this.#pool) {
    assert(pool);
    const conn = await pool.connect();
    const res = await conn.queryObject<T>(this.str, this.args);
    conn.release();
    return res.rows;
  }
}
