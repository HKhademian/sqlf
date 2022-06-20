# sqlf

Fast pgSQL generation for [Deno](https://deno.land)

[![test](https://github.com/danteissaias/sqlf/actions/workflows/test.yml/badge.svg)](https://github.com/danteissaias/sqlf/actions/workflows/test.yml)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https://deno.land/x/sqlf/mod.ts)
[![deno module](https://shield.deno.dev/x/sqlf)](https://deno.land/x/sqlf)

```ts
import { Pool } from "https://deno.land/x/postgres/mod.ts";
import { PgClient } from "https://deno.land/x/sqlf/mod.ts";

const pool = new Pool("...");
const db = new PgClient(pool);

interface User {
  id: number;
  email: string;
}

const [user] = await db
  .selectFrom<User>("users")
  .select("*")
  .where("email", "=", "bob@example.com")
  .limit(1)
  .all();

console.log(user);
```
