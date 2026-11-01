# 국민대 넷제로 강의실 만들기 프로젝트

강의실 전력량에 상응하는 재생에너지 환경가치에 함께 참여하는 Next.js 사이트입니다. 운영 주소는 [netzero-funding.vercel.app](https://netzero-funding.vercel.app)이며, 화면과 동작의 기준은 `src/`입니다.

## 실행과 검증

Node.js 24와 저장소에 지정된 pnpm 버전을 사용합니다.

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm agent:verify
pnpm start --port 3001
```

개발 서버는 `http://localhost:3001/`에서 실행합니다. 작업과 검증이 끝나면 서버를 종료합니다. `main` 브랜치와 기본 작업 폴더 하나를 사용합니다.

## 화면과 폴더

홈·모금 소개·기대효과·사용계획·관련단체·명예의 전당·기부하기를 `/` 경로에서 해시로 전환합니다. 별도 목업 라우트와 정적 HTML 사본은 사용하지 않습니다.

- `src/app/`: 페이지, 메타데이터, 집계 API 라우트
- `src/views/project/ui/`: 운영 화면·메뉴·집계 표시·인터랙션
- `src/views/project/ui/effects/`: 최신 기대효과 카드·환산표·산정 기준
- `src/views/project/api/`: 서버 전용 비공개 시트 조회
- `src/features/copy-account/`: 계좌 복사
- `public/assets/`: 실제 화면에서 사용하는 공개 자산
- `assets/`: 로고·단체·캠퍼스 이미지 원본
- `docs/`: 운영 안내와 제공받은 산정·참고 자료

목표 모금액은 1,000,000원, 목표 전력량은 8,000kWh입니다. 모금기간은 2026.10.08~12.25, 사업기간은 2026.10.08~2027.02.28입니다. 실제 집계가 준비되지 않으면 금액·건수·명단을 임의의 값으로 채우지 않습니다.

## 모금 집계와 배포

[참여 내역 제출 폼](https://forms.gle/BYB5QtEWabs9sryR6)은 외부 서비스입니다. 사이트는 폼 제출이나 입금 완료를 판정하지 않습니다. 서버가 비공개 Google Sheets에서 확인 완료 총액·건수·공개 동의 이름만 가져오고, 브라우저는 `/api/funding`을 5분 간격으로 조회합니다.

[시트 운영 안내](docs/funding-sheet-setup.md)에 따라 서버 전용 인증을 설정합니다. Vercel은 저장소 루트를 Next.js 프로젝트로 사용하며 `pnpm install --frozen-lockfile`, `pnpm build`로 빌드합니다. 코드 변경과 실제 배포·외부 서비스 검증은 구분해 보고합니다.

## 작업 문서

[아키텍처](docs/architecture.md), [프론트엔드 규칙](docs/frontend-rules.md), [디자인](DESIGN.md), [API 경계](docs/api-boundary.md), [자산](docs/assets.md), [UI 검증](docs/ui-verification.md), [작업 흐름](docs/agent-workflow.md), [검사 명령](docs/test-and-doctor.md), [배포 점검](docs/deployment-readiness.md)을 참고합니다.
