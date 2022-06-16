import { SelectQueryBuilder } from "./select.ts";
import { InsertQueryBuilder } from "./insert.ts";
import { UpdateQueryBuilder } from "./update.ts";

const selectFrom = <T>(...f: string[]) => new SelectQueryBuilder<T>(f);
const insertInto = <T>(t: string) => new InsertQueryBuilder<T>(t);
const updateTable = <T>(t: string) => new UpdateQueryBuilder<T>(t);

export { insertInto, selectFrom, updateTable };
