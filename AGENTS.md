# 넷제로 펀딩 프론트엔드 작업 안내

이 저장소에는 v4 디자인을 구현한 Next.js 프론트엔드가 있습니다. 운영 화면은 `src/`에 있으며 `docs/mockup/v4.html`, `v4.css`, `v4.js`는 디자인 참고 원본입니다. 실제 Vercel 배포는 별도 작업입니다.

## 문서 경로

| 작업                                | 먼저 읽을 문서                           |
| ----------------------------------- | ---------------------------------------- |
| 화면 구조, 의존성, 상태 설계        | `docs/architecture.md`                   |
| React 또는 UI 구현                  | `docs/frontend-rules.md`                 |
| 색상·폰트·버튼·컴포넌트 스타일      | `DESIGN.md`                              |
| TypeScript·Next.js·shadcn 초기 설정 | `docs/frontend-initial-setup.md`         |
| 외부 API 연동                       | `docs/api-boundary.md`                   |
| 이미지와 정적 자산                  | `docs/assets.md`                         |
| 사용자에게 보이는 변경 검증         | `docs/ui-verification.md`                |
| 실제 브라우저 검증                  | `.agents/skills/playwright-cli/SKILL.md` |
| Playwright·MCP·Codex 훅 운영        | `docs/codex-tooling.md`                  |
| 테스트·환경 점검                    | `docs/test-and-doctor.md`                |
| 배포 페이지 제목·설명               | `docs/deployment-metadata.md`            |
| 코드 변경 전반                      | `docs/agent-workflow.md`                 |

## 기본 원칙

- v4 디자인의 내용과 동작을 출발점으로 삼되, 예시 수치를 실제 운영 데이터로 표현하지 않습니다. 목표·일정·계좌는 운영자가 확인한 값을 사용하고 실제 집계 자료가 없는 금액·참여 내역은 표시하지 않습니다.
- 기존 사용자 변경을 보존하고 요청 범위만 수정합니다.
- 실제 코드가 생기기 전에는 빈 레이어, 전역 Provider, store, API 추상화를 미리 만들지 않습니다.
- 서버와 브라우저의 책임을 구분하고 인터랙션이 필요한 최소 영역만 클라이언트 컴포넌트로 둡니다.
- 구현 후 정적 검사와 실제 브라우저에서 해당 화면의 주요 동작을 확인합니다.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
