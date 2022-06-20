import { assertEquals } from "https://deno.land/std@0.140.0/testing/asserts.ts";
import * as sqlf from "../mod.ts";

Deno.test("select", () => {
  const { sql, args } = sqlf
    .selectFrom("users")
    .select("*")
    .where("id", "=", 1)
    .whereRef("a", "=", "b")
    .limit(1)
    .build();
  assertEquals(sql, "select * from users where id=$1 and a=b limit 1;");
  assertEquals(args, [1]);
});
