import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import { Builder, Column, Mutation, Operator, Where } from "./base.ts";

export class UpdateQueryBuilder<T> extends Builder<T> implements Where {
  constructor(table: string, pool?: Pool) {
    super(pool);
    this.append(`update ${table}`);
  }

  set(mutation: Mutation) {
    const vals = Object.entries(mutation)
      .map(([k, v]) => k + "=" + this.arg(v));
    this.append(`set ${vals}`);
    return this;
  }

  where(column: Column<T>, op: Operator, val: unknown) {
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

  returning(...columns: string[]) {
    this.append(`returning ${columns}`);
    return this;
  }
}
