// api/wishes.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Resolve data file path
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(__dirname, "../wishes.json");

// Ensure wishes.json exists
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, "[]", "utf8");

// Read helper
function readWishes() {
  try {
    return JSON.parse(fs.readFileSync(dataFile, "utf8"));
  } catch {
    return [];
  }
}

// Write helper
function writeWishes(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf8");
}

// GET — list all wishes
router.get("/", (req, res) => {
  const rows = readWishes();
  res.json({ ok: true, rows });
});

// POST — add a new wish
router.post("/", express.json(), (req, res) => {
  const { name = "", text = "" } = req.body;
  if (!name.trim() || !text.trim()) {
    return res.status(400).json({ ok: false, error: "Missing name or text" });
  }
  const wishes = readWishes();
  const newWish = {
    name: name.trim(),
    text: text.trim(),
    timestamp: new Date().toISOString(),
  };
  wishes.push(newWish);
  writeWishes(wishes);
  res.json({ ok: true, row: newWish });
});

export default router;
