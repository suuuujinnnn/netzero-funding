# 집계 API 경계

브라우저는 `GET /api/funding`만 호출합니다. 서버는 `FUNDING_APPS_SCRIPT_URL`의 Apps Script 공개 집계를 읽어 형식을 검증합니다. 스크립트는 비공개 시트의 `홈페이지집계`에서 확인 완료 총액·건수와 공개에 동의한 이름만 반환합니다. 공개 주소에는 원본 응답과 이메일을 포함하지 않습니다.

- 정상: `{ status: "ready", data: { amount, count, names }, checkedAt }`
- 주소 미설정: `{ status: "unconfigured" }`
- 권한·데이터·네트워크 오류: HTTP 503, `{ status: "error" }`

브라우저는 5분마다 갱신하고 실패 시 마지막 정상값을 유지합니다. 서버는 정상 집계를 인스턴스별 최대 60초 재사용합니다. 설정과 운영 절차는 [시트 안내](funding-sheet-setup.md)에 있습니다.
