---
name: playwright-cli
description: Verify this project's web UI in a real browser with Playwright CLI after the frontend and its browser command are installed.
---

# Playwright CLI로 화면 검증

`veily-web`의 브라우저 검증 흐름을 이 저장소에 맞게 옮겼습니다. 현재는 정적 v4 목업만 있고 Playwright 패키지·`agent:browser` 명령은 아직 없습니다. 프론트엔드 구축 시 프로젝트에 CLI를 고정하고 `package.json`의 실제 명령을 확인한 뒤 사용합니다. 설치 전에는 존재하지 않는 명령을 실행하지 않습니다.

## 검증 흐름

1. 개발 서버에서 변경한 화면을 열고 [UI 검증 기준](../../../docs/ui-verification.md)의 화면 크기로 확인합니다.
2. DOM snapshot에서 접근 가능한 이름이나 최신 참조를 찾아 포인터와 키보드로 바뀐 동작을 수행합니다.
3. 다시 snapshot을 확인해 결과와 상태 변화를 검증합니다.
4. 브라우저 콘솔과 관련 네트워크 요청을 확인합니다. 필요한 경우에만 스크린샷을 남깁니다.

v4의 핵심 동작은 다섯 탭 전환, URL 해시로 직접 접근, 다음 단계 버튼, 계좌번호 복사 결과입니다. 탭은 방향키·Home·End도 확인합니다. 스크린샷만으로 상호작용이 정상이라고 판단하지 않습니다.

`veily-web`에서 사용한 명령 형태는 다음과 같습니다. 실제 설치된 CLI의 도움말과 `package.json`을 확인한 뒤 실행합니다.

```bash
pnpm agent:browser:install
pnpm agent:browser -- --help
pnpm agent:browser -- open http://localhost:3000/
pnpm agent:browser -- resize 375 812
pnpm agent:browser -- snapshot
pnpm agent:browser -- console warning
pnpm agent:browser -- requests
pnpm agent:browser -- close
```

Windows PowerShell에서는 `&`가 포함된 URL을 따옴표로 감쌉니다. 검증이 막히면 경로, 화면 크기, 동작, 막힌 이유와 실제 확인한 범위를 기록합니다.

