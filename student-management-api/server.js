const express = require("express");

const app = express();

// Import Routes
const studentRoutes = require("./routes/studentRoutes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Frontend Files
app.use(express.static("public"));

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Student Management API Running Successfully 🚀"
  });
});

// Student Routes
app.use("/students", studentRoutes);

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

// Server Port
const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT, () => {
  console.log(`
====================================
🚀 Server Started Successfully
🌐 URL: http://localhost:${PORT}
====================================
  `);
});