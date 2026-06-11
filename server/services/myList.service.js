const pool = require("../db");

async function getUserList(userId) {
  const result = await pool.query(
    `
      SELECT
        movie_id,
        status,
        my_rating,
        my_notes
      FROM my_list_items
      WHERE user_id = $1
      ORDER BY created_at DESC
    `,
    [userId],
  );

  return result.rows.map((row) => ({
    movieId: row.movie_id,
    status: row.status,
    myRating: row.my_rating,
    myNotes: row.my_notes,
  }));
}

async function addMovie(userId, movieId) {
  try {
    const result = await pool.query(
      `
      INSERT INTO my_list_items (
        user_id,
        movie_id,
        status,
        my_rating,
        my_notes
      )
      VALUES ($1, $2, 'want_to_watch', NULL, '')
      RETURNING 
        movie_id AS "movieId",
        status,
        my_rating AS "myRating",
        my_notes AS "myNotes"
      `,
      [userId, movieId],
    );

    return result.rows[0];
  } catch (err) {
    throw err;
  }
}

async function updateMovie(userId, movieId, updates) {
  const fields = [];
  const values = [];
  let idx = 1;

  if (updates.status !== undefined) {
    fields.push(`status = $${idx++}`);
    values.push(updates.status);
  }

  if (updates.myRating !== undefined) {
    fields.push(`my_rating = $${idx++}`);
    values.push(updates.myRating);
  }

  if (updates.myNotes !== undefined) {
    fields.push(`my_notes = $${idx++}`);
    values.push(updates.myNotes);
  }

  values.push(userId);
  values.push(movieId);

  const query = `
    UPDATE my_list_items
    SET ${fields.join(", ")}
    WHERE user_id = $${idx++} AND movie_id = $${idx}
    RETURNING 
      movie_id AS "movieId",
      status,
      my_rating AS "myRating",
      my_notes AS "myNotes"
  `;

  const result = await pool.query(query, values);

  return result.rows[0];
}

async function deleteMovie(userId, movieId) {
  const result = await pool.query(
    `
    DELETE FROM my_list_items
    WHERE user_id = $1 AND movie_id = $2
    RETURNING movie_id AS "movieId"
    `,
    [userId, movieId],
  );

  return result.rows[0];
}

module.exports = {
  getUserList,
  addMovie,
  updateMovie,
  deleteMovie,
};
