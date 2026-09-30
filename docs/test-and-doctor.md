# 테스트와 agent doctor

`veily-web`에서는 `agent:doctor`가 Node·pnpm 버전, 필수 문서, Playwright CLI 설정, 패키지 스크립트, 문서 길이를 확인했습니다. `agent:verify`는 doctor, 포맷, lint, 타입 검사, Vitest, 프로덕션 빌드를 묶었습니다. CI도 같은 검사를 실행했습니다.

Next.js 초기 설정과 `package.json`을 만들었습니다. [agent doctor 스크립트](../scripts/agent-doctor.mjs)는 목업·문서·앱 설정을 검사하고, ESLint·Prettier·TypeScript·Next.js 빌드를 [CI 워크플로](../.github/workflows/ci.yml)에 연결했습니다. 독립된 도메인 로직이 아직 없어 단위 테스트 스크립트는 추가하지 않았습니다.

```bash
node scripts/agent-doctor.mjs
```

doctor는 필요한 문서·앱 설정과 v4 원본 HTML·CSS·JavaScript, v1~v4 단일 파일, 배포용 `deploy/index.html`의 존재를 확인합니다. 배포 파일이 홈 링크를 제외하고 v4 export와 동일한지, Markdown의 로컬 링크, 목업의 자산 경로와 탭/패널 ARIA 연결도 확인합니다. v4에는 사용자가 제공한 `assets/univ.jpg`가 원본과 export에 연결됐는지, 다른 버전에는 이전 캠퍼스 사진이 남아 있지 않은지도 검사합니다. 잠금 파일과 pnpm 버전·패키지 명령도 확인하지만 브라우저 동작을 검증하지는 않습니다.

CI는 잠금 파일로 의존성을 설치하고 `pnpm agent:verify`를 실행합니다. 이 명령은 doctor·포맷·lint·타입 검사·빌드를 순서대로 실행합니다.

## 검증과 이후의 테스트

1. `pnpm agent:verify`로 필수 정적 검사를 실행합니다.
2. 목업 원본은 포맷 대상에서 제외합니다.
3. 사용자에게 보이는 동작은 [UI 검증](ui-verification.md)과 [Playwright CLI 스킬](../.agents/skills/playwright-cli/SKILL.md)에 따라 실제 브라우저에서 확인합니다.
4. 의미 있는 도메인 로직이 생기면 테스트 러너와 `test` 명령을 추가하고 CI에 연결합니다.

Vitest는 날짜·금액 계산이나 데이터 변환처럼 독립된 로직이 생겼을 때 사용합니다. Veily의 문서 문자 수 함수만 검사하는 예제 테스트나 웨딩 화면 테스트는 이 프로젝트에 복사하지 않습니다. 탭·계좌 복사처럼 브라우저 상태가 중요한 동작은 실제 브라우저에서 확인합니다.
