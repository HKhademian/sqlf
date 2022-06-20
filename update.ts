import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import { assert } from "https://deno.land/std@0.144.0/testing/asserts.ts";
import { Where } from "./base.ts";

export class UpdateQueryBuilder<T> implements Where {
  #str: string;
  args: unknown[];
  #pool?: Pool;

  constructor(t: string, p?: Pool) {
    this.#str = "update " + t;
    this.args = [];
    this.#pool = p;
  }

  #append = (str: string) => this.#str += " " + str;

  get str() {
    return this.#str + ";";
  }

  set(v: Record<string, unknown>) {
    const vals = Object.entries(v)
      .map(([k, v]) => k + "=$" + (this.args.push(v)));
    this.#append("set " + vals);
    return this;
  }

  where(column: string, op: string, val: unknown) {
    const str = this.#str.includes("where") ? "and" : "where";
    this.#append(str + " " + column + op + "$" + this.args.push(val));
    return this;
  }

  whereRef(column: string, op: string, ref: string) {
    const str = this.#str.includes("where") ? "and" : "where";
    this.#append(str + " " + column + op + ref);
    return this;
  }

  returning(...r: string[]) {
    this.#append("returning " + r);
    return this;
  }

  async run(pool = this.#pool): Promise<T[]> {
    assert(pool);
    const conn = await pool.connect();
    const res = await conn.queryObject<T>(this.str, this.args);
    conn.release();
    return res.rows;
  }
}
