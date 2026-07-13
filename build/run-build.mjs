import { spawnSync } from "node:child_process";

const useNativeNextBuild = process.platform === "win32";
const executable = useNativeNextBuild ? "next" : "vinext";
const environment = {
  ...process.env,
  WRANGLER_LOG_PATH: process.env.WRANGLER_LOG_PATH ?? ".wrangler/wrangler.log",
};

const result = spawnSync(executable, ["build"], {
  env: environment,
  shell: true,
  stdio: "inherit",
});

if (result.error) throw result.error;
process.exit(result.status ?? 1);
