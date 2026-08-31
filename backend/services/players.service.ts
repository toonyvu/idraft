import { pool } from "../database.js";

export async function getPlayersFromTeam(teamId: number, userId: number) {
  const playersResult = await pool.query(
    `
        SELECT * FROM team_players
        WHERE team_id = $1
        AND owner_id = $2
        `,
    [teamId, userId],
  );

  return playersResult.rows;
}

export async function insertTeamPlayer(
  teamId: number,
  userId: number,
  role: number,
  name: string,
) {
  const teamResult = await pool.query(
    `
        SELECT acronym FROM teams
        WHERE id = $1
        `,
    [teamId],
  );

  if (teamResult.rows.length === 0) {
    throw new Error("Team not found.");
  }

  const teamAcronym = teamResult.rows[0].acronym;
  const playerName = `${teamAcronym}_${name}`;

  const insertResult = await pool.query(
    `
        INSERT INTO team_players(name, role, team_id, owner_id)
        VALUES ($1, $2, $3, $4) RETURNING name
        `,
    [playerName, role, teamId, userId],
  );

  return insertResult.rows[0];
}
