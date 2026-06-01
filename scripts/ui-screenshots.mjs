import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const port = Number(process.env.UI_REVIEW_PORT || 4175);
const baseUrl = `http://127.0.0.1:${port}`;
const storageKey = "chloe-in-wonderland:progress:v1";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 900 },
  { name: "mobile", width: 375, height: 812 },
];

const sentinelPages = [
  {
    name: "intro",
    mode: "intro",
    waitFor: "Chloe in Wonderland",
  },
  {
    name: "chapter-1",
    mode: "start",
    waitFor: "空之轨迹",
  },
  {
    name: "chapter-2",
    mode: "continue",
    chapterIndex: 1,
    waitFor: "谁是骑士",
  },
  {
    name: "chapter-3",
    mode: "continue",
    chapterIndex: 2,
    waitFor: "码农天堂",
  },
  {
    name: "chapter-4",
    mode: "continue",
    chapterIndex: 3,
    waitFor: "砖头",
  },
  {
    name: "chapter-5",
    mode: "continue",
    chapterIndex: 4,
    waitFor: "尾行",
  },
  {
    name: "chapter-6",
    mode: "continue",
    chapterIndex: 5,
    waitFor: "双剑合璧",
  },
  {
    name: "chapter-7",
    mode: "continue",
    chapterIndex: 6,
    waitFor: "借阅卡",
  },
  {
    name: "chapter-8",
    mode: "continue",
    chapterIndex: 7,
    waitFor: "莫奈的画",
  },
];

function parseOutputDir() {
  const args = process.argv.slice(2);
  if (args.includes("--baseline")) {
    return path.join(rootDir, "docs/ui-review/baseline");
  }

  const outIndex = args.indexOf("--out");
  if (outIndex !== -1 && args[outIndex + 1]) {
    return path.resolve(rootDir, args[outIndex + 1]);
  }

  return path.join(rootDir, "docs/ui-review/latest");
}

async function waitForServerReady() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    const isReady = await new Promise((resolve) => {
      fetch(baseUrl, { method: "GET" })
        .then((response) => resolve(response.ok || response.status < 500))
        .catch(() => resolve(false));
    });

    if (isReady) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  throw new Error(`Vite server did not become ready at ${baseUrl}`);
}

function startViteServer() {
  const viteBin = path.join(
    rootDir,
    "node_modules",
    ".bin",
    process.platform === "win32" ? "vite.cmd" : "vite"
  );

  const server = spawn(
    viteBin,
    ["--host", "127.0.0.1", "--port", String(port), "--strictPort"],
    {
      cwd: rootDir,
      env: { ...process.env, BROWSER: "none" },
      stdio: ["ignore", "pipe", "pipe"],
    }
  );

  server.stdout.on("data", (chunk) => process.stdout.write(chunk));
  server.stderr.on("data", (chunk) => process.stderr.write(chunk));

  return server;
}

async function openPage(page, target) {
  if (target.mode === "intro" || target.mode === "start") {
    await page.addInitScript((key) => window.localStorage.removeItem(key), storageKey);
  }

  if (target.mode === "continue") {
    await page.addInitScript(
      ({ key, chapterIndex }) => {
        window.localStorage.setItem(
          key,
          JSON.stringify({
            chapterIndex,
            hintUsage: {},
            failedAttempts: {},
            savedAt: new Date().toISOString(),
          })
        );
      },
      { key: storageKey, chapterIndex: target.chapterIndex }
    );
  }

  await page.goto(baseUrl, { waitUntil: "networkidle" });

  if (target.mode === "start") {
    await page.getByRole("button", { name: /开始冒险|重新开始/ }).click();
  }

  if (target.mode === "continue") {
    await page.getByRole("button", { name: "继续冒险" }).click();
  }

  await page.getByText(target.waitFor, { exact: false }).first().waitFor({
    state: "visible",
    timeout: 10_000,
  });
  await page.waitForTimeout(350);
}

async function main() {
  const outputDir = parseOutputDir();
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });

  const server = startViteServer();
  let browser;

  try {
    await waitForServerReady();
    browser = await chromium.launch();

    for (const viewport of viewports) {
      for (const target of sentinelPages) {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
          deviceScaleFactor: 1,
          colorScheme: "light",
          reducedMotion: "reduce",
        });
        const page = await context.newPage();
        await openPage(page, target);

        const filePath = path.join(outputDir, `${target.name}-${viewport.name}.png`);
        await page.screenshot({
          path: filePath,
          fullPage: true,
          animations: "disabled",
        });
        console.log(`captured ${path.relative(rootDir, filePath)}`);
        await context.close();
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("Executable doesn't exist")) {
      console.error(
        "Playwright Chromium is not installed. Run `npx playwright install chromium` once, then retry."
      );
    }
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
    server.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
