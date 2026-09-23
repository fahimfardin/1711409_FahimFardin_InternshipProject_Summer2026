const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const authRoutes = require("./routes/auth");
const locationRoutes = require("./routes/location");
const profileRoutes = require("./routes/profile");

const app = express();

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(cors());
app.use(express.json());

// ======================================================
// ROUTES
// ======================================================

app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/profile", profileRoutes);

// ======================================================
// TEST ROUTE
// ======================================================

app.get("/", (req, res) => {
  res.send("FieldNation API is running");
});

// ======================================================
// DATABASE CONNECTION
// ======================================================

pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("Connected to PostgreSQL");
  })
  .catch((err) => {
    console.error(
      "Database connection failed:",
      err.message
    );
  });

// ======================================================
// SERVER
// ======================================================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});