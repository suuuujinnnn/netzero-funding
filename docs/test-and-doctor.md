# 테스트와 agent doctor

`veily-web`에서는 `agent:doctor`가 Node·pnpm 버전, 필수 문서, Playwright CLI 설정, 패키지 스크립트, 문서 길이를 확인했습니다. `agent:verify`는 doctor, 포맷, lint, 타입 검사, Vitest, 프로덕션 빌드를 묶었습니다. CI도 같은 검사를 실행했습니다.

Next.js 초기 설정과 `package.json`을 만들었습니다. [agent doctor 스크립트](../scripts/agent-doctor.mjs)는 목업·문서·앱 설정을 검사하고, ESLint·Prettier·TypeScript·Next.js 빌드를 [CI 워크플로](../.github/workflows/ci.yml)에 연결했습니다. 독립된 도메인 로직이 아직 없어 단위 테스트 스크립트는 추가하지 않았습니다.

```bash
node scripts/agent-doctor.mjs
```

doctor는 프론트엔드 설정, 아이콘·공개 자산·주요 화면 파일, Markdown 로컬 링크와 보존된 디자인 원본의 연결을 검사합니다. 이전 정적 HTML 배포 파일의 존재나 내용 일치는 운영 프론트엔드의 필수 조건으로 검사하지 않습니다. 잠금 파일과 패키지 명령도 확인하지만 브라우저 동작은 별도로 검증합니다.

CI는 잠금 파일로 의존성을 설치하고 `pnpm agent:verify`를 실행합니다. 이 명령은 doctor·포맷·lint·타입 검사·빌드를 순서대로 실행합니다.

## 검증과 이후의 테스트

1. `pnpm agent:verify`로 필수 정적 검사를 실행합니다.
2. 목업 원본은 포맷 대상에서 제외합니다.
3. 사용자에게 보이는 동작은 [UI 검증](ui-verification.md)과 [Playwright CLI 스킬](../.agents/skills/playwright-cli/SKILL.md)에 따라 실제 브라우저에서 확인합니다.
4. 의미 있는 도메인 로직이 생기면 테스트 러너와 `test` 명령을 추가하고 CI에 연결합니다.

Vitest는 날짜·금액 계산이나 데이터 변환처럼 독립된 로직이 생겼을 때 사용합니다. Veily의 문서 문자 수 함수만 검사하는 예제 테스트나 웨딩 화면 테스트는 이 프로젝트에 복사하지 않습니다. 탭·계좌 복사처럼 브라우저 상태가 중요한 동작은 실제 브라우저에서 확인합니다.

## 집계 로직 테스트

`pnpm test:funding`은 Node 기본 테스트 러너와 TypeScript 타입 제거를 사용해 CSV 유효성·비공개 열 거부·수정된 스냅샷·퍼즐 경계를 확인합니다. 별도 테스트 의존성은 추가하지 않았으며 `agent:verify`에 포함했습니다. 실제 시트 수식과 게시 갱신은 외부 시트 연결 후 확인해야 합니다.
