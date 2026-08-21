import { pool } from "../database.js";

export async function getAllTournaments(userId?: number) {
  if (userId) {
    const tournamentsResult = await pool.query(
      `
        SELECT * FROM tournaments
        WHERE owner_id = $1
        `,
      [userId],
    );

    return tournamentsResult.rows;
  } else {
    const tournamentsResult = await pool.query(
      `
        SELECT * FROM tournaments
        `,
    );

    return tournamentsResult.rows;
  }
}
