# 프론트엔드 설정

- TypeScript·Next.js App Router·React·Tailwind CSS v4를 사용합니다. 버전과 검증 명령은 [package.json](../package.json), 타입 옵션은 [tsconfig.json](../tsconfig.json)에 있습니다.
- 한국어 페이지 언어와 제목·설명·공유 메타데이터는 [layout.tsx](../src/app/layout.tsx)에 적용했습니다.
- 색상 토큰과 글꼴 대체 순서는 [globals.css](../src/app/globals.css), 디자인 기준은 [DESIGN.md](../DESIGN.md)를 따릅니다. 별도 웹폰트 파일은 없습니다.
- [components.json](../components.json)은 shadcn/ui의 `new-york` 스타일과 별칭을 준비한 설정입니다. 현재 화면에는 생성된 shadcn 컴포넌트를 사용하지 않습니다.
- `pnpm agent:verify`가 포맷·lint·타입 검사·집계 테스트·빌드를 실행합니다. 배포 전 상태는 [점검 문서](deployment-readiness.md)를 확인합니다.
