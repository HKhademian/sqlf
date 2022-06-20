import { assertEquals } from "https://deno.land/std@0.140.0/testing/asserts.ts";
import * as sqlf from "../mod.ts";

Deno.test("update", () => {
  const { sql, args } = sqlf
    .updateTable("users")
    .set({ id: 2 })
    .where("id", "=", 1)
    .whereRef("a", "=", "b")
    .returning("id")
    .build();
  assertEquals(sql, "update users set id=$1 where id=$2 and a=b returning id;");
  assertEquals(args, [2, 1]);
});
