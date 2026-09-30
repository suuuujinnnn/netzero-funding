# 넷제로 펀딩 프론트엔드 작업 안내

이 저장소에는 Next.js 프론트엔드의 초기 설정과 정적 목업이 있습니다. 확정된 화면 기준은 `docs/mockup/v4.html`, `v4.css`, `v4.js`입니다. v4 화면과 Vercel 실제 배포는 아직 구현되지 않았습니다.

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

- 목업 v4의 내용과 동작을 출발점으로 삼되, 목업 수치를 실제 운영 데이터로 표현하지 않습니다.
- 기존 사용자 변경을 보존하고 요청 범위만 수정합니다.
- 실제 코드가 생기기 전에는 빈 레이어, 전역 Provider, store, API 추상화를 미리 만들지 않습니다.
- 서버와 브라우저의 책임을 구분하고 인터랙션이 필요한 최소 영역만 클라이언트 컴포넌트로 둡니다.
- 구현 후 정적 검사와 실제 브라우저에서 해당 화면의 주요 동작을 확인합니다.
