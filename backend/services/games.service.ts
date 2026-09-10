import { pool } from "../database.js";
import type { CreateHalfType, CreateGameType } from "../types/types.js";

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

export async function createGame(game: CreateGameType, matchId: number) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const mapResult = await client.query(
      `
      SELECT id FROM maps
      WHERE map_name = $1
      `,
      [game.mapName],
    );

    const gameNumberResult = await client.query(
      `
      SELECT COALESCE(MAX(game_number), 0) + 1 AS next_game_number
      FROM match_games
      WHERE match_id = $1
      `,
      [matchId],
    );

    const gameNumber = gameNumberResult.rows[0].next_game_number;
    const mapId = mapResult.rows[0].id;

    const gameInsertResult = await client.query(
      `
      INSERT INTO match_games(match_id, game_number, map_id)
      VALUES ($1, $2, $3) RETURNING id

      `,
      [matchId, gameNumber, mapId],
    );

    const gameId = gameInsertResult.rows[0].id;

    for (const half of game.halves) {
      const insertHalfResult = await client.query(
        `
        INSERT INTO game_halves(game_id, half_number, hunter_team_id, survivor_team_id)
        VALUES ($1, $2, $3, $4) RETURNING id
        `,
        [gameId, half.halfNumber, half.hunterTeamId, half.survivorTeamId],
      );

      const halfId = insertHalfResult.rows[0].id;
      await client.query(
        `
        INSERT INTO half_players(half_id, player_id)
        VALUES ($1, $2)
        `,
        [halfId, half.hunterPlayerId],
      );

      for (const survId of half.survivorPlayerIds) {
        await client.query(
          `
          INSERT INTO half_players(half_id, player_id)
          VALUES ($1, $2)
          `,
          [halfId, survId],
        );
      }
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    await client.release();
  }
}
