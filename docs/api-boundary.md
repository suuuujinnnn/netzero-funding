# 집계 API 경계

브라우저는 `GET /api/funding`만 호출합니다. 구현은 [서버 라우트](../src/app/api/funding/route.ts), [비공개 시트 조회](../src/views/project/api/private-funding.ts), [응답 검증](../src/views/project/ui/funding-data.ts)에 있습니다.

- 정상: `{ status: "ready", data: { amount, count, names }, checkedAt }`
- 서비스 계정 미설정: `{ status: "unconfigured" }`
- 인증·권한·데이터·네트워크 오류: HTTP 503, `{ status: "error" }`

서버는 Google Sheets의 `'홈페이지집계'!A1:C1001`만 요청하고, 확인 완료 총액·건수와 공개에 동의한 이름만 응답합니다. 비밀키·토큰·원본 응답은 브라우저와 로그에 노출하지 않습니다. 브라우저는 5분마다 갱신하고 실패 시 마지막 정상값을 유지합니다. 서버는 정상 집계를 인스턴스별 최대 60초 재사용합니다.

서비스 계정 권한, 환경변수, 운영자 확인 절차는 [시트 안내](funding-sheet-setup.md)에 있습니다. 구글 폼 제출과 입금 완료는 이 API가 판정하지 않습니다.
