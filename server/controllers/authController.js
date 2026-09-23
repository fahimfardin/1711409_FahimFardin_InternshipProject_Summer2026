const pool = require("../config/db");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const result = await pool.query(
      `
      SELECT
        id,
        first_name,
        last_name,
        email,
        phone,
        city,
        country,
        role,
        department,
        about,
        status,
        member_since,
        password
      FROM profiles
      WHERE LOWER(email) = LOWER($1)
      LIMIT 1
      `,
      [email.trim()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    if (
      user.status &&
      user.status.toLowerCase() !== "active"
    ) {
      return res.status(403).json({
        message: "This account is inactive.",
      });
    }

    delete user.password;

    res.status(200).json({
      message: "Login successful.",
      user,
    });
  } catch (err) {
    console.error("login error:", err);

    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};