# 넷제로 교실 만들기 — 캠페인 목업

대학생이 강의실의 전력 사용량을 추정하고, 이에 상응하는 재생에너지 환경가치를
함께 구매하는 캠페인의 단일 페이지 디자인 목업입니다.

## 미리보기

작업용 목업은 [docs/mockup/v1.html](docs/mockup/v1.html), [v2.html](docs/mockup/v2.html), [v3.html](docs/mockup/v3.html), [v4.html](docs/mockup/v4.html)입니다. v4가 확정된 프론트엔드 기준입니다.

단일 파일로 열어 볼 때는 `docs/mockup/exports/`의 각 버전을 사용하세요. 해당 HTML에는 CSS와 JavaScript가 내장돼 있습니다.

v3 참여 내역에는 [1안] 24조각 퍼즐과 [2안] 801호 교실 치우기가 있습니다. 퍼즐은 참여 건수가 아닌 모금 진행률을 나타냅니다. v4는 동일한 프로젝트 정보를 더 간결한 디자인으로 구성했습니다.

진행률, 참여 내역, 일정은 목업 값입니다. 실제 결제와 폼 제출은 연결되지 않았습니다.

임의로 가져왔던 캠퍼스 사진은 원본 목업과 단일 파일 export에서 제거했습니다. 해당 이미지 영역은 비워 두었습니다.

## 프론트엔드 작업 문서

확정된 화면 기준은 v4입니다. Next.js 프론트엔드와 Vercel 배포는 아직 구현되지 않았습니다. 구현 전에 [아키텍처](docs/architecture.md), [프론트엔드 규칙](docs/frontend-rules.md), [API 경계](docs/api-boundary.md)를 참고하세요. 이미지 처리와 브라우저 검증은 각각 [자산 문서](docs/assets.md), [UI 검증 문서](docs/ui-verification.md)에 정리했습니다. 작업 순서는 [코드 작업 흐름](docs/agent-workflow.md)을 따릅니다.

이 문서들은 `veily-web`의 구조와 개발 원칙을 이 프로젝트에 맞게 옮긴 것입니다. 제품별 화면, 디자인 값, API 계약은 v4와 실제 운영 요구에 맞춰 정합니다.

Codex와의 작업에 사용할 Playwright CLI, 선택적 MCP, 훅의 적용 범위는 [Codex 도구 문서](docs/codex-tooling.md)에 정리했습니다. 브라우저 검증용 [프로젝트 스킬](.agents/skills/playwright-cli/SKILL.md)도 준비했습니다. 현재는 프론트엔드 패키지와 브라우저 도구가 설치되지 않아 명령은 아직 실행할 수 없습니다.

현재 목업과 문서의 연결은 `node scripts/agent-doctor.mjs`로 확인할 수 있습니다. 프론트엔드 구축 후 적용할 테스트·빌드 검사 계획은 [테스트와 doctor](docs/test-and-doctor.md)에 있습니다.

v4에서 추출한 색·폰트·버튼 기준은 [DESIGN.md](DESIGN.md)에, TypeScript·shadcn·Next.js 초기 설정은 [프론트엔드 초기 설정](docs/frontend-initial-setup.md)에 정리했습니다. [tsconfig.json](tsconfig.json)과 [components.json](components.json)은 향후 앱의 설정 초안입니다.

ESLint·Prettier 설정과 CI 워크플로도 준비했습니다. 현재 CI는 정적 목업 doctor를 실행하고, 프론트엔드 패키지와 잠금 파일이 추가되면 포맷·lint·타입 검사·테스트·빌드를 실행하도록 구성했습니다.

배포 페이지에 사용할 제목·설명 초안과 Gemini 공유 이미지 프롬프트는 [배포용 메타데이터](docs/deployment-metadata.md)에 있습니다. 공유 이미지는 아직 만들거나 연결하지 않았습니다.
