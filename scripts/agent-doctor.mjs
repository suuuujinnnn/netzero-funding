import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const failures = [];
const passed = [];

function check(condition, label) {
  (condition ? passed : failures).push(label);
}

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!existsSync(absolutePath)) {
    check(false, `${relativePath} 파일이 없습니다`);
    return null;
  }
  check(true, `${relativePath} 파일이 있습니다`);
  return readFileSync(absolutePath, "utf8");
}

function checkLocalLinks(source, sourcePath) {
  for (const match of source.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].split("#")[0];
    if (!target || /^[a-z][a-z\d+.-]*:/i.test(target)) continue;
    const resolved = path.resolve(
      root,
      path.dirname(sourcePath),
      decodeURIComponent(target),
    );
    check(existsSync(resolved), `${sourcePath}: ${target}`);
  }
}

const requiredDocs = [
  "AGENTS.md",
  "README.md",
  "DESIGN.md",
  "docs/architecture.md",
  "docs/frontend-rules.md",
  "docs/api-boundary.md",
  "docs/assets.md",
  "docs/ui-verification.md",
  "docs/agent-workflow.md",
  "docs/codex-tooling.md",
  "docs/frontend-initial-setup.md",
  "docs/deployment-metadata.md",
  "docs/test-and-doctor.md",
  "docs/mockup/README.md",
  ".agents/skills/playwright-cli/SKILL.md",
];

const shadcnSource = read("components.json");
if (shadcnSource) {
  try {
    const config = JSON.parse(shadcnSource);
    check(
      config.style === "new-york" && config.tailwind?.cssVariables === true,
      "shadcn 스타일과 CSS 변수 설정",
    );
  } catch {
    check(false, "components.json JSON 형식");
  }
}

const tsconfigSource = read("tsconfig.json");
if (tsconfigSource) {
  try {
    const config = JSON.parse(tsconfigSource);
    check(config.compilerOptions?.strict === true, "TypeScript strict 설정");
    check(
      config.compilerOptions?.allowJs === false,
      "새 앱의 JavaScript 혼용 방지 설정",
    );
  } catch {
    check(false, "tsconfig.json JSON 형식");
  }
}

read("eslint.config.mjs");
read("prettier.config.mjs");
read(".prettierignore");
read(".github/workflows/ci.yml");

const packageJsonPath = path.join(root, "package.json");
if (existsSync(packageJsonPath)) {
  const packageSource = read("package.json");
  check(
    existsSync(path.join(root, "pnpm-lock.yaml")),
    "프론트엔드 pnpm 잠금 파일",
  );
  try {
    const packageJson = JSON.parse(packageSource);
    const pnpmVersion = /^pnpm@(\d+)\.\d+\.\d+$/.exec(
      packageJson.packageManager ?? "",
    );
    check(
      Boolean(pnpmVersion && Number(pnpmVersion[1]) >= 11),
      "고정된 pnpm 11 이상 버전",
    );
    for (const script of [
      "agent:doctor",
      "agent:verify",
      "format:check",
      "lint",
      "typecheck",
      "build",
    ]) {
      check(
        typeof packageJson.scripts?.[script] === "string",
        `${script} 패키지 명령`,
      );
    }
  } catch {
    check(false, "package.json JSON 형식");
  }
}

for (const appFile of [
  "postcss.config.mjs",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/globals.css",
  "src/shared/lib/utils.ts",
]) {
  read(appFile);
}

for (const doc of requiredDocs) {
  const content = read(doc);
  if (content) checkLocalLinks(content, doc);
}

const approvedPhotoPath = path.join(root, "assets", "univ.jpg");
const approvedPhoto = existsSync(approvedPhotoPath)
  ? readFileSync(approvedPhotoPath).toString("base64")
  : null;
check(Boolean(approvedPhoto), "사용자가 제공한 v4 사진 파일");

let v4ExportHtml = null;
for (const version of ["v1", "v2", "v3", "v4"]) {
  const exportHtml = read(`docs/mockup/exports/${version}.html`);
  if (version === "v4") v4ExportHtml = exportHtml;
  if (exportHtml) {
    if (version === "v4") {
      const embeddedPhotos = [
        ...exportHtml.matchAll(/data:image\/jpeg;base64,([A-Za-z0-9+/=]+)/g),
      ];
      check(
        Boolean(approvedPhoto) &&
          embeddedPhotos.length === 2 &&
          embeddedPhotos.every((match) => match[1] === approvedPhoto) &&
          !exportHtml.includes("homepage_image.jpg"),
        "v4 export에 제공된 사진만 히어로와 퍼즐에 내장",
      );
    } else {
      check(
        !/data:image\/jpeg;base64,|homepage_image\.jpg/.test(exportHtml),
        `${version} export에 무단 캠퍼스 사진 없음`,
      );
    }
  }
  if (version !== "v4") {
    for (const extension of ["html", "css", "js"]) {
      check(
        !existsSync(
          path.join(root, "docs", "mockup", `${version}.${extension}`),
        ),
        `${version} 원본 ${extension} 정리`,
      );
    }
    continue;
  }

  const htmlPath = "docs/mockup/v4.html";
  const html = read(htmlPath);
  read("docs/mockup/v4.css");
  read("docs/mockup/v4.js");
  if (!html) continue;
  check(
    html.includes('src="../../assets/univ.jpg"') &&
      html.includes('href="../../assets/univ.jpg"') &&
      !html.includes("homepage_image.jpg"),
    "v4 원본의 히어로와 퍼즐에 제공된 사진 연결",
  );
  const ids = new Set(
    [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]),
  );
  for (const match of html.matchAll(
    /\b(?:src|href|aria-controls|aria-labelledby)="([^"]+)"/g,
  )) {
    const target = match[1];
    if (target.startsWith("#")) {
      check(ids.has(target.slice(1)), `${htmlPath}: ${target} 대상`);
    } else if (
      match[0].startsWith("aria-controls=") ||
      match[0].startsWith("aria-labelledby=")
    ) {
      check(ids.has(target), `${htmlPath}: ${target} ARIA 대상`);
    } else if (!/^[a-z][a-z\d+.-]*:/i.test(target)) {
      const resolved = path.resolve(
        root,
        path.dirname(htmlPath),
        target.split("#")[0],
      );
      check(existsSync(resolved), `${htmlPath}: ${target} 자산`);
    }
  }
}

const deployHtml = read("deploy/index.html");
check(
  Boolean(deployHtml) &&
    Boolean(v4ExportHtml) &&
    v4ExportHtml.includes('href="v4.html"') &&
    deployHtml === v4ExportHtml.replace('href="v4.html"', 'href="index.html"'),
  "정적 배포 index.html과 v4 export 내용 일치",
);

check(
  !existsSync(path.join(root, "docs", "homepage_image.jpg")),
  "무단 캠퍼스 사진 파일 제거",
);

console.log("Agent doctor: 정적 목업 및 문서 연결");
for (const label of passed) console.log(`PASS ${label}`);
for (const label of failures) console.error(`FAIL ${label}`);
console.log(`${passed.length} passed, ${failures.length} failed`);
if (failures.length) process.exitCode = 1;
