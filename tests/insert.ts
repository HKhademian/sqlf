import { assertEquals } from "https://deno.land/std@0.145.0/testing/asserts.ts";
import { createClient } from "../mod.ts";

const db = createClient();

Deno.test("insert", () => {
  const { sql, args } = db
    .insertInto("users")
    .values({ id: 1 })
    .returning("id", "created")
    .build();
  assertEquals(sql, "insert into users (id) values ($1) returning id,created;");
  assertEquals(args, [1]);
});
