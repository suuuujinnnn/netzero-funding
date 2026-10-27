# 검증 명령

`pnpm agent:verify`는 doctor, Prettier, ESLint, TypeScript, 집계 테스트, Next.js 프로덕션 빌드를 실행합니다. CI도 같은 명령을 사용합니다.

`pnpm agent:doctor`는 필수 설정·문서 링크·운영 화면 파일·공개 자산을 확인합니다. `pnpm test:funding`은 집계 데이터 검증, 비공개 시트 조회와 오류 처리를 검사합니다. 실제 Google 인증과 배포 환경은 [시트 안내](funding-sheet-setup.md)의 연결 절차로 별도 확인합니다.

사용자에게 보이는 변경은 [UI 검증](ui-verification.md)에 따라 브라우저에서 확인합니다.
