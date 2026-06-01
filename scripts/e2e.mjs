import { spawn } from "node:child_process";
import path from "node:path";

const rootDir = process.cwd();
const port = Number(process.env.E2E_PORT || 4176);
const baseUrl = `http://127.0.0.1:${port}`;

const bin = (name) =>
  path.join(
    rootDir,
    "node_modules",
    ".bin",
    process.platform === "win32" ? `${name}.cmd` : name
  );

const waitForServerReady = async () => {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    const isReady = await fetch(baseUrl)
      .then((response) => response.ok || response.status < 500)
      .catch(() => false);

    if (isReady) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  throw new Error(`E2E server did not become ready at ${baseUrl}`);
};

const runProcess = (command, args, options = {}) => {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: rootDir,
      stdio: "inherit",
      ...options,
    });

    child.on("exit", (code) => resolve(code ?? 1));
  });
};

const main = async () => {
  const server = spawn(
    bin("vite"),
    ["--host", "127.0.0.1", "--port", String(port), "--strictPort"],
    {
      cwd: rootDir,
      env: { ...process.env, BROWSER: "none" },
      stdio: "inherit",
    }
  );

  try {
    await waitForServerReady();
    const code = await runProcess(bin("playwright"), ["test"], {
      env: { ...process.env, PLAYWRIGHT_BASE_URL: baseUrl },
    });
    process.exitCode = code;
  } finally {
    server.kill("SIGTERM");
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
