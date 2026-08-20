import { pool } from "../database.js";
export async function getCharactersService(role: string) {
  console.log("Hello");
  const charactersResult = await pool.query(
    `
        SELECT * FROM characters
        WHERE faction = $1
        `,
    [role],
  );

  return charactersResult.rows;
}
