import { assertEquals } from "https://deno.land/std@0.145.0/testing/asserts.ts";
import { createClient } from "../mod.ts";

const db = createClient();
Deno.test("select", () => {
  const { sql, args } = db
    .selectFrom("users")
    .select("*")
    .where("id", "=", 1)
    .whereRef("a", "=", "b")
    .limit(1)
    .build();
  assertEquals(sql, "select * from users where id=$1 and a=b limit 1;");
  assertEquals(args, [1]);
});
