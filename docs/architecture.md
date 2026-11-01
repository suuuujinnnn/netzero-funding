# 프론트엔드 아키텍처

Next.js App Router·React·strict TypeScript·Tailwind CSS v4로 구성합니다. 배포된 운영 앱을 기준으로 작업하며 별도 목업 앱을 유지하지 않습니다.

| 경로                            | 책임                                          |
| ------------------------------- | --------------------------------------------- |
| `src/app/`                      | `/` 페이지·layout·전역 CSS·`GET /api/funding` |
| `src/views/project/ui/`         | 운영 홈·여섯 상세 메뉴·집계 표시·순차 등장    |
| `src/views/project/ui/effects/` | 기대효과 카드·비교 인터랙션·환산 자료         |
| `src/views/project/api/`        | 비공개 Google Sheets 조회                     |
| `src/features/copy-account/`    | 계좌 복사                                     |
| `src/shared/lib/`               | 도메인에 독립적인 유틸리티                    |

`project-view.tsx`가 화면을 구성하고, `live-project.tsx`는 5분 간격 집계를 관리합니다. `project-navigation.tsx`가 홈과 `#overview`·`#effects`·`#plan`·`#partners`·`#history`·`#donate`를 전환하며 URL 복원과 키보드 조작을 지원합니다.

기대효과의 정적 본문은 서버 컴포넌트, 카드 배치 비교와 캐러셀은 클라이언트 컴포넌트입니다. 금액별 데이터는 한곳에서 공유합니다. 순차 등장은 메뉴 내부의 콘텐츠만 대상으로 하고 부모와 자식의 중첩 애니메이션을 배제합니다. 교실 부유와 카드 전환은 자체 동작을 유지합니다.

히어로와 명예의 전당은 하나의 집계 상태를 공유합니다. 브라우저는 동일 도메인의 `/api/funding`만 조회하며, 서버는 확인 완료 총액·건수·공개 동의 이름만 반환합니다. 인증과 응답 형식은 [API 경계](api-boundary.md), 외부 설정은 [시트 안내](funding-sheet-setup.md)를 따릅니다.

스타일은 전역 토큰과 기본 규칙(`globals.css`), 상세 공통 UI(`project.css`), 운영 레이아웃(`production.css`), 효과별 로컬 CSS로 구분합니다. `main`과 기본 작업 폴더 하나를 사용합니다.
