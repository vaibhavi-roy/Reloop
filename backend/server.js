const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;
const recordRoutes = require("./routes/userRoutes");

app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());
app.use("/api", recordRoutes);
mongoose
  .connect(
    "mongodb+srv://devleena2003:reverse-logistics@cluster0.qad62pz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to Web!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
