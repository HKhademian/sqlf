import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import { Builder, Column, Operator, Where } from "./base.ts";

export class SelectQueryBuilder<T> extends Builder<T> implements Where {
  #s: string[];

  constructor(tables: string[], pool?: Pool) {
    super(pool);
    this.#s = [];
    this.append(`select * from ${tables}`);
  }

  onBuild() {
    if (!this.#s.length) this.#s = ["*"];
    this.replace("*", this.#s.toString());
  }

  select(...s: (Column<T> | "*")[]) {
    this.#s.push(...s);
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
}
