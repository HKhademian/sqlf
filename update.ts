import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import { Builder, Column, Operator, Value, Where } from "./base.ts";

export class UpdateQueryBuilder<T> extends Builder<T> implements Where {
  constructor(table: string, pool?: Pool) {
    super(pool);
    this.append(`update ${table}`);
  }

  set(mutation: Partial<T>) {
    const vals = Object.entries(mutation)
      .map(([k, v]) => k + "=" + this.arg(v));
    this.append(`set ${vals}`);
    return this;
  }

  where(column: Column<T>, op: Operator, val: Value<typeof column, T>) {
    const cmd = this.includes("where") ? "and" : "where";
    this.append(cmd, column + op + this.arg(val));
    return this;
  }

  whereRef(column: Column<T>, op: Operator, ref: string) {
    const cmd = this.includes("where") ? "and" : "where";
    this.append(cmd, column + op + ref);
    return this;
  }

  limit(n: number) {
    this.append(`limit ${n}`);
    return this;
  }

  returning(...columns: (Column<T> | "*")[]) {
    this.append(`returning ${columns}`);
    return this;
  }
}
