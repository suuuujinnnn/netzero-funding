# 집계 API 경계

Apps Script는 비공개 시트의 `홈페이지집계`에서 확인 완료 총액·건수와 공개에 동의한 이름만 읽습니다. 편집 트리거와 5분 간격의 재확인 작업이 방문과 별개로 실행됩니다.

- `POST /api/funding`은 Apps Script 전용입니다. 서버는 Bearer 비밀값과 집계 형식을 검증하고, 정상 집계를 확인 시각과 함께 비공개 Vercel Blob의 `funding/current.json`에 통째로 저장합니다. 성공은 HTTP 204입니다. 조회·검증·저장에 실패하면 마지막 정상 집계가 유지됩니다.
- `GET /api/funding`은 저장된 파일만 읽습니다. 정상 응답은 `{ status: "ready", data: { amount, count, names }, checkedAt }`입니다. Blob 미설정은 `{ status: "unconfigured" }`, 파일 미생성 또는 읽기 실패는 HTTP 503과 `{ status: "error" }`입니다.

홈과 명예의 전당은 집계 하나를 공유합니다. 브라우저는 페이지를 열 때, 표시 중 60초마다, 숨긴 탭을 다시 표시할 때 조회합니다. 운영 절차는 [시트 안내](funding-sheet-setup.md)에 있습니다.
