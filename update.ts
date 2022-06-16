import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";

export class UpdateQueryBuilder<T> {
  #str: string;
  args: unknown[];

  get str() {
    return this.#str + ";";
  }

  append(str: string) {
    this.#str += " " + str;
  }

  constructor(t: string) {
    this.#str = "update " + t;
    this.args = [];
  }

  set(v: Record<string, unknown>) {
    const vals = Object.entries(v)
      .map(([k, v]) => k + "=$" + (this.args.push(v)));
    this.append("set " + vals);
    return this;
  }

  where(column: string, op: string, val: unknown) {
    const str = this.#str.includes("where") ? "and" : "where";
    this.append(str + " " + column + op + "$" + this.args.push(val));
    return this;
  }

  returning(...r: string[]) {
    this.append("returning " + r);
    return this;
  }

  async run(pool: Pool): Promise<T[]> {
    const conn = await pool.connect();
    const res = await conn.queryObject<T>(this.str, this.args);
    conn.release();
    return res.rows;
  }
}
