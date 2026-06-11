const fs = require("fs");
const path = require("path");

const MAP_PATH = path.join(__dirname, "cloudinary-url-map.json");

let cachedMap = null;

function loadMap() {
 if (cachedMap !== null) return cachedMap;

 if (!fs.existsSync(MAP_PATH)) {
  cachedMap = {};
  return cachedMap;
 }

 cachedMap = JSON.parse(fs.readFileSync(MAP_PATH, "utf8"));
 return cachedMap;
}

function resolveMediaUrl(localPath) {
 if (!localPath || typeof localPath !== "string") return localPath;
 if (/^https?:\/\//i.test(localPath)) return localPath;

 const normalized = localPath.startsWith("/") ? localPath : `/${localPath}`;
 const map = loadMap();

 return map[normalized] ?? localPath;
}

module.exports = { resolveMediaUrl, MAP_PATH };