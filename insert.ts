import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";

export class InsertQueryBuilder<T> {
  #str: string;
  args: unknown[];

  get str() {
    return this.#str + ";";
  }

  append(str: string) {
    this.#str += " " + str;
  }

  constructor(t: string) {
    this.#str = "insert into " + t;
    this.args = [];
  }

  values(v: Record<string, unknown>) {
    this.append("(" + Object.keys(v) + ")");
    const vals = Object.values(v);
    this.args.push(...vals);
    const expr = Array.from(vals.keys()).map((i) => "$" + (i + 1));
    this.append("values (" + expr + ")");
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
