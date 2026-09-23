const pool = require("../config/db");

exports.getProfile = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM profiles
      WHERE id = 1
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("getProfile error:", err);

    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      city,
      country,
      role,
      department,
      about,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE profiles
      SET
        first_name = $1,
        last_name = $2,
        email = $3,
        phone = $4,
        city = $5,
        country = $6,
        role = $7,
        department = $8,
        about = $9,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING *
      `,
      [
        first_name,
        last_name,
        email,
        phone,
        city,
        country,
        role,
        department,
        about,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("updateProfile error:", err);

    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};