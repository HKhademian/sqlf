# sqlf

Fast pgSQL generation for [Deno](https://deno.land)

[![test](https://github.com/danteissaias/sqlf/actions/workflows/test.yml/badge.svg)](https://github.com/danteissaias/sqlf/actions/workflows/test.yml)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https://deno.land/x/sqlf/mod.ts)
[![deno module](https://shield.deno.dev/x/sqlf)](https://deno.land/x/sqlf)

```ts
import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import * as sqlf from "https://deno.land/x/sqlf/mod.ts";

const pool = new Pool("...");

const [user] = await sqlf
  .selectFrom("users")
  .select("*")
  .where("email", "=", "bob@example.com")
  .limit(1)
  .run(pool);

console.log(user);
```
