const myListService = require("../services/myList.service");

async function getMyList(req, res) {
  try {
    const userId = req.user.userId;

    const list = await myListService.getUserList(userId);

    return res.json(list);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Failed to fetch list",
    });
  }
}

async function addMovie(req, res) {
  try {
    const userId = req.user.userId;
    const { movieId } = req.body;

    if (!movieId) {
      return res.status(400).json({ error: "movieId is required" });
    }

    const item = await myListService.addMovie(userId, movieId);

    return res.status(201).json(item);
  } catch (err) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(409).json({
        error: "Movie already exists in list",
      });
    }

    return res.status(500).json({
      error: "Failed to add movie",
    });
  }
}

async function updateMovie(req, res) {
  try {
    const userId = req.user.userId;
    const { movieId } = req.params;

    const updated = await myListService.updateMovie(userId, movieId, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Movie not found" });
    }

    return res.json(updated);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Failed to update movie",
    });
  }
}

async function deleteMovie(req, res) {
  try {
    const userId = req.user.userId;
    const { movieId } = req.params;

    const deleted = await myListService.deleteMovie(userId, movieId);

    if (!deleted) {
      return res.status(404).json({ error: "Movie not found" });
    }

    return res.json({ movieId: deleted.movieId });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Failed to delete movie",
    });
  }
}

module.exports = {
  getMyList,
  addMovie,
  updateMovie,
  deleteMovie,
};
