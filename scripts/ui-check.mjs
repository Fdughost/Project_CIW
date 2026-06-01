import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const baselineDir = path.join(rootDir, "docs/ui-review/baseline");
const latestDir = path.join(rootDir, "docs/ui-review/latest");
const diffDir = path.join(rootDir, "docs/ui-review/diff");
const maxDiffRatio = Number(process.env.UI_DIFF_THRESHOLD || 0.015);
const pixelThreshold = Number(process.env.UI_PIXEL_THRESHOLD || 0.15);

async function readPng(filePath) {
  return PNG.sync.read(await readFile(filePath));
}

function ensureSameSize(name, baseline, latest) {
  if (baseline.width !== latest.width || baseline.height !== latest.height) {
    throw new Error(
      `${name}: size changed from ${baseline.width}x${baseline.height} to ${latest.width}x${latest.height}`
    );
  }
}

async function main() {
  let baselineFiles;
  try {
    baselineFiles = (await readdir(baselineDir)).filter((file) => file.endsWith(".png"));
  } catch {
    throw new Error("Missing docs/ui-review/baseline. Run `npm run ui:baseline` first.");
  }

  if (!baselineFiles.length) {
    throw new Error("Baseline directory is empty. Run `npm run ui:baseline` first.");
  }

  await mkdir(diffDir, { recursive: true });
  const failures = [];

  for (const file of baselineFiles) {
    const baselinePath = path.join(baselineDir, file);
    const latestPath = path.join(latestDir, file);
    const diffPath = path.join(diffDir, file);

    const baseline = await readPng(baselinePath);
    const latest = await readPng(latestPath).catch(() => null);
    if (!latest) {
      failures.push(`${file}: missing latest screenshot`);
      continue;
    }

    ensureSameSize(file, baseline, latest);
    const diff = new PNG({ width: baseline.width, height: baseline.height });
    const diffPixels = pixelmatch(
      baseline.data,
      latest.data,
      diff.data,
      baseline.width,
      baseline.height,
      { threshold: pixelThreshold, includeAA: false }
    );
    const ratio = diffPixels / (baseline.width * baseline.height);
    await writeFile(diffPath, PNG.sync.write(diff));

    const status = ratio <= maxDiffRatio ? "ok" : "changed";
    console.log(`${status.padEnd(7)} ${file} ${(ratio * 100).toFixed(3)}%`);

    if (ratio > maxDiffRatio) {
      failures.push(
        `${file}: ${(ratio * 100).toFixed(3)}% differs, threshold is ${(maxDiffRatio * 100).toFixed(3)}%`
      );
    }
  }

  if (failures.length) {
    console.error("\nUI screenshot check failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    console.error("\nInspect docs/ui-review/latest and docs/ui-review/diff before updating the baseline.");
    process.exit(1);
  }

  console.log(`\nUI screenshot check passed (${baselineFiles.length} files).`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
