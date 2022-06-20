import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import { Builder, Mutation } from "./base.ts";

export class InsertQueryBuilder<T> extends Builder<T> {
  constructor(table: string, pool?: Pool) {
    super(pool);
    this.append(`insert into ${table}`);
  }

  values(values: Mutation) {
    this.append("(" + Object.keys(values) + ")");
    const vals = Object.values(values);
    vals.forEach((v) => this.arg(v));
    const expr = Array.from(vals.keys()).map((i) => "$" + (i + 1));
    this.append("values (" + expr + ")");
    return this;
  }

  limit(n: number) {
    this.append(`limit ${n}`);
    return this;
  }

  returning(...columns: string[]) {
    this.append(`returning ${columns}`);
    return this;
  }
}
