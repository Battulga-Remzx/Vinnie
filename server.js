const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Bot is running!");
});

// Энд startServer функцээ тодорхойлж байна
function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// startServer-ийг export хийж байгаа
module.exports = { startServer };
