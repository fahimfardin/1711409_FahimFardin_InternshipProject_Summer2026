const pool = require("../config/db");

exports.getLocations = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM locations
      ORDER BY id ASC
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(
      "getLocations error:",
      err
    );

    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

exports.createLocation = async (req, res) => {
  try {
    console.log(
      "========================================"
    );

    console.log(
      "CREATE LOCATION REQUEST BODY:"
    );

    console.log(req.body);

    console.log(
      "========================================"
    );

    const {
      name,
      country,
      state_province,
      address,
      city,
      zip_code,
      client,
      location_type,
      status,
      contact_name,
      phone_number,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO locations
      (
        name,
        country,
        state_province,
        address,
        city,
        zip_code,
        client,
        location_type,
        status,
        contact_name,
        phone_number,
        work_orders,
        providers
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13
      )
      RETURNING *
      `,
      [
        name ?? null,

        country ?? null,

        state_province ?? null,

        address ?? null,

        city ?? null,

        zip_code ?? null,

        client || "N/A",

        location_type ?? null,

        status || "Active",

        contact_name ?? null,

        phone_number ?? null,

        0,

        0,
      ]
    );

    console.log(
      "LOCATION SAVED TO DATABASE:"
    );

    console.log(result.rows[0]);

    console.log(
      "========================================"
    );

    res.status(201).json(
      result.rows[0]
    );
  } catch (err) {
    console.error(
      "createLocation error:",
      err
    );

    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

exports.updateLocation = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    console.log(
      "========================================"
    );

    console.log(
      "UPDATE LOCATION REQUEST"
    );

    console.log("ID:", id);

    console.log("BODY:", req.body);

    console.log(
      "========================================"
    );

    const {
      name,
      country,
      state_province,
      address,
      city,
      zip_code,
      client,
      location_type,
      status,
      contact_name,
      phone_number,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE locations
      SET
        name = $1,
        country = $2,
        state_province = $3,
        address = $4,
        city = $5,
        zip_code = $6,
        client = $7,
        location_type = $8,
        status = $9,
        contact_name = $10,
        phone_number = $11
      WHERE id = $12
      RETURNING *
      `,
      [
        name ?? null,

        country ?? null,

        state_province ?? null,

        address ?? null,

        city ?? null,

        zip_code ?? null,

        client || "N/A",

        location_type ?? null,

        status || "Active",

        contact_name ?? null,

        phone_number ?? null,

        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Location not found",
      });
    }

    console.log(
      "LOCATION UPDATED IN DATABASE:"
    );

    console.log(result.rows[0]);

    console.log(
      "========================================"
    );

    res.status(200).json(
      result.rows[0]
    );
  } catch (err) {
    console.error(
      "updateLocation error:",
      err
    );

    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

exports.deleteLocation = async (
  req,
  res
) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    await client.query("BEGIN");

    const deleteResult =
      await client.query(
        `
        DELETE FROM locations
        WHERE id = $1
        RETURNING id
        `,
        [id]
      );

    if (
      deleteResult.rows.length === 0
    ) {
      await client.query(
        "ROLLBACK"
      );

      return res.status(404).json({
        message:
          "Location not found",
      });
    }

    await client.query(`
      UPDATE locations
      SET id = -id
    `);

    await client.query(`
      WITH renumbered AS (
        SELECT
          id,
          ROW_NUMBER() OVER (
            ORDER BY id DESC
          ) AS new_id
        FROM locations
      )
      UPDATE locations AS l
      SET id = r.new_id
      FROM renumbered AS r
      WHERE l.id = r.id
    `);

    await client.query(`
      SELECT setval(
        'locations_id_seq',
        COALESCE(
          (
            SELECT MAX(id)
            FROM locations
          ),
          0
        ) + 1,
        false
      )
    `);

    await client.query(
      "COMMIT"
    );

    res.status(200).json({
      message:
        "Location deleted and IDs renumbered successfully",
    });
  } catch (err) {
    await client.query(
      "ROLLBACK"
    );

    console.error(
      "deleteLocation error:",
      err
    );

    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  } finally {
    client.release();
  }
};