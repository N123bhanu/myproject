const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 9090;

app.use(cors());
app.use(express.json());

// Serve static files from the root folder (no need to use backend folder)
app.use(express.static(path.join(__dirname, "..")));  // Go one directory up to the root folder

// Home route to serve the index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));  // Make sure index.html is being served from the root
});

// Feedback submission route
app.post("/submit-feedback", (req, res) => {
  const { name, message } = req.body;
  const feedback = `Name: ${name}\nMessage: ${message}\n---\n`;

  fs.appendFile("feedbacks.txt", feedback, err => {
    if (err) {
      return res.status(500).send("Failed to save feedback.");
    }
    res.send("Thank you for your feedback!");
  });
});

// Start the server and listen on the port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
