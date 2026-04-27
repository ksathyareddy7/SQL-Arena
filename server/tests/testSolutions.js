import fs from "fs/promises";
import pool from "../database/db.js";

const BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
const TEST_USERNAME = process.env.TEST_USERNAME || "test";

const APPS = [
  {
    name: "social",
    dataModule: new URL(
      "../database/social/js/social.data.js",
      import.meta.url,
    ),
    reportBasename: "social_solutions_report.md",
  },
  {
    name: "ecommerce",
    dataModule: new URL(
      "../database/ecommerce/js/ecommerce.data.js",
      import.meta.url,
    ),
    reportBasename: "ecommerce_solutions_report.md",
  },
  {
    name: "food",
    dataModule: new URL(
      "../database/food/js/food.data.js",
      import.meta.url,
    ),
    reportBasename: "food_solutions_report.md",
  },
  {
    name: "ride",
    dataModule: new URL(
      "../database/ride/js/ride.data.js",
      import.meta.url,
    ),
    reportBasename: "ride_solutions_report.md",
  },
  {
    name: "movies",
    dataModule: new URL(
      "../database/movies/js/movies.data.js",
      import.meta.url,
    ),
    reportBasename: "movies_solutions_report.md",
  },
  {
    name: "bank",
    dataModule: new URL(
      "../database/bank/js/bank.data.js",
      import.meta.url,
    ),
    reportBasename: "bank_solutions_report.md",
  },
  {
    name: "realestate",
    dataModule: new URL(
      "../database/realestate/js/realestate.data.js",
      import.meta.url,
    ),
    reportBasename: "realestate_solutions_report.md",
  },
  {
    name: "hospital",
    dataModule: new URL(
      "../database/hospital/js/hospital.data.js",
      import.meta.url,
    ),
    reportBasename: "hospital_solutions_report.md",
  },
  {
    name: "education",
    dataModule: new URL(
      "../database/education/js/education.data.js",
      import.meta.url,
    ),
    reportBasename: "education_solutions_report.md",
  },
  {
    name: "chat",
    dataModule: new URL(
      "../database/chat/js/chat.data.js",
      import.meta.url,
    ),
    reportBasename: "chat_solutions_report.md",
  },
];

function parseAppsArg() {
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--apps") {
      return String(argv[i + 1] || "").trim();
    }
  }
  return "";
}

function getSelectedApps() {
  const raw =
    parseAppsArg() || String(process.env.TEST_APPS || "").trim();
  if (!raw) return APPS;

  const selected = new Set(
    raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );

  const list = APPS.filter((a) => selected.has(a.name));
  if (list.length === 0) {
    throw new Error(
      `No matching apps for TEST_APPS="${raw}". Valid: ${APPS.map((a) => a.name).join(", ")}`,
    );
  }
  return list;
}

