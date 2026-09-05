import { pool } from "../database.js";

export async function getAllMatchesFromTournament(tounamentId: number) {
  const res = await pool.query(
    `
        SELECT * FROM matches
        WHERE tournament_id = $1
        `,
    [tounamentId],
  );

  return res.rows;
}
