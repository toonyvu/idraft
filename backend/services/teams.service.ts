import { pool } from "../database.js";

import type { Team } from "../types/types.js";

export async function getTeamsFromTournament(
  tournamentId: number,
  userId?: number,
) {
  if (userId) {
    const teamsResult = await pool.query(
      `
            SELECT * FROM teams
            WHERE owner_id = $1
            AND tournament_id = $2    
        `,
      [userId, tournamentId],
    );

    return teamsResult.rows;
  } else {
    const teamsResult = await pool.query(
      `
        SELECT * FROM teams WHERE tournament = $1
        `,
      [tournamentId],
    );

    return teamsResult.rows;
  }
}

export async function insertTeamToTournament(
  tournamentId: number,
  team: Team,
  userId: number,
) {
  console.log(team);
  await pool.query(
    `
      INSERT INTO teams (name, acronym, tournament_id, logo_url, owner_id)
      VALUES ($1, $2, $3, $4, $5)
    `,
    [team.teamName, team.acronym, tournamentId, team.image_url, userId],
  );
}

export async function getTeamFromTournament(
  tournamentId: number,
  teamId: number,
) {
  const teamResult = await pool.query(
    `
      SELECT * FROM teams
      WHERE id = $1
      AND tournament_id = $2

    `,
    [teamId, tournamentId],
  );

  return teamResult.rows[0];
}
