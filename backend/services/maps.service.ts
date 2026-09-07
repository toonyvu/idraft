import { pool } from "../database.js";

export async function getTournamentMaps() {
  const result = await pool.query(
    `
        SELECT * FROM maps 
        `,
  );

  return result.rows;
}
