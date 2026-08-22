import bcrypt from "bcrypt";
import { pool } from "../database.js";

export async function login(username: string, password: string) {
  const userResult = await pool.query(
    `SELECT * FROM users where username = $1`,
    [username],
  );

  const user = userResult.rows[0];
  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) {
    throw { status: 401, message: "Incorrect username or password." };
  }

  const { password: _, ...safeUser } = user;

  return safeUser;
}

export async function signup(
  username: string,
  email: string,
  password: string,
) {
  const emailResult = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (emailResult.rows.length > 0) {
    throw {
      status: 400,
      message: "Account currently in use.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    "INSERT INTO users(username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email",
    [username, email, hashedPassword],
  );

  return result.rows[0];
}
