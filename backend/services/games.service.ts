import { pool } from "../database.js";

export async function getMatchGames(matchId: number) {
  const res = await pool.query(
    `
        SELECT * FROM match_games
        WHERE match_id = $1
        `,
    [matchId],
  );

  return res.rows;
}
