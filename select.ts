import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";

export class SelectQueryBuilder<T> {
  #str: string;
  args: unknown[];

  get str() {
    return this.#str + ";";
  }

  append(str: string) {
    this.#str += " " + str;
  }

  constructor(f: string[]) {
    this.#str = "select * from " + f;
    this.args = [];
  }

  select(...s: (keyof T | "*")[]) {
    this.#str = this.#str.replace("*", s.toString());
    return this;
  }

  where(column: string, op: string, val: unknown) {
    const str = this.#str.includes("where") ? "and" : "where";
    this.append(str + " " + column + op + "$" + this.args.push(val));
    return this;
  }

  limit(n: number) {
    this.append("limit " + n);
    return this;
  }

  async run(pool: Pool): Promise<T[]> {
    const conn = await pool.connect();
    const res = await conn.queryObject<T>(this.str, this.args);
    conn.release();
    return res.rows;
  }
}
