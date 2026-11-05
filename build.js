// Fills the {{VARIABLES}} in each HTML page and writes the finished site to dist/.
// Values come from .env locally, or from the host's environment variables.
// Run with: node build.js (needs Node 20.12 or newer, no packages to install)
const fs = require("node:fs");

process.chdir(__dirname);
if (fs.existsSync(".env")) process.loadEnvFile(".env");

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const missing = new Set();
const pages = [
  ...fs.readdirSync(".").filter((file) => file.endsWith(".html")),
  ...fs.readdirSync("html").map((file) => `html/${file}`),
];
const built = pages.map((file) => [
  file,
  fs.readFileSync(file, "utf8").replace(/\{\{(\w+)\}\}/g, (_, name) => {
    if (!process.env[name]) missing.add(name);
    return escapeHtml(process.env[name] || "");
  }),
]);

if (missing.size) {
  console.error(`Missing values in .env: ${[...missing].join(", ")}`);
  console.error("Copy .env.example to .env and fill in every value.");
  process.exit(1);
}

fs.rmSync("dist", { recursive: true, force: true });
fs.mkdirSync("dist");
fs.mkdirSync("dist/html");
for (const [file, html] of built) fs.writeFileSync(`dist/${file}`, html);
for (const dir of ["css", "js", "assets/img"]) {
  if (fs.existsSync(dir)) fs.cpSync(dir, `dist/${dir}`, { recursive: true });
}
console.log(`Built ${built.length} pages to dist/`);
