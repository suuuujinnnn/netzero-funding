# 넷제로 교실 만들기 — 캠페인 목업

대학생이 강의실의 전력 사용량을 추정하고, 이에 상응하는 재생에너지 환경가치를
함께 구매하는 캠페인의 단일 페이지 디자인 목업입니다.

## 미리보기

작업용 원본은 [v4 목업](docs/mockup/v4.html)이며, v1~v3 원본은 정리했습니다. v1~v4 공유용 파일은 [docs/mockup/exports/](docs/mockup/exports/v4.html)에 보관합니다. v4가 확정된 프론트엔드 기준입니다.

단일 파일로 열어 볼 때는 `docs/mockup/exports/`의 각 버전을 사용하세요. 해당 HTML에는 CSS와 JavaScript가 내장돼 있습니다.

v3와 v4의 참여 내역에는 [1안] 24조각 퍼즐과 [2안] 801호 교실 치우기가 있습니다. 퍼즐은 참여 건수가 아닌 모금 진행률을 나타냅니다. v4는 동일한 프로젝트 정보를 더 간결한 디자인으로 구성했습니다.

진행률, 참여 내역, 일정은 목업 값입니다. 실제 결제와 폼 제출은 연결되지 않았습니다.

v4의 히어로와 퍼즐에는 사용자가 제공한 `assets/univ.jpg`를 사용합니다. 공유용 v4 단일 파일에도 사진을 내장했습니다.

정적 목업만 배포할 때는 [deploy/index.html](deploy/index.html)을 사용합니다. 이 파일은 v4 단일 파일의 홈 링크만 `index.html`로 맞춘 버전이며 다른 자산 없이 열립니다. Vercel에서는 프로젝트 Root Directory를 `deploy`, Framework Preset을 `Other`, Build Command를 빈 값으로 설정합니다. 저장소 루트를 배포하면 아직 목업을 옮기지 않은 Next.js 초기 화면이 표시됩니다.

## 프론트엔드 작업 문서

확정된 화면 기준은 v4입니다. Next.js 프론트엔드의 초기 설정은 마련했으며 v4 화면 이식과 Vercel 실제 배포는 아직 진행하지 않았습니다. 구현 전에 [아키텍처](docs/architecture.md), [프론트엔드 규칙](docs/frontend-rules.md), [API 경계](docs/api-boundary.md)를 참고하세요. 이미지 처리와 브라우저 검증은 각각 [자산 문서](docs/assets.md), [UI 검증 문서](docs/ui-verification.md)에 정리했습니다. 작업 순서는 [코드 작업 흐름](docs/agent-workflow.md)을 따릅니다.

이 문서들은 `veily-web`의 구조와 개발 원칙을 이 프로젝트에 맞게 옮긴 것입니다. 제품별 화면, 디자인 값, API 계약은 v4와 실제 운영 요구에 맞춰 정합니다.

Codex와의 작업에 사용할 Playwright CLI, 선택적 MCP, 훅의 적용 범위는 [Codex 도구 문서](docs/codex-tooling.md)에 정리했습니다. 브라우저 검증용 [프로젝트 스킬](.agents/skills/playwright-cli/SKILL.md)도 준비했습니다. 브라우저 도구는 v4 화면 구현 시 연결합니다.

`pnpm agent:verify`로 doctor·포맷·lint·타입 검사·빌드를 실행할 수 있습니다. 검사 범위는 [테스트와 doctor](docs/test-and-doctor.md)에 있습니다.

v4에서 추출한 색·폰트·버튼 기준은 [DESIGN.md](DESIGN.md)에, TypeScript·shadcn·Next.js 초기 설정은 [프론트엔드 초기 설정](docs/frontend-initial-setup.md)에 정리했습니다. [tsconfig.json](tsconfig.json)과 [components.json](components.json)은 앱의 초기 설정입니다.

ESLint·Prettier 설정과 CI 워크플로도 준비했습니다. CI는 잠금 파일로 의존성을 설치한 뒤 doctor·포맷·lint·타입 검사·빌드를 실행합니다.

배포 페이지에 사용할 제목·설명 초안과 Gemini 공유 이미지 프롬프트는 [배포용 메타데이터](docs/deployment-metadata.md)에 있습니다. 공유 이미지는 아직 만들거나 연결하지 않았습니다.
