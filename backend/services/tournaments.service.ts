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

export async function createNewTournament(
  name: string,
  description: string,
  owner_id: number,
) {
  const insertResult = await pool.query(
    `
      INSERT INTO tournaments (name, description, owner_id) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `,
    [name, description, owner_id],
  );

  return insertResult.rows[0];
}

export async function getTournamentById(id: number) {
  const tournamentResult = await pool.query(
    `
    SELECT * FROM tournaments
    WHERE id = $1
    `,
    [id],
  );

  return tournamentResult.rows[0];
}

export async function deleteTournament(tournamendId: number) {
  await pool.query(
    `
    DELETE FROM tournaments
    WHERE id = $1
    `,
    [tournamendId],
  );
}
