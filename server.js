import express from "express";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

function readJson(path, fallback) {
  try { return JSON.parse(fs.readFileSync(path, "utf8")); }
  catch { return fallback; }
}

app.get("/api/catalog", (req, res) => {
  const catalog = readJson("data/catalog.json", []);
  const q = String(req.query.q || "").toLowerCase().trim();
  const type = String(req.query.type || "").toLowerCase().trim();

  let result = catalog;
  if (q) result = result.filter(x =>
    String(x.title).toLowerCase().includes(q)
  );
  if (type) result = result.filter(x => x.type === type);

  res.json(result);
});

app.get("/api/catalog/:id", (req, res) => {
  const catalog = readJson("data/catalog.json", []);
  const item = catalog.find(x => String(x.id) === String(req.params.id));
  if (!item) return res.status(404).json({error:"Not found"});

  const sources = readJson("data/sources.json", [])
    .filter(s => String(s.tmdbId) === String(item.tmdbId));

  res.json({...item, sources});
});

app.get("*", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`Sins Of Streaming: http://localhost:${PORT}`);
});
