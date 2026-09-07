import { pool } from "../database.js";

import type { Team } from "../types/types.js";

export async function getTeamsFromTournament(
  tournamentId: number,
  userId?: number,
) {
  if (userId) {
    const teamsResult = await pool.query(
      `
            SELECT teams.*, t.status
            FROM teams
            INNER JOIN tournaments t
            ON t.id = $1
            AND t.owner_id = $2    
        `,
      [tournamentId, userId],
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
      SELECT teams.*, tournaments.status
      FROM tournaments
      INNER JOIN teams
      ON teams.tournament_id = tournaments.id
      WHERE teams.id = $1
      AND tournament_id = $2

    `,
    [teamId, tournamentId],
  );

  return teamResult.rows[0];
}

export async function deleteTeamFromTournament(
  teamId: number,
  tournamentId: number,
) {
  await pool.query(
    `
      DELETE FROM teams
      WHERE id = $1
      AND tournament_id = $2   
    `,
    [teamId, tournamentId],
  );
}

export async function getMatchTeams(matchId: number) {
  const res = await pool.query(
    `
    SELECT * FROM match_teams
    `,
  );

  return res.rows;
}
