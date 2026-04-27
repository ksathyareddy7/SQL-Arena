import pool from "../database/db.js";

export const login = async (req, res) => {
  const { username } = req.body;
  
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    // Check if user exists
    const resUser = await pool.query("SELECT id, username FROM users WHERE username = $1", [username.trim()]);
    
    if (resUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found. Please sign up instead." });
    }
    
    const user = resUser.rows[0];
    res.json(user);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Failed to login" });
  }
};

export const signup = async (req, res) => {
  const { username } = req.body;
  
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    // Check if user already exists
    const resUserExists = await pool.query("SELECT id FROM users WHERE username = $1", [username.trim()]);
    
    if (resUserExists.rows.length > 0) {
      return res.status(400).json({ error: "Username already taken. Please choose another one or login." });
    }
    
    // Create new user
    const createRes = await pool.query(
      "INSERT INTO users (username) VALUES ($1) RETURNING id, username",
      [username.trim()]
    );
    
    const user = createRes.rows[0];
    res.json(user);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Failed to create account" });
  }
};

export const listUsers = async (req, res) => {
  try {
    const limitRaw = Number(req.query?.limit);
    const limit = Number.isFinite(limitRaw)
      ? Math.min(Math.max(Math.floor(limitRaw), 1), 200)
      : 100;

    const { rows } = await pool.query(
      `SELECT id, username FROM users ORDER BY username ASC LIMIT $1`,
      [limit],
    );

    res.json(rows);
  } catch (err) {
    console.error("List users error:", err);
    res.status(500).json({ error: "Failed to list users" });
  }
};
