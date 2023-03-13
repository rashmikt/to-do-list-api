import { Pool } from "pg";

const pool = new Pool({
  host: "dpg-cg7oj54eoogs6a389frg-a.frankfurt-postgres.render.com",
  port: 5432,
  database: "todolist_nsxn"
});

export default pool;