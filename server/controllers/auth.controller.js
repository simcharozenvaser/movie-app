const authService = require("../services/auth.service");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const pool = require("../db");

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    await authService.register(username, email, password);

    return res.json({
      message: "User created",
    });
  } catch (err) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(409).json({ error: "Email already exists" });
    }

    return res.status(500).json({ error: "Register failed" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await authService.login(email, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      token: accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return res.status(500).json({ error: "Login failed" });
  }
}

async function refresh(req, res) {
try {
const token = req.cookies.refreshToken;

if (!token) {
return res.status(401).json({ error: "No refresh token" });
}
console.log("🔄 refresh endpoint hit");
console.log("🍪 cookies:", req.cookies);
const decoded = verifyRefreshToken(token);
console.log("decoded refresh:", decoded);

const user = {
id: decoded.userId,
};

const newAccessToken = generateAccessToken(user);

return res.json({
accessToken: newAccessToken,
});
} catch (err) {
return res.status(403).json({ error: "Invalid refresh token" });
}
}

async function me(req, res) {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      "SELECT id, username, email FROM users WHERE id = $1",
      [userId],
    );

    return res.json(result.rows[0]);
  } catch {
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { register, login, me, refresh };