async function jsonFetch(url, { method = "GET", headers = {}, body } = {}) {
  const maxAttempts = 4;
  let lastErr = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(url, {
        method,
        headers: {
          Accept: "application/json",
          ...headers,
        },
        body,
      });

      const text = await res.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = { raw: text };
      }

      if (!res.ok) {
        const error = new Error(
          `Request failed (${res.status}) ${method} ${url}: ${data?.error || text || "Unknown error"}`,
        );
        error.status = res.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (err) {
      lastErr = err;

      const isNetworkish =
        err instanceof TypeError ||
        err?.cause?.code === "ECONNREFUSED" ||
        err?.cause?.code === "ETIMEDOUT" ||
        err?.cause?.code === "EPIPE";

      if (!isNetworkish || attempt === maxAttempts) {
        if (err?.cause) {
          err.message = `${err.message} (cause: ${err.cause.code || err.cause.message || String(err.cause)})`;
        }
        throw err;
      }

      const delayMs = 200 * Math.pow(2, attempt - 1);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  throw lastErr || new Error("Request failed");
}

async function ensureTestUser(username) {
  const loginUrl = `${BASE_URL}/api/auth/login`;
  const signupUrl = `${BASE_URL}/api/auth/signup`;

  try {
    const user = await jsonFetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    return { user, created: false };
  } catch (err) {
    if (err?.status !== 404 && err?.status !== 400) {
      throw err;
    }
  }

  try {
    await jsonFetch(signupUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
  } catch (err) {
    if (err?.status !== 400) {
      throw err;
    }
  }

  const user = await jsonFetch(loginUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  return { user, created: true };
}

function buildMarkdownReport({ appName, report, total, passed, failed }) {
  let mdReport = `# Solutions Evaluation Report (${appName})\n\n`;
  mdReport += `**Summary:**\n- Total Approaches: ${total}\n- Passed: ${passed}\n- Failed: ${failed}\n\n`;
  mdReport += `## Detailed Results\n`;

  for (const entry of report) {
    const emoji = entry.success ? "✅ PASS" : "❌ FAIL";
    mdReport += `### ${emoji} : ${entry.code} - ${entry.title}\n`;
    if (!entry.success) {
      if (entry.error) {
        mdReport += `> **Error Output**: \`${entry.error}\`\n\n`;
      } else {
        mdReport += `> **Failure Reason**: The query executed successfully but the results did not match the expected dataset rows/fields.\n\n`;
      }
    }
    mdReport += "```sql\n" + entry.query + "\n```\n\n";
  }

  return mdReport;
}

async function loadSolutionsFromDataModule({ dataModule }) {
  const mod = await import(dataModule.href);
  const solutions = mod.solutions;
  if (!Array.isArray(solutions)) {
    throw new Error(`Invalid solutions export. Expected 'solutions' to be an array.`);
  }
  return solutions;
}

async function runAppTests({
  appName,
  solutions,
  codeToId,
  authedHeaders,
}) {
  const report = [];
  let total = 0;
  let passed = 0;
  let failed = 0;

  for (const item of solutions) {
    const questionCode = item.code;
    const questionId = codeToId[questionCode];

    if (!questionId) {
      console.warn(
        `WARNING: Could not find DB UUID for question code: ${questionCode}`,
      );
      continue;
    }

    for (const approach of item.approaches) {
      total++;

      const payload = {
        questionId: questionId,
        query: approach.query,
      };

      try {
        const data = await jsonFetch(`${BASE_URL}/api/execute`, {
          method: "POST",
          headers: authedHeaders,
          body: JSON.stringify(payload),
        });
        const isSuccess = data.isCorrect === true;

        const reportEntry = {
          code: questionCode,
          title: approach.approach_title,
          is_optimal: approach.is_optimal,
          query: approach.query,
          success: isSuccess,
          error: data.reason || data.error || null,
          isCorrect_flag: data.isCorrect,
        };

        if (isSuccess) {
          passed++;
          console.log(
            `✅ [${appName}] [${questionCode}] - ${approach.approach_title}...`,
          );
        } else {
          failed++;
          console.log(
            `❌ [${appName}] [${questionCode}] - ${approach.approach_title}...`,
          );
        }

        report.push(reportEntry);
      } catch (e) {
        failed++;
        console.error(`ERROR on [${appName}] [${questionCode}]: ${e.message}`);
        report.push({
          code: questionCode,
          title: approach.approach_title,
          query: approach.query,
          success: false,
          error: e.message,
        });
      }
    }
  }

  return { report, total, passed, failed };
}

async function deleteTestUserIfCreated({ created, userId, username }) {
  if (!created) return;
  if (!userId) return;

  const res = await pool.query(
    "DELETE FROM users WHERE id = $1 AND username = $2",
    [userId, username],
  );

  if (res.rowCount === 1) {
    console.log(`Deleted test user \`${username}\` (\`id=${userId}\`).`);
  } else {
    console.warn(
      `WARNING: Expected to delete test user \`${username}\` (\`id=${userId}\`), but rowCount=${res.rowCount}.`,
    );
  }
}

async function runTests() {
  const selectedApps = getSelectedApps();
  console.log(
    `Starting Solutions Evaluation Test Suite (${selectedApps.map((a) => a.name).join(" + ")})...`,
  );

  const { user, created } = await ensureTestUser(TEST_USERNAME);
  const userId = user?.id;
  if (!userId) throw new Error("Failed to login: missing `id` in response");

  try {
    console.log(`Logged in as \`${user.username}\` (\`id=${userId}\`).`);

    const authedHeaders = {
      "Content-Type": "application/json",
      "x-user-id": String(userId),
    };

    // 1. Fetch mapping of code -> id
    const exercisesData = await jsonFetch(
      `${BASE_URL}/api/exercises?limit=5000`,
      { headers: { "x-user-id": String(userId) } },
    );
    console.log("Fetched exercises successfully.");
    const codeToId = {};
    for (const ex of exercisesData.data) {
      codeToId[ex.code] = ex.id;
    }

    const reportsDir = new URL("./reports/", import.meta.url);
    await fs.mkdir(reportsDir, { recursive: true });

    for (const app of selectedApps) {
      console.log(`\n--- Testing ${app.name} solutions ---`);
      const solutions = await loadSolutionsFromDataModule({
        dataModule: app.dataModule,
      });
      const { report, total, passed, failed } = await runAppTests({
        appName: app.name,
        solutions,
        codeToId,
        authedHeaders,
      });

      console.log(
        `Tests Completed (${app.name})! Total: ${total} | Passed: ${passed} | Failed: ${failed}`,
      );

      const mdReport = buildMarkdownReport({
        appName: app.name,
        report,
        total,
        passed,
        failed,
      });

      const reportPath = new URL(app.reportBasename, reportsDir);
      await fs.writeFile(reportPath, mdReport);
      console.log(`Report saved: ${reportPath.pathname}`);
    }
  } finally {
    try {
      await deleteTestUserIfCreated({
        created,
        userId,
        username: user.username,
      });
    } finally {
      await pool.end();
    }
  }
}

runTests().catch(console.error);
