import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const catalogPath = path.join(root, "vpm.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function listSourceFiles() {
  return fs
    .readdirSync(root)
    .filter((fileName) => /^source-.+\.json$/.test(fileName))
    .sort((a, b) => {
      if (a === "source-all.json") return -1;
      if (b === "source-all.json") return 1;
      return a.localeCompare(b);
    });
}

function normalizeOutputs(source) {
  if (!Array.isArray(source.outputs) || source.outputs.length === 0) {
    throw new Error(`${source.__fileName} must define at least one output.`);
  }

  return source.outputs.map((output) => {
    if (!output.path || !output.url) {
      throw new Error(`${source.__fileName} has an output without path or url.`);
    }

    return output;
  });
}

function packageIds(source) {
  if (!Array.isArray(source.packages) || source.packages.length === 0) {
    throw new Error(`${source.__fileName} must define at least one package.`);
  }

  return source.packages.map((pkg) => {
    if (!pkg.id) {
      throw new Error(`${source.__fileName} has a package without id.`);
    }

    return pkg.id;
  });
}

function buildListing({ source, catalog, output }) {
  const listing = {
    author: source.author ?? catalog.author,
    name: source.name ?? catalog.name,
    id: source.id ?? catalog.id,
    url: output.url,
    packages: {},
  };

  for (const packageId of packageIds(source)) {
    const catalogPackage = catalog.packages?.[packageId];
    if (!catalogPackage) {
      throw new Error(`${source.__fileName} references missing package ${packageId}.`);
    }

    const nextPackage = clone(catalogPackage);
    for (const version of Object.values(nextPackage.versions ?? {})) {
      version.repo = output.url;
    }

    listing.packages[packageId] = nextPackage;
  }

  return listing;
}

const catalog = readJson(catalogPath);

if (!catalog.packages || typeof catalog.packages !== "object") {
  throw new Error("vpm.json must contain a packages object.");
}

for (const fileName of listSourceFiles()) {
  const source = readJson(path.join(root, fileName));
  source.__fileName = fileName;

  for (const output of normalizeOutputs(source)) {
    const outputPath = path.join(root, output.path);
    const listing = buildListing({ source, catalog, output });
    writeJson(outputPath, listing);
    console.log(`Generated ${output.path}`);
  }
}
