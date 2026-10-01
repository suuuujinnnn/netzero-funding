# Codex 작업 도구와 대화 흐름

`veily-web`의 Playwright·MCP·에이전트 운영 문서를 현재 저장소에 맞게 정리했습니다. 도구가 준비됐는지와 어떻게 사용할지는 구분합니다. 현재 저장소에는 Next.js 앱과 `package.json`이 있습니다. 브라우저 검증에는 설치된 Playwright CLI를 사용하며 프로젝트 MCP·훅은 등록하지 않았습니다.

## 작업을 요청할 때

요청에는 목표 화면, 원하는 동작, 데이터의 실제/목업 구분, 완료 기준을 적으면 충분합니다. Codex는 [작업 흐름](agent-workflow.md)에 따라 관련 문서와 코드를 찾아 실행하고, 변경 파일·검증 결과·남은 제약을 보고합니다. `AGENTS.md`는 작업별 문서 경로만 안내하고 대화마다 모든 문서를 읽도록 강제하지 않습니다.

## Playwright CLI

`veily-web`은 프로젝트에 고정한 `@playwright/cli`와 `pnpm agent:browser` 명령으로 실제 브라우저를 검증했습니다. 해당 사용법을 [프로젝트 스킬](../.agents/skills/playwright-cli/SKILL.md)로 옮겼습니다. 프론트엔드 패키지를 만들 때 Playwright 버전과 명령을 고정한 뒤 사용할 수 있습니다. 현재 package.json에는 전용 브라우저 명령이 없으므로 설치된 CLI의 실제 실행 경로와 도움말을 확인해 사용합니다.

검증 내용은 [UI 검증 문서](ui-verification.md)에 둡니다. 클릭·키보드 조작, DOM 상태, 콘솔·네트워크를 확인하고 스크린샷은 필요할 때만 만듭니다.

## Playwright MCP

`veily-web`은 Playwright MCP를 기본 설치하지 않고 지속적인 브라우저 문맥이 필요한 경우의 선택지로 문서화했습니다. 이 저장소도 CLI가 기본 경로이며, MCP가 필요한 구체적인 작업이 생기면 연결합니다. Codex의 MCP 설정은 사용자 `~/.codex/config.toml` 또는 신뢰된 프로젝트의 `.codex/config.toml`에 둘 수 있습니다. 데스크톱 앱·CLI·IDE 확장은 같은 호스트의 설정을 공유합니다. [공식 MCP 문서](https://learn.chatgpt.com/docs/extend/mcp?surface=cli)

아래는 `veily-web` README의 **선택적 예시**입니다. 현재 저장소에 적용된 설정은 아닙니다. 실제 도입 시 패키지 버전을 고정하고 연결·브라우저 설치를 확인합니다.

```toml
[mcp_servers.playwright]
command = "npx"
args = ["-y", "@playwright/mcp@<확정한 버전>", "--isolated", "--browser", "chromium"]
startup_timeout_sec = 30
tool_timeout_sec = 120
enabled = true
```

## Codex 훅

`veily-web`의 `.claude/settings.json`과 `.claude/hooks/*.cjs`도 확인했습니다. 기능을 검토한 결과는 다음과 같습니다.

| Claude 훅                                    | 이 저장소에서 가져온 방식                                                                                                          |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `skill-activation`                           | 작업별 안내는 `AGENTS.md`의 문서 경로로 제공. 원본은 OmD와 `DESIGN.md` 존재 검사를 요구하므로 스크립트는 제외                      |
| `session-state-loader`, `session-end-foldin` | 원본의 `.omd/` 상태·선호도 파일이 없어 제외. 결정 사항은 현재 문서와 대화에 기록                                                   |
| `post-edit-watch`                            | 변경 후 검사의 취지는 [agent doctor](test-and-doctor.md)에 반영. 원본의 Veily 색상·반경 검사는 v4 디자인 토큰이 정리될 때까지 제외 |
| `figma-reflection-guard`                     | 현재 작업 범위와 무관해 제외                                                                                                       |

Codex 훅은 `SessionStart`, `UserPromptSubmit`, `PostToolUse`, `Stop` 같은 시점에 명령이나 MCP 도구를 실행할 수 있습니다. 프로젝트 훅은 `.codex/hooks.json`에 둘 수 있지만, 프로젝트 설정과 훅 정의에 대한 신뢰 검토가 끝나야 실행됩니다. [공식 Hooks 문서](https://learn.chatgpt.com/docs/hooks)

현재는 자동 훅을 등록하지 않습니다. v4 기준·문서 경로는 `AGENTS.md`로 전달되고, 브라우저 검증은 작업 범위에 따라 직접 실행하는 편이 명확합니다. 반복 작업이 생기면 다음 중 실제 필요한 것만 추가합니다.

| 시점           | 유용한 경우                                    | 적용 전 확인                                      |
| -------------- | ---------------------------------------------- | ------------------------------------------------- |
| `SessionStart` | 세션 시작 시 외부 상태를 읽어야 할 때          | `AGENTS.md`와 중복되는 문구를 주입하지 않기       |
| `PostToolUse`  | 특정 파일 변경 후 빠른 검사가 실제로 필요할 때 | 도구 이름과 실행 비용, 자동 수정 범위 확인        |
| `Stop`         | 완료 전에 필수 검사 결과를 확인해야 할 때      | 실패 시 대화가 불필요하게 막히지 않도록 조건 제한 |

훅을 추가하면 정의가 바뀔 때마다 신뢰 검토가 필요합니다. 훅은 작업 지침이나 패키지 스크립트를 대체하지 않습니다.
