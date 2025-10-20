require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/schoolImages", express.static(path.join(__dirname, "schoolImages"))); // Serve images

// MySQL connection with error handling
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "school_directory",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
    process.exit(1); // Exit gracefully to prevent crashes
  }
  console.log("MySQL connected");
});

// Multer for image upload
const storage = multer.diskStorage({
  destination: "./schoolImages/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// API: Add school
app.post("/api/schools", upload.single("image"), (req, res) => {
  const { name, address, city, email } = req.body;
  const imagePath = req.file ? req.file.filename : null;
  const sql =
    "INSERT INTO schools (name, address, city, email, image_path) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, address, city, email, imagePath], (err, result) => {
    if (err) {
      console.error("Error adding school:", err.message);
      return res.status(500).json({ error: "Failed to add school" });
    }
    console.log("School added successfully");
    res.json({ message: "School added successfully" });
  });
});

// API: Get schools
app.get("/api/schools", (req, res) => {
  const sql = "SELECT id, name, address, city, image_path FROM schools";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching schools:", err.message);
      return res.status(500).json({ error: "Failed to fetch schools" });
    }
    console.log("Schools fetched successfully");
    res.json(results);
  });
});

// Start server with error handling
try {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (error) {
  console.error("Failed to start server:", error.message);
  process.exit(1);
}
