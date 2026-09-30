# 테스트와 agent doctor

`veily-web`에서는 `agent:doctor`가 Node·pnpm 버전, 필수 문서, Playwright CLI 설정, 패키지 스크립트, 문서 길이를 확인했습니다. `agent:verify`는 doctor, 포맷, lint, 타입 검사, Vitest, 프로덕션 빌드를 묶었습니다. CI도 같은 검사를 실행했습니다.

현재 저장소는 정적 목업이라 `package.json`, Next.js, Vitest가 없습니다. 존재하지 않는 명령을 만들지 않고, 지금 유효한 사전 점검을 [agent doctor 스크립트](../scripts/agent-doctor.mjs)에 옮겼습니다. ESLint·Prettier 설정과 [CI 워크플로](../.github/workflows/ci.yml)도 준비했습니다.

```bash
node scripts/agent-doctor.mjs
```

현재 doctor는 필요한 문서·설정과 `docs/mockup/`의 v1~v4 HTML·CSS·JavaScript·export 존재, Markdown의 로컬 링크, 목업의 자산 경로와 탭/패널 ARIA 연결을 확인합니다. 캠퍼스 사진이 파일·목업·export에 남아 있는지도 검사합니다. `package.json`이 생기면 잠금 파일, pnpm 버전, CI가 실행할 패키지 명령도 검사합니다. 브라우저 동작을 검증하지는 않습니다.

CI는 현재 doctor를 실행합니다. 프론트엔드 패키지가 추가되면 잠금 파일로 의존성을 설치하고 포맷·lint·타입 검사·테스트·빌드 단계를 실행합니다. 현재 CI에서 이 단계들이 통과했다고 간주하지 않습니다.

## 프론트엔드 생성 후 적용할 검증

1. `package.json`에서 Node·pnpm 11 이상·Playwright CLI 버전과 실제 사용할 명령을 고정합니다.
2. `agent:doctor`에 설치 버전, 필수 설정, 스크립트 연결을 확인하는 항목을 추가합니다. 다른 프로젝트의 정확한 버전이나 API 환경변수는 복사하지 않습니다.
3. 준비된 [ESLint 설정](../eslint.config.mjs)과 [Prettier 설정](../prettier.config.mjs)을 패키지 의존성·명령에 연결합니다. 목업 원본은 포맷 대상에서 제외되어 있습니다.
4. 포맷, lint, 타입 검사, 의미 있는 단위 테스트, 프로덕션 빌드를 한 번에 실행하는 `agent:verify`를 구성합니다.
5. 사용자에게 보이는 동작은 [UI 검증](ui-verification.md)과 [Playwright CLI 스킬](../.agents/skills/playwright-cli/SKILL.md)에 따라 실제 브라우저에서 확인합니다.

Vitest는 날짜·금액 계산이나 데이터 변환처럼 독립된 로직이 생겼을 때 사용합니다. Veily의 문서 문자 수 함수만 검사하는 예제 테스트나 웨딩 화면 테스트는 이 프로젝트에 복사하지 않습니다. 탭·계좌 복사처럼 브라우저 상태가 중요한 동작은 실제 브라우저에서 확인합니다.

