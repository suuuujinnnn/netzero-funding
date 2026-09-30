# 프론트엔드 초기 설정 기준

`veily-web`의 App Router 초기 설정에서 재사용할 구조를 정리했습니다. Next.js 앱과 `package.json`을 만들었고, 현재 페이지는 v4 구현 전의 초기 설정 안내 화면입니다.

## 개발 언어와 타입 검사

- **개발 언어는 TypeScript**입니다. React 컴포넌트와 Next.js 라우트는 `.tsx`, 일반 로직과 모델은 `.ts`로 작성합니다. 기존 `docs/mockup/v4.js`는 이식의 원본으로 보존하고 새 프론트엔드 코드는 TypeScript로 작성합니다.
- [tsconfig.json](../tsconfig.json)에 `strict: true`, `noEmit: true`, `moduleResolution: bundler`, `@/* → src/*` 별칭을 준비했습니다. 타입 검사에서 `any`를 기본값으로 쓰지 않습니다.
- 설정 파일은 도구가 요구하는 경우에만 `.mjs`나 `.js`를 사용합니다. 화면 코드의 언어를 JavaScript로 혼용하지 않습니다.
- `pnpm typecheck`와 `pnpm build`를 검증 명령에 연결합니다.

## 페이지 언어와 메타데이터

- 루트 `src/app/layout.tsx`의 `<html lang="ko">`를 사용합니다. v4 목업도 `lang="ko"`입니다.
- 문서 문자 인코딩은 UTF-8, viewport는 모바일 폭에 맞춥니다.
- 기본 제목과 설명의 초안은 [배포용 메타데이터](deployment-metadata.md)에 있습니다. 목업을 뜻하는 `v4 목업`, `REFERENCE-BASED MOCKUP`은 실제 운영 페이지 제목·공유 미리보기에 넣지 않습니다.
- 날짜와 금액은 한국어 화면에 맞춰 `ko-KR` 형식으로 표시하고, 데이터의 시간대와 확정 여부를 분리해 다룹니다.
- 다국어 라우팅이나 번역 라이브러리는 현재 범위에 없습니다. 실제 다른 언어 페이지가 생길 때 설계합니다.

`veily-web`은 루트 layout에서 Next.js `Metadata`와 `<html lang="ko">`를 설정했습니다. 이 프로젝트에서도 전역 메타데이터는 layout에 두고, 화면별 제목·설명이 필요하면 해당 라우트에 둡니다. v4의 `skip-link`와 본문 `id="main"`도 유지합니다.

## 스타일과 컴포넌트

- `DESIGN.md`를 색·서체·간격·버튼 규칙의 기준으로 사용하고, `src/app/globals.css`에 의미 기반 CSS 변수를 정의합니다.
- Tailwind CSS v4의 PostCSS 연결을 설정했습니다. shadcn CLI의 [components.json](../components.json)은 디렉터리 별칭과 CSS 변수 방식을 지정합니다.
- shadcn 컴포넌트는 실제 사용할 때만 생성합니다. 기본 테마가 v4의 진녹색·라임 색상과 버튼 형태를 덮어쓰지 않게 조정합니다.
- 폰트 파일은 아직 없습니다. `DESIGN.md`의 한글 글꼴 스택을 임시로 사용하고, 웹폰트 제공 방식을 확정한 뒤 화면을 비교합니다.

## 추가로 검토할 설정

| 항목                               | 가져올 가치                                | 도입 시점               |
| ---------------------------------- | ------------------------------------------ | ----------------------- |
| `.env.example`                     | 실제 API 주소·공개 변수의 의미를 분명히 함 | API 계약이 생길 때      |
| TypeScript·Next.js 타입 검사 명령  | `tsconfig.json`과 실제 빌드를 검사         | 적용 완료               |
| 포맷·lint·빌드 명령                | ESLint·Prettier·CI를 패키지에 연결         | 적용 완료               |
| 기본 오류·로딩 화면                | 연동 실패를 사용자에게 설명                | 비동기 데이터가 생길 때 |
| 검색·공유 메타데이터와 대표 이미지 | 배포 링크의 제목과 미리보기 품질           | 공개 배포 준비 시       |
