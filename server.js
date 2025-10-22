import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import wishesRouter from "./api/wishes.js";

const app = express();
const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Mount the wishes API
app.use("/api/wishes", wishesRouter);

app.listen(PORT, () => {
  console.log(`Local server running at http://localhost:${PORT}`);
});
