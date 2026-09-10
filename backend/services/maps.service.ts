import { pool } from "../database.js";
import type { CreateGameType, CreateHalfType } from "../types/types.js";

export async function getTournamentMaps() {
  const result = await pool.query(
    `
        SELECT * FROM maps 
        `,
  );

  return result.rows;
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
    const halfIds: number[] = [];

    game.halves.map(async (half: CreateHalfType) => {
      const insertHalfResult = await client.query(
        `
        INSERT INTO game_halves(game_id, half_number, hunter_team_id, survivor_team_id)
        VALUES ($1, $2, $3, $4)
        `,
        [gameId, half.halfNumber, half.hunterPlayerId, half.survivorTeamId],
      );

      const halfId = insertHalfResult.rows[0].id;
      halfIds.push(halfId);
    });

    for (const halfId of halfIds) {
    }
  } catch (err) {
    console.log(err);
    await client.query("ROLLBACK");
  } finally {
    await client.release();
  }
}
