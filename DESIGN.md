# 넷제로 강의실 디자인 기준

운영 스타일은 [globals.css](src/app/globals.css)와 [project.css](src/views/project/ui/project.css)에 있습니다. [v4 목업](docs/mockup/v4.html)은 시각 참고 자료입니다.

## 색상과 서체

| 역할                      | 값        |
| ------------------------- | --------- |
| 본문 `ink`                | `#1b2925` |
| 보조 글자 `muted`         | `#62716b` |
| 주요 버튼·선택 탭 `green` | `#234a3c` |
| 진행률·강조 `lime`        | `#d7ed9f` |
| 페이지 `paper`            | `#f5f6f2` |
| 카드 `white`              | `#ffffff` |
| 경계 `line`               | `#dce2db` |
| 포커스 `focus`            | `#9abd5c` |

한글 글꼴은 Pretendard → SUIT → Noto Sans KR → 플랫폼 기본 글꼴 순서로 대체합니다. 웹폰트 파일은 아직 없습니다. 긴 본문에는 `word-break: keep-all`, 금액에는 고정 폭 숫자를 사용합니다.

## 레이아웃과 조작

- 콘텐츠 최대 폭은 1120px, 좁은 화면 좌우 여백은 16px입니다. 히어로는 24px, 일반 카드·목록은 18px 안팎의 둥근 모서리를 사용합니다.
- 주요 버튼과 탭은 알약 모양입니다. 선택된 일반 탭은 진녹색, 기부 탭은 연두색을 사용합니다. 계좌 복사 버튼은 9px 모서리로 구분합니다.
- 주 색 위에는 흰 글자, 연두색 위에는 어두운 글자를 사용합니다. 키보드 포커스와 선택·오류 상태는 색 이외의 표시도 유지합니다.
- 탭의 `aria-selected`, 방향키·Home·End, URL 해시 복원과 계좌 복사 상태 메시지를 유지합니다.

[components.json](components.json)은 향후 shadcn/ui 컴포넌트용 설정입니다. 현재 운영 화면은 생성된 shadcn 컴포넌트를 사용하지 않습니다.
