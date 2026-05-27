const pool = require("../db");
const bcrypt = require("bcrypt");

async function register(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO users (username, email, password_hash)
     VALUES ($1, $2, $3)`,
    [username, email, hashedPassword]
  );
}

async function login(email, password) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) return null;

  return user;
}

module.exports = { register, login };