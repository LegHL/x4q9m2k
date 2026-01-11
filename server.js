const http = require("http");
const fs = require("fs");

// Caminho para os arquivos (pqac.lua e idiot_dumpers.txt)
const SCRIPT_FILE = "pqac.lua";
const DUMPERS_FILE = "idiot_dumpers.txt";

// Função simples para detectar User-Agent do Roblox
function isRobloxUA(req) {
    const ua = req.headers["user-agent"];
    return ua && ua.includes("Roblox");
}

const server = http.createServer((req, res) => {
    if (isRobloxUA(req)) {
        // Servir o script ofuscado
        fs.readFile(SCRIPT_FILE, "utf8", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Internal Server Error");
            } else {
                res.writeHead(200, {"Content-Type": "text/plain"});
                res.end(data);
            }
        });
    } else {
        // Servir o “idiot_dumpers.txt”
        fs.readFile(DUMPERS_FILE, "utf8", (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("Not Found");
            } else {
                res.writeHead(200, {"Content-Type": "text/plain"});
                res.end(data);
            }
        });
    }
});

// Rodar na porta padrão do Render
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
