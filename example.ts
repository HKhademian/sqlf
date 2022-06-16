import { Pool } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import * as sqlf from "./mod.ts";

interface User {
  id: number;
  email: string;
}

const pool = new Pool("postgresql://anon@localhost:5432/carbon", 20);

const [user] = await sqlf
  .selectFrom<User>("auth.users")
  .select("*")
  .where("email", "=", "dante@issaias.com")
  .limit(1)
  .run(pool);
console.log(user);
