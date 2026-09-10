import { pool } from "../database.js";

export async function getAllMatchesFromTournament(tournamentId: number) {
  const res = await pool.query(
    `
    SELECT m.*,
    COALESCE(
      json_agg(
        json_build_object(
          'id', t.id,
          'name', t.name,
          'logo_url', t.logo_url,
          'acronym', t.acronym
        )
      ) FILTER (WHERE t.id IS NOT NULL), '[]'
    ) as teams

    FROM matches m
    JOIN match_teams mt
    ON m.id = mt.match_id
    JOIN teams t
    ON mt.team_id = t.id
    WHERE m.tournament_id = $1
    GROUP BY
      m.id
    ORDER BY m.id;
    `,
    [tournamentId],
  );

  return res.rows;
}

export async function getMatchFromTournament(
  tournamentId: number,
  matchId: number,
) {
  const res = await pool.query(
    `
    SELECT m.*,
    COALESCE(
      json_agg(
        json_build_object(
          'id', t.id,
          'name', t.name,
          'logo_url', t.logo_url,
          'acronym', t.acronym,
          'players', (
            SELECT COALESCE (
              json_agg(
                json_build_object(
                  'id', tp.id,
                  'name', tp.name,
                  'role', tp.role,
                  'created_at', tp.created_at
                )
              ), '[]'
            ) 
            FROM team_players tp
            WHERE tp.team_id = t.id
          )
        )
      ) FILTER (WHERE t.id IS NOT NULL), '[]'
    ) as teams

    FROM matches m
    JOIN match_teams mt
    ON m.id = mt.match_id
    JOIN teams t
    ON mt.team_id = t.id
    WHERE m.tournament_id = $1
    AND m.id = $2
    GROUP BY
      m.id
    ORDER BY m.id;
    `,
    [tournamentId, matchId],
  );

  return res.rows;
}

export async function createTournamentMatch(
  tournamentId: number,
  bestOf: number,
  teamIds: number[],
) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const matchResult = await client.query(
      `
    INSERT INTO matches(tournament_id, best_of)
    VALUES ($1, $2)
    RETURNING id
    `,
      [tournamentId, bestOf],
    );

    const matchId = matchResult.rows[0].id;

    for (const teamId of teamIds) {
      await client.query(
        `INSERT INTO match_teams(match_id, team_id)
        VALUES ($1, $2)`,
        [matchId, teamId],
      );
    }

    await client.query("COMMIT");
  } catch {
    await client.query("ROLLBACK");
  } finally {
    await client.release();
  }
}
