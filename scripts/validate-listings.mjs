import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourcesDir = path.join(root, "sources");
const catalogPath = path.join(root, "vpm.json");
const sourceAllPath = path.join(sourcesDir, "source-all.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
}

function warn(message) {
  console.warn(`WARNING: ${message}`);
}

function stable(value) {
  return JSON.stringify(value, Object.keys(value ?? {}).sort());
}

function listSourceFiles() {
  return fs
    .readdirSync(sourcesDir)
    .filter((fileName) => /^source-.+\.json$/.test(fileName))
    .sort();
}

function outputEntries(source) {
  return source.outputs.map((output) => ({
    sourceFile: source.__fileName,
    source,
    path: output.path,
    url: output.url,
    expectedPackages: source.packages.map((pkg) => pkg.id),
  }));
}

function latestVersion(versions) {
  return Object.keys(versions).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).at(-1);
}

const catalog = readJson(catalogPath);
const sourceAll = readJson(sourceAllPath);
const studioPackageIds = new Set(sourceAll.packages.map((pkg) => pkg.id));
const outputs = [];
const sourcePackageNames = new Set();

for (const fileName of listSourceFiles()) {
  const source = readJson(path.join(sourcesDir, fileName));
  source.__fileName = fileName;

  if (!Array.isArray(source.outputs) || source.outputs.length === 0) {
    fail(`${fileName} must define outputs.`);
    continue;
  }

  if (!Array.isArray(source.packages) || source.packages.length === 0) {
    fail(`${fileName} must define packages.`);
    continue;
  }

  for (const pkg of source.packages) {
    if (!pkg.id || !pkg.repository) {
      fail(`${fileName} has a package without id or repository.`);
    }
    const sourceKey = `${fileName}:${pkg.id}`;
    if (sourcePackageNames.has(sourceKey)) {
      fail(`${fileName} contains duplicate package ${pkg.id}.`);
    }
    sourcePackageNames.add(sourceKey);
  }

  outputs.push(...outputEntries(source));
}

for (const output of outputs) {
  const outputPath = path.join(root, output.path);
  let listing;

  try {
    listing = readJson(outputPath);
  } catch (error) {
    fail(`${output.path} is not valid JSON: ${error.message}`);
    continue;
  }

  if (!listing.packages || typeof listing.packages !== "object" || Array.isArray(listing.packages)) {
    fail(`${output.path} must contain a packages object.`);
    continue;
  }

  const actualPackageIds = Object.keys(listing.packages);
  const duplicateNames = actualPackageIds.filter((id, index) => actualPackageIds.indexOf(id) !== index);
  if (duplicateNames.length > 0) {
    fail(`${output.path} contains duplicate package names: ${duplicateNames.join(", ")}`);
  }

  const expected = [...output.expectedPackages].sort();
  const actual = [...actualPackageIds].sort();
  if (stable(expected) !== stable(actual)) {
    fail(`${output.path} packages mismatch. Expected ${expected.join(", ")}, got ${actual.join(", ")}.`);
  }

  if ((output.path === "vpm.json" || output.path === "index.json") && stable(actual) !== stable([...studioPackageIds].sort())) {
    fail(`${output.path} does not contain all Studio Iyan packages from source-all.json.`);
  }

  for (const packageId of actualPackageIds) {
    const generatedPackage = listing.packages[packageId];
    const catalogPackage = catalog.packages?.[packageId];
    if (!catalogPackage) {
      fail(`${output.path} contains package ${packageId}, but it is missing from vpm.json catalog.`);
      continue;
    }

    const generatedVersions = generatedPackage.versions ?? {};
    const catalogVersions = catalogPackage.versions ?? {};
    const generatedVersionNames = Object.keys(generatedVersions).sort();
    const catalogVersionNames = Object.keys(catalogVersions).sort();
    if (stable(generatedVersionNames) !== stable(catalogVersionNames)) {
      fail(`${output.path}:${packageId} version list changed.`);
    }

    for (const versionName of generatedVersionNames) {
      const generatedVersion = generatedVersions[versionName];
      const catalogVersion = catalogVersions[versionName];
      if (!catalogVersion) continue;

      for (const field of ["name", "version", "url", "zipSHA256"]) {
        if (generatedVersion[field] !== catalogVersion[field]) {
          fail(`${output.path}:${packageId}@${versionName} changed ${field}.`);
        }
      }

      if (generatedVersion.repo !== output.url) {
        fail(`${output.path}:${packageId}@${versionName} repo must be ${output.url}.`);
      }

      const dependencyBlocks = [
        ["dependencies", generatedVersion.dependencies ?? {}],
        ["vpmDependencies", generatedVersion.vpmDependencies ?? {}],
      ];

      for (const [fieldName, deps] of dependencyBlocks) {
        for (const dependencyName of Object.keys(deps)) {
          if (studioPackageIds.has(dependencyName) && dependencyName !== packageId) {
            fail(
              `${output.path}:${packageId}@${versionName} has ${fieldName}.${dependencyName}, which may install another Studio Iyan tool.`
            );
          }
        }
      }
    }

    const latest = latestVersion(generatedVersions);
    if (!latest) {
      warn(`${output.path}:${packageId} has no versions.`);
    }
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`Validated ${outputs.length} generated listing outputs.`);
