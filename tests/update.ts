import { assertEquals } from "https://deno.land/std@0.140.0/testing/asserts.ts";
import * as sqlf from "../mod.ts";

Deno.test("update", () => {
  const { str, args } = sqlf
    .updateTable("users")
    .set({ id: 2 })
    .where("id", "=", 1)
    .returning("id", "created");

  assertEquals(str, "update users set id=$1 where id=$2 returning id,created;");
  assertEquals(args, [2, 1]);
});
