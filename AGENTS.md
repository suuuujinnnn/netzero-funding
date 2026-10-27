# 넷제로 펀딩 작업 안내

운영 화면은 `src/`의 Next.js 앱입니다. `docs/mockup/v4.html`은 디자인 참고 원본이며 Vercel 배포는 별도 작업입니다.

## 작업별 문서

- 구조·API: [아키텍처](docs/architecture.md), [집계 API](docs/api-boundary.md), [비공개 시트 설정](docs/funding-sheet-setup.md)
- UI: [디자인](DESIGN.md), [구현 규칙](docs/frontend-rules.md), [자산](docs/assets.md)
- 검증·배포: [작업 흐름](docs/agent-workflow.md), [UI 검증](docs/ui-verification.md), [검사 명령](docs/test-and-doctor.md), [배포 점검](docs/deployment-readiness.md)

## 기본 원칙

- 목표·일정·계좌는 운영자가 확인한 값을 사용합니다. 실제 집계 자료가 없는 금액·명단에 목업 값을 섞지 않습니다.
- 기존 사용자 변경을 보존하고 요청 범위만 수정합니다. 서버 전용 Google 인증 정보를 브라우저에 노출하지 않습니다.
- 코드 변경 후 `pnpm agent:verify`를 실행하고 화면 변경은 실제 브라우저에서 확인합니다.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
