const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, { stdio: "inherit", ...opts });
  if (res.error) throw res.error;
  if (res.status !== 0) process.exit(res.status ?? 1);
}

function ensureDeps(name, dir) {
  const nodeModules = path.join(dir, "node_modules");
  if (fs.existsSync(nodeModules)) return;
  console.log(`Installing ${name} dependencies...`);
  run("npm", ["install"], { cwd: dir });
}

function main() {
  const repoRoot = __dirname;
  const serverDir = path.join(repoRoot, "server");
  const clientDir = path.join(repoRoot, "client");

  ensureDeps("server", serverDir);
  ensureDeps("client", clientDir);

  run(
    "node",
    [path.join(serverDir, "scripts", "setup.js"), ...process.argv.slice(2)],
    { cwd: serverDir },
  );
}

main();
