const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to Web!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
