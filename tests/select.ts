import { assertEquals } from "https://deno.land/std@0.140.0/testing/asserts.ts";
import * as sqlf from "../mod.ts";

Deno.test("select", () => {
  const { str, args } = sqlf
    .selectFrom("users")
    .select("*")
    .where("id", "=", 1)
    .limit(1);

  assertEquals(str, "select * from users where id=$1 limit 1;");
  assertEquals(args, [1]);
});
