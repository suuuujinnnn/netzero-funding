# 프론트엔드 아키텍처

운영 화면은 Next.js App Router·React·strict TypeScript·Tailwind CSS v4로 구현합니다. 실제 폴더 구조는 다음과 같습니다.

| 경로                                     | 책임                                      |
| ---------------------------------------- | ----------------------------------------- |
| `src/app/`                               | 페이지·layout·전역 CSS·`GET /api/funding` |
| `src/views/project/`                     | 운영 화면, 집계 표시, 비공개 시트 조회    |
| `src/features/`                          | 탭, 계좌 복사, 교실 다시보기              |
| `src/shared/lib/`                        | 도메인에 독립적인 유틸리티                |
| `src/views/mockups/`, `src/app/mockups/` | 별도 검토용 화면                          |

라우트는 화면을 연결하고, 정적인 소개·계획·단체 내용은 서버 컴포넌트에서 렌더링합니다. 탭, 복사, 5분 간격 집계 갱신에만 클라이언트 상태를 사용합니다. 히어로와 명예의 전당은 하나의 집계 상태를 공유합니다. 빈 FSD 레이어나 전역 store는 만들지 않습니다.

브라우저는 동일 도메인의 `/api/funding`만 조회합니다. Node.js 서버 함수가 비공개 Google Sheets의 집계 탭을 읽고 확인된 총액·건수·공개 동의 이름만 반환합니다. 인증과 응답 형식은 [API 경계](api-boundary.md), 실제 설정은 [시트 안내](funding-sheet-setup.md)를 따릅니다. 서비스 계정 설정 전에는 준비 상태와 초기 0원·0건을 안내합니다.

`docs/mockup/v4.html`은 디자인 참고 자료입니다. 운영 정보와 동작은 `src/`를 기준으로 합니다.
