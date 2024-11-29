const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');  // Add this line at the top of your file

const fs = require("fs");
const { exec } = require("child_process"); // For running shell commands

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, '../my-app/build')));
app.use(bodyParser.json()); // To parse JSON request body
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../my-app/build', 'index.html'));
});

app.post("/execute", (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  // Write code to a .txt file
  const filePath = "code.txt";
  fs.writeFile(filePath, code, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to write code to file" });
    }

    // Run the Java interpreter and pass the file
    exec(`java Kanginter.java ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ error: stderr || "Error executing code" });
      }
      res.json({ output: stdout || stderr });
    });
  });
});
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../my-app/build', 'index.html'));
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
