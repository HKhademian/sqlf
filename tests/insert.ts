import { assertEquals } from "https://deno.land/std@0.140.0/testing/asserts.ts";
import * as sqlf from "../mod.ts";

Deno.test("insert", () => {
  const { sql, args } = sqlf
    .insertInto("users")
    .values({ id: 1 })
    .returning("id", "created")
    .build();
  assertEquals(sql, "insert into users (id) values ($1) returning id,created;");
  assertEquals(args, [1]);
});
