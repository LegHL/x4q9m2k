const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  try {
    const ua = (req.headers["user-agent"] || "").toLowerCase();

    let fileToServe;

    // User-Agent do Roblox
    if (ua.includes("roblox")) {
      fileToServe = path.join(__dirname, "pqac.lua");
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    } else {
      fileToServe = path.join(__dirname, "idiot_dumpers.txt");
      res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    }

    const content = fs.readFileSync(fileToServe, "utf8");
    res.end(content);

  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
